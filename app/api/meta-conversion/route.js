import { NextResponse } from 'next/server';
import crypto from 'crypto';

// hash text fields (email, names): lowercase + trim, then SHA-256
function hashData(data) {
  if (!data) return undefined;
  return crypto.createHash('sha256').update(String(data).trim().toLowerCase()).digest('hex');
}
// hash phone: digits only, Australian numbers converted to 61 format (0400... -> 61400...)
function hashPhone(data) {
  if (!data) return undefined;
  let digits = String(data).replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) digits = '61' + digits.slice(1);
  return crypto.createHash('sha256').update(digits).digest('hex');
}

// ============================================================
//  THE ROUTER — tag/stage name  ->  Meta event
// ============================================================
const EVENT_MAP = {
  form_filled: 'Lead',
  'seminar-registered': 'CompleteRegistration',
  call_booked: 'Schedule',
  call_attended: 'Contact',
  call_no_show: 'NoShow',
  // follow_up / client_onboarding / lead_no_booking: skip unless you want them
};

// GHL sends ALL of the contact's tags, not only the one that triggered the
// relay. So when call_booked is added, form_filled is usually in the list too.
// We pick the furthest stage the contact has reached, not the first tag listed.
const PRIORITY = ['call_no_show', 'call_attended', 'call_booked', 'seminar-registered', 'form_filled'];

// Which campaign each event belongs to (lets Meta tell seminar and call leads apart)
const CONTENT_NAME = {
  form_filled: 'strategy_call',
  call_booked: 'strategy_call',
  call_attended: 'strategy_call',
  call_no_show: 'strategy_call',
  'seminar-registered': 'seminar_adelaide',
};

// Page each event came from (Meta needs this for website events)
const SOURCE_PATH = {
  'seminar-registered': '/seminar',
};
const SITE_URL = process.env.SITE_URL || 'https://sunblockproperty.com.au';

// Pull every possible place GHL might put tag(s), flatten to one array
function collectKeys(body) {
  const out = [];
  const push = (v) => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach((x) => out.push(String(x).trim()));
    else String(v).split(',').forEach((x) => out.push(x.trim())); // GHL often sends "tag1, tag2"
  };
  push(body.stage);
  push(body.tag);
  push(body.tags);
  push(body.contact_tags);
  push(body['contact.tags']);
  push(body.contact?.tags);
  push(body.customData?.tags);
  return out.filter(Boolean);
}

// Read a value from the top level, customData or contact (GHL shapes vary)
function pick(body, ...names) {
  for (const n of names) {
    const v = body[n] ?? body.customData?.[n] ?? body.contact?.[n];
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return undefined;
}

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Which event? An explicit event_key wins; otherwise the furthest stage.
    const explicitKey = pick(body, 'event_key');
    const keys = collectKeys(body);
    const matchedKey =
      explicitKey && EVENT_MAP[explicitKey]
        ? explicitKey
        : PRIORITY.find((k) => keys.includes(k));
    const event_name = matchedKey ? EVENT_MAP[matchedKey] : undefined;

    // log only what is needed to debug (no personal details)
    console.log('GHL RELAY:', JSON.stringify({ keys, matched: matchedKey || null }));

    if (!event_name) {
      // nothing we track -> acknowledge so GHL doesn't retry
      return NextResponse.json({ success: true, skipped: keys.join(',') || 'no key' });
    }

    // 2. Contact and tracking fields
    const email = pick(body, 'email');
    const phone = pick(body, 'phone');
    const first_name = pick(body, 'first_name', 'firstName');
    const last_name = pick(body, 'last_name', 'lastName');
    const fbp = pick(body, 'fbp', 'Meta FBP');
    const fbc = pick(body, 'fbc', 'Meta FBC');
    const userAgent = pick(body, 'user_agent', 'User Agent');
    const contactId = pick(body, 'contact_id', 'id');

    // 3. Event ID. Built the same way as the browser (lib/tracking.js),
    //    so the browser and server copies of an event are counted once.
    const day = new Date().toISOString().slice(0, 10);
    const who = email ? email.toLowerCase() : phone ? phone.replace(/\D/g, '') : 'anon';
    const event_id = pick(body, 'browser_event_id') || `${event_name}_${who}_${day}`;

    const user_data = {};
    if (email) user_data.em = [hashData(email)];
    if (phone) user_data.ph = [hashPhone(phone)];
    if (first_name) user_data.fn = [hashData(first_name)];
    if (last_name) user_data.ln = [hashData(last_name)];
    if (contactId) user_data.external_id = [hashData(contactId)];
    if (fbp) user_data.fbp = fbp; // not hashed, as Meta requires
    if (fbc) user_data.fbc = fbc; // not hashed, as Meta requires
    if (userAgent) user_data.client_user_agent = userAgent;

    const PIXEL_ID = process.env.META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const payload = {
      data: [
        {
          action_source: 'website',
          event_name,
          event_time: body.event_time
            ? Math.floor(new Date(body.event_time).getTime() / 1000)
            : Math.floor(Date.now() / 1000),
          event_id,
          event_source_url: pick(body, 'page_url') || `${SITE_URL}${SOURCE_PATH[matchedKey] || '/book-a-call'}`,
          user_data,
          custom_data: {
            content_name: CONTENT_NAME[matchedKey],
            lead_source: 'GoHighLevel CRM',
            stage: matchedKey,
          },
        },
      ],
      ...(process.env.META_TEST_EVENT_CODE
        ? { test_event_code: process.env.META_TEST_EVENT_CODE }
        : {}),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('META RESPONSE:', JSON.stringify({ event: event_name, ok: response.ok, result }));
    return NextResponse.json({ success: response.ok, event: event_name, matched: matchedKey, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    pixel: process.env.META_PIXEL_ID ? 'set' : 'MISSING',
    token: process.env.META_CAPI_TOKEN ? 'set' : 'MISSING',
  });
}