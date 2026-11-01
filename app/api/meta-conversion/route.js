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
//  THE ROUTER — one endpoint handles every funnel stage.
//  Left  = the tag or Pipeline 1 STAGE NAME coming from GHL.
//  Right = the Meta event it becomes.
//  Add a new stage later = add ONE line here. Never touch GHL.
//  >>> Replace the stage names on the left with your EXACT
//      Pipeline 1 stage names from GHL -> Opportunities. <<<
// ============================================================
const EVENT_MAP = {
  // website form tags
  form_filled: 'Lead',
  'seminar-registered': 'CompleteRegistration',
  call_booked: 'Schedule',

  // Pipeline 1 opportunity stages (confirm exact names)
  'Call Booked': 'Schedule',
  'Call Attended': 'Contact',
  'No Show': 'NoShow',
  Won: 'Purchase',
  // Lost: leave out if you don't want it sent to Meta
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, first_name, last_name } = body;

    // which event is this? (sent from the GHL relay webhook as event_key)
    const key = body.event_key || body.stage || body.tag;
    const event_name = EVENT_MAP[key];

    // not a tracked event -> acknowledge so GHL doesn't retry, and stop
    if (!event_name) {
      return NextResponse.json({ success: true, skipped: key || 'no key' });
    }

    const PIXEL_ID = process.env.META_PIXEL_ID;        // 1425738326388331
    const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;  // <-- NEW token, env var only

    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    // dedup id so browser pixel + this server event count as ONE in Meta.
    // For Lead / CompleteRegistration, pass the browser's id as browser_event_id.
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
            stage: key,
          },
        },
      ],
      // keep this while testing in Test Events; remove (unset the env var) for live
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
    return NextResponse.json({ success: response.ok, event: event_name, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// quick browser health check: visit /api/meta-conversion
export async function GET() {
  return NextResponse.json({
    ok: true,
    pixel: process.env.META_PIXEL_ID ? 'set' : 'MISSING',
    token: process.env.META_CAPI_TOKEN ? 'set' : 'MISSING',
  });
}