import { NextResponse } from 'next/server';
import crypto from 'crypto';

// hash text fields (email, names): lowercase + trim, then SHA-256
function hashData(data) {
  if (!data) return undefined;
  return crypto.createHash('sha256').update(String(data).trim().toLowerCase()).digest('hex');
}
// hash phone: strip everything except digits first
function hashPhone(data) {
  if (!data) return undefined;
  return crypto.createHash('sha256').update(String(data).replace(/\D/g, '')).digest('hex');
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

// Pull every possible place GHL might put tag(s) / an event key, flatten to one array
function collectKeys(body) {
  const out = [];
  const push = (v) => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach((x) => out.push(String(x).trim()));
    else String(v).split(',').forEach((x) => out.push(x.trim())); // GHL often sends "tag1, tag2"
  };

  // explicit custom-data keys (if ever set)
  push(body.event_key);
  push(body.stage);
  push(body.tag);
  // GHL standard tag fields (names vary by account)
  push(body.tags);
  push(body.contact_tags);
  push(body['contact.tags']);
  push(body.contact?.tags);
  push(body.customData?.event_key);
  push(body.customData?.tags);

  return out.filter(Boolean);
}

export async function POST(request) {
  try {
    const body = await request.json();

    // keep this while debugging — shows the exact GHL payload in Vercel logs
    console.log('GHL PAYLOAD:', JSON.stringify(body));

    // find the FIRST key that we actually map to a Meta event
    const keys = collectKeys(body);
    const matchedKey = keys.find((k) => EVENT_MAP[k]);
    const event_name = matchedKey ? EVENT_MAP[matchedKey] : undefined;

    if (!event_name) {
      // nothing we track -> acknowledge so GHL doesn't retry
      return NextResponse.json({ success: true, skipped: keys.join(',') || 'no key' });
    }

    // contact fields — check the common GHL shapes
    const email = body.email || body.contact?.email;
    const phone = body.phone || body.contact?.phone;
    const first_name = body.first_name || body.firstName || body.contact?.first_name;
    const last_name = body.last_name || body.lastName || body.contact?.last_name;

    const PIXEL_ID = process.env.META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const day = new Date().toISOString().slice(0, 10);
    const event_id = body.browser_event_id || `${event_name}_${email || phone || 'anon'}_${day}`;

    const payload = {
      data: [
        {
          action_source: 'website',
          event_name: event_name,
          event_time: body.event_time
            ? Math.floor(new Date(body.event_time).getTime() / 1000)
            : Math.floor(Date.now() / 1000),
          event_id: event_id,
          user_data: {
            em: [hashData(email)],
            ph: [hashPhone(phone)],
            fn: [hashData(first_name)],
            ln: [hashData(last_name)],
          },
          custom_data: {
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
    console.log('META RESPONSE:', JSON.stringify(result));
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