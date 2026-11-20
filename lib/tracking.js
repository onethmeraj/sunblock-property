// =============================================================
//  META TRACKING HELPERS (browser side)
//  Used by the seminar and book-a-call pages.
// =============================================================

const ATTR_KEY = "sp_attribution";
const ATTR_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : "";
}

// Save UTM and fbclid from the landing URL so they survive the click
// from the homepage to /book-a-call or /seminar.
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    ATTR_PARAMS.forEach((k) => {
      const v = params.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length === 0) return;
    if (found.fbclid) found.fbclid_time = Date.now();
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(found));
  } catch {
    // storage blocked: nothing to save
  }
}

function getStoredAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}");
  } catch {
    return {};
  }
}

// Extra fields sent to GHL with every form. GHL ignores any field
// that is not mapped, so these are safe to send before GHL is set up.
export function getTrackingFields() {
  if (typeof window === "undefined") return {};
  const attr = getStoredAttribution();
  let fbc = getCookie("_fbc");
  if (!fbc && attr.fbclid) fbc = `fb.1.${attr.fbclid_time || Date.now()}.${attr.fbclid}`;
  return {
    fbp: getCookie("_fbp"),
    fbc,
    fbclid: attr.fbclid || "",
    utm_source: attr.utm_source || "",
    utm_medium: attr.utm_medium || "",
    utm_campaign: attr.utm_campaign || "",
    utm_content: attr.utm_content || "",
    utm_term: attr.utm_term || "",
    user_agent: navigator.userAgent,
    page_url: window.location.href.split("?")[0],
  };
}

// One event ID per person, event and day. The server (/api/meta-conversion)
// builds the exact same ID, so Meta counts the browser and server event once.
export function makeEventId(eventName, email) {
  const day = new Date().toISOString().slice(0, 10);
  const who = String(email || "").trim().toLowerCase() || "anon";
  return `${eventName}_${who}_${day}`;
}

export function trackEvent(eventName, params, eventId) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params || {}, eventId ? { eventID: eventId } : undefined);
}