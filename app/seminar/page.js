"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Check, X, Tag, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

const BUDGETS = ["Under $500k", "$500k to $750k", "$750k to $1M", "$1M to $1.5M", "$1.5M+", "Not sure yet"];
const TIMELINE = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];
const RESIDENCY = ["Australian citizen", "Permanent resident", "Temporary visa holder", "New Zealand citizen", "Living overseas"];
const BUYER_TYPES = ["First home buyer", "First time investor", "Experienced investor", "Upgrading my home", "Buying through an SMSF", "Not sure yet"];

const FAQS = [
  { q: "Is this really free?", a: "Yes, 100% free with no sales pressure. Our goal is to educate you on smart property investing." },
  { q: "Will this be recorded?", a: "To encourage open Q&A and protect the exclusivity of the property data shared, we do not distribute recordings." },
  { q: "I am still researching, should I attend?", a: "Absolutely. Planning your property strategy before you are ready to buy is the best way to act fast when the right investment comes up." },
  { q: "Why use a buyer's agent?", a: "We level the playing field. We give you access to off-market properties, represent you in negotiations, and remove the emotion and guesswork from choosing an investment." },
];

const STATS = [
  { value: "50+", label: "Client reviews" },
  { value: "12+", label: "Years experience" },
  { value: "500+", label: "Clients supported" },
];

// Small reusable section label
function Eyebrow({ children, light = false }) {
  return (
    <div
      className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm ${
        light ? "border-white/20 bg-white/10 text-white" : "border-line bg-white text-navy"
      }`}
    >
      <span className="flex h-2 w-2 rounded-full bg-copper" />
      {children}
    </div>
  );
}

// Dropdown with a visible chevron (appearance-none hides the native arrow)
function Select({ value, onChange, placeholder, options, className }) {
  return (
    <div className="relative">
      <select
        required
        value={value}
        onChange={onChange}
        className={`${className} pr-10 ${value ? "text-ink" : "text-gray-400"}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

// Two-option tap buttons for short Yes/No style questions
function Choice({ label, value, options, onPick }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onPick(o.value)}
              aria-pressed={active}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? "border-navy bg-navy text-white shadow-sm"
                  : "border-line bg-gray-50 text-ink hover:border-navy/40 hover:bg-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SeminarPage() {
  const s = site.seminarPage || { offers: [], agenda: [] };
  const host = s.host || { name: "Kaushi", titles: [], bio: "", image: "kaushi.jpg" };
  const experts = s.speakers || [];
  const past = s.pastEvent || {};
  const photos = past.photos || [];
  const realReviews = past.reviews || [];
  // While no real reviews are added, show 4 placeholder slots on localhost
  // and on Vercel PREVIEW links (for client review). They never appear on
  // the live production site.
  const isPreviewBuild =
    process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
  const previewSlots = isPreviewBuild && realReviews.length === 0;
  const reviews = previewSlots
    ? Array.from({ length: 4 }, () => ({ quote: "Attendee review coming soon. This space will show real feedback from our Melbourne seminar.", name: "Seminar attendee", detail: "Melbourne, 7 November", preview: true }))
    : realReviews;
  const [lightbox, setLightbox] = useState(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    basedIn: "", investedBefore: "", budget: "", timeline: "",
    residencyStatus: "", buyerType: "",
  });
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowSize = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      const scrollPercentage = Math.round((scrollPosition / (bodyHeight - windowSize)) * 100);

      if (scrollPercentage > 50 && !window.hasFiredScroll50) {
        window.hasFiredScroll50 = true;
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("trackCustom", "Scrolled_50_Percent_Seminar");
        }
      }

      if (scrollPercentage > 90 && !window.hasFiredScroll90) {
        window.hasFiredScroll90 = true;
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("trackCustom", "Scrolled_90_Percent_Seminar");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pick = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setFormError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Tap buttons are not native inputs, so check them here
    if (!form.basedIn || !form.investedBefore) {
      setFormError("Please answer where you are based and whether you have invested before.");
      return;
    }

    setFormError("");
    setStatus("submitting");

    try {
      if (site.forms?.seminar) {
        const res = await fetch(site.forms.seminar, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source: "Seminar Registration" }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setFormError("Something went wrong. Please try again, or contact us directly.");
    }
  }

  const handleButtonClick = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "Clicked_Register_Seminar");
    }
  };

  const fieldBase =
    "w-full rounded-xl border border-line bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy";
  const inputClass = `${fieldBase} text-ink placeholder:text-gray-400`;
  const selectClass = `${fieldBase} appearance-none cursor-pointer`;

  const details = [
    { icon: Calendar, label: "Date", value: s.date || "Date to be confirmed" },
    { icon: Clock, label: "Time", value: s.time || "Time to be confirmed" },
    { icon: MapPin, label: "Venue", value: s.venue?.name || "Venue to be confirmed" },
    { icon: Tag, label: "Entry", value: s.cost || "Free, in person" },
  ];

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="bg-paper">

        {/* HERO & REGISTRATION */}
        <section className="relative overflow-hidden bg-paper pb-12 pt-8 text-ink lg:pb-20 lg:pt-14">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-orange/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-navy/5 blur-3xl" />

          <div className="relative mx-auto max-w-container px-6">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">

              {/* Left: event pitch */}
              <div>
                <Eyebrow>{s.eyebrow || "Upcoming seminar"}</Eyebrow>

                <h1 className="reveal d1 font-display text-[clamp(2.35rem,4.8vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
                  {s.name || "Property Investment Seminar"}
                </h1>

                <p className="reveal d2 mt-4 max-w-lg text-base leading-relaxed text-muted lg:text-lg">
                  {s.tagline || "Learn how to invest in Australian property with clarity and confidence."}
                </p>

                {/* Event details card */}
                <div className="reveal d2 mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
                  {details.map(({ icon: I, label, value }, i) => (
                    <div
                      key={label}
                      className={`flex items-start gap-3 p-4 sm:p-5 ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line" : ""}`}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-peach text-orange">
                        <I className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</div>
                        <div className="mt-0.5 text-sm font-semibold leading-snug text-ink">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Offers */}
                {s.offers?.length > 0 && (
                  <div className="reveal d3 mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {s.offers.map((o, i) => {
                      const isFirst = i === 0;
                      return (
                        <div
                          key={i}
                          className={`rounded-2xl border p-5 transition-all hover:shadow-md ${
                            isFirst ? "border-orange/30 bg-orange/5" : "border-navy/20 bg-navy/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${isFirst ? "bg-orange/15 text-orange" : "bg-navy/15 text-navy"}`}>
                              <Icon name={o.icon} className="h-5 w-5" strokeWidth={2} />
                            </span>
                            <div className={`text-2xl font-black leading-none tracking-tight ${isFirst ? "text-orange" : "text-navy"}`}>
                              {o.amount}
                            </div>
                          </div>
                          <h3 className="mt-3 text-sm font-bold text-ink">{o.title}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted">{o.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right: registration form */}
              <div id="book" className="reveal d2 w-full scroll-mt-28 lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl shadow-navy/10">
                  <div className="bg-navy px-6 py-5 text-white sm:px-8">
                    <h2 className="font-display text-2xl font-bold">Reserve your seat</h2>
                    <p className="mt-1 text-sm text-white/80">Free entry. Spaces are strictly limited.</p>
                  </div>

                  {status === "success" ? (
                    <div className="flex min-h-[460px] flex-col items-center justify-center p-12 text-center">
                      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-8 w-8" strokeWidth={3} />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-ink">Registration confirmed</h3>
                      <p className="mt-2 max-w-xs text-sm text-muted">Your seat is reserved. We have sent the event details to your email.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6 px-6 py-6 sm:px-8">

                        {/* Step 1 */}
                        <fieldset>
                          <legend className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] text-white">1</span>
                            Your details
                          </legend>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <input required className={inputClass} placeholder="First name*" autoComplete="given-name" value={form.firstName} onChange={set("firstName")} />
                            <input required className={inputClass} placeholder="Last name*" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} />
                            <input required type="email" className={`${inputClass} sm:col-span-2`} placeholder="Email address*" autoComplete="email" value={form.email} onChange={set("email")} />
                            <input required type="tel" className={`${inputClass} sm:col-span-2`} placeholder="Phone number*" autoComplete="tel" value={form.phone} onChange={set("phone")} />
                          </div>
                        </fieldset>

                        {/* Step 2 */}
                        <fieldset>
                          <legend className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] text-white">2</span>
                            Your property plans
                          </legend>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Select className={selectClass} placeholder="Residency status*" options={RESIDENCY} value={form.residencyStatus} onChange={set("residencyStatus")} />
                            <Select className={selectClass} placeholder="Buyer type*" options={BUYER_TYPES} value={form.buyerType} onChange={set("buyerType")} />
                            <Select className={selectClass} placeholder="Approx budget*" options={BUDGETS} value={form.budget} onChange={set("budget")} />
                            <Select className={selectClass} placeholder="Timeline*" options={TIMELINE} value={form.timeline} onChange={set("timeline")} />
                          </div>
                          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Choice
                              label="Currently based in*"
                              value={form.basedIn}
                              onPick={pick("basedIn")}
                              options={[{ value: "Australia", label: "Australia" }, { value: "Overseas", label: "Overseas" }]}
                            />
                            <Choice
                              label="Invested before?*"
                              value={form.investedBefore}
                              onPick={pick("investedBefore")}
                              options={[{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }]}
                            />
                          </div>
                        </fieldset>

                        {formError && (
                          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {formError}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-line bg-gray-50/70 px-6 py-5 sm:px-8">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-copper px-8 py-4 text-sm font-bold text-white shadow-lg shadow-copper/25 transition-all hover:-translate-y-0.5 hover:bg-copper-dark disabled:translate-y-0 disabled:opacity-70"
                        >
                          {status === "submitting" ? "Processing..." : (<>Complete registration <ArrowRight className="h-4 w-4" /></>)}
                        </button>
                        <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-muted">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy" />
                          <span>
                            By registering, you agree to our{" "}
                            <a href="/privacy-policy" className="text-ink underline hover:text-copper">privacy policy</a> and event terms.
                          </span>
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="bg-navy py-10 text-white md:py-12">
          <div className="reveal mx-auto max-w-container px-6">
            <p className="mb-8 text-center font-display text-xl font-semibold text-white/90 md:text-2xl">
              A more supported way to invest in property
            </p>
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {STATS.map((st) => (
                <div key={st.label} className="flex flex-col items-center px-2 text-center">
                  <span className="font-display text-3xl font-extrabold text-orange sm:text-5xl">{st.value}</span>
                  <span className="mt-2 text-[11px] font-bold uppercase tracking-widest text-white/70 sm:text-xs">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAST SEMINAR GALLERY: slow moving photo strip */}
        {photos.length > 0 && (
          <section className="overflow-hidden border-b border-line bg-paper py-14 md:py-20">
            <div className="reveal mx-auto mb-10 flex max-w-container flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>{past.eyebrow || "Our last seminar"}</Eyebrow>
                <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                  {past.heading || "See what happened last time"}
                </h2>
                {past.sub && <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">{past.sub}</p>}
              </div>
              {past.highlights?.length > 0 && (
                <div className="flex shrink-0 gap-3">
                  {past.highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl border border-line bg-white px-5 py-3 text-center shadow-sm">
                      <div className="font-display text-2xl font-extrabold text-orange">{h.value}</div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">{h.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              {/* soft fade on both edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-paper to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-paper to-transparent sm:w-24" />

              <div
                className="gallery-track flex w-max gap-4 hover:[animation-play-state:paused]"
                style={{ "--gallery-duration": `${photos.length * 9}s` }}
              >
                {[...photos, ...photos].map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightbox(i % photos.length)}
                    aria-hidden={i >= photos.length ? true : undefined}
                    tabIndex={i >= photos.length ? -1 : 0}
                    aria-label={`Open photo: ${p.alt || "seminar photo"}`}
                    className="group relative h-56 w-[300px] shrink-0 overflow-hidden rounded-2xl bg-gray-200 shadow-sm sm:h-72 sm:w-[420px]"
                  >
                    <img
                      src={`/${p.src}`}
                      alt={i >= photos.length ? "" : p.alt || "Seminar photo"}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {p.caption && (
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-sm font-semibold text-white">
                        {p.caption}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-5 text-center text-xs text-muted">Tap any photo to view it full size</p>

            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes gallery-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
              .gallery-track { animation: gallery-scroll var(--gallery-duration, 60s) linear infinite; }
            ` }} />
          </section>
        )}

        {/* COMPARISON */}
        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-container px-6">
            <div className="reveal mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <h2 className="font-display text-[clamp(2.1rem,4vw,3.25rem)] font-extrabold leading-[1.12] text-navy">
                <span className="text-muted line-through decoration-orange/40 decoration-[4px]">Investing with guesswork.</span>
                <br />
                <span className="text-orange">Investing with certainty.</span>
              </h2>
              <p className="mt-3 text-base text-muted md:text-lg">
                See the difference between scrolling through unfamiliar listings and using a data-driven system to secure the right investment property.
              </p>
            </div>

            <div className="relative mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
              <div className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-orange text-sm font-black text-white shadow-xl md:flex">
                VS
              </div>

              <div className="reveal d1 h-full rounded-2xl border border-line bg-gray-50 p-6 md:p-8">
                <h3 className="mb-5 text-xl font-bold text-navy">Buying without a system</h3>
                <ul className="space-y-3.5">
                  {[
                    "Overwhelmed by hundreds of listings and unfamiliar suburbs.",
                    "Worried about buying the wrong property due to a lack of local market insight.",
                    "Relying on selling agents who work exclusively for the vendor.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3.5 text-sm text-muted md:text-base">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal d2 relative h-full overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-xl md:p-8">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-orange/10 blur-2xl" />
                <h3 className="relative z-10 mb-5 text-xl font-bold">
                  Buying with <span className="text-orange">Sunblock</span>
                </h3>
                <ul className="relative z-10 space-y-3.5">
                  {[
                    "A data-driven property shortlist that removes the guesswork and emotion.",
                    "Thorough due diligence and risk checks on every property.",
                    "100% independent representation acting solely in your interest.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3.5 text-sm text-paper/90 md:text-base">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                      <span className="font-medium leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA: numbered timeline */}
        <section className="border-t border-line bg-panel">
          <div className="mx-auto grid max-w-container gap-10 px-6 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="reveal lg:sticky lg:top-28 lg:h-fit">
              <Eyebrow>What we cover</Eyebrow>
              <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                What you’ll learn
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">
                Master the exact frameworks and strategies we use to consistently identify and secure high-performing investment properties across Australia.
              </p>
            </div>

            <ol className="relative space-y-5 before:absolute before:bottom-6 before:left-[23px] before:top-6 before:w-px before:bg-line">
              {s.agenda?.map((item, i) => {
                const title = item.title || `Agenda item 0${i + 1}`;
                const desc = item.desc || item;
                return (
                  <li key={i} className="reveal relative flex gap-5">
                    <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-panel bg-navy font-display text-sm font-extrabold text-white">
                      0{i + 1}
                    </span>
                    <div className="card-hover flex-1 rounded-2xl border border-line bg-white p-5 shadow-sm md:p-6">
                      <h3 className="font-display text-lg font-bold text-navy md:text-xl">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* MEET KAUSHI */}
        <section className="border-t border-line bg-panel overflow-hidden">
          <div className="mx-auto max-w-container px-6 py-14 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="reveal relative">
                <div className="photo relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-gray-100 shadow-xl">
                  <img src={`/${host.image}`} alt={host.name} className="absolute inset-0 h-full w-full object-cover object-top" />
                </div>
                <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-line bg-white px-5 py-4 shadow-lg sm:left-8 sm:right-auto">
                  <div className="font-display text-lg font-extrabold text-navy">{host.name}</div>
                  <div className="text-xs font-semibold text-muted">Founder, {site.brandName}</div>
                </div>
              </div>

              <div className="reveal d1 pt-6 md:pt-0">
                <Eyebrow>Meet your host</Eyebrow>
                <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                  Meet {host.name}
                </h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {host.titles.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-bold text-white shadow-md"
                    >
                      <span className="h-2 w-2 rounded-full bg-orange" />
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted lg:text-lg">{host.bio}</p>
                {host.points?.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {host.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-ink md:text-base">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" strokeWidth={2.5} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LEARN FROM THE EXPERTS */}
        {experts.length > 0 && (
          <section className="border-t border-line bg-white">
            <div className="mx-auto max-w-container px-6 py-14 md:py-20">
              <div className="reveal mx-auto mb-10 max-w-2xl text-center">
                <Eyebrow>Guest speakers</Eyebrow>
                <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                  Learn from the experts
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Hear directly from the professionals who guide buyers through finance and legal checks.
                </p>
              </div>

              <div className={`grid gap-6 ${experts.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-xl"}`}>
                {experts.map((sp, i) => (
                  <article key={sp.name} className={`reveal d${(i % 3) + 1} flex flex-col overflow-hidden rounded-3xl border border-line bg-panel shadow-sm sm:flex-row`}>
                    <div className="photo relative aspect-[4/3] w-full shrink-0 bg-gray-200 sm:aspect-auto sm:w-[42%]">
                      {sp.image ? (
                        <img src={`/${sp.image}`} alt={sp.name} className="absolute inset-0 h-full w-full object-cover object-top" />
                      ) : (
                        <span className="tag">Photo coming soon</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <span className="self-start rounded-md bg-navy/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                        {sp.role}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">{sp.name}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">{sp.bio}</p>
                      {sp.topics?.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {sp.topics.map((t) => (
                            <li key={t} className="flex items-start gap-2 text-sm text-ink">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" strokeWidth={3} />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ATTENDEE REVIEWS (shows once real reviews are added in site.js) */}
        {reviews.length > 0 && (
          <section className="border-t border-line bg-panel">
            <div className="mx-auto max-w-container px-6 py-14 md:py-20">
              <div className="reveal mx-auto mb-10 max-w-2xl text-center">
                <Eyebrow>Attendee feedback</Eyebrow>
                <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                  What attendees said
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Real words from people who joined us at our last seminar.
                </p>
              </div>

              <div className={`grid gap-5 sm:grid-cols-2 ${reviews.length >= 3 ? "lg:grid-cols-3" : ""} ${reviews.length === 4 ? "lg:grid-cols-4" : ""}`}>
                {reviews.map((r, i) => (
                  <figure key={i} className={`reveal d${(i % 3) + 1} card-hover flex flex-col rounded-2xl border bg-white p-6 shadow-sm md:p-7 ${r.preview ? "border-dashed border-orange/50 opacity-70" : "border-line"}`}>
                    <Quote className="h-8 w-8 text-orange/40" />
                    <blockquote className={`mt-3 flex-1 text-base leading-relaxed ${r.preview ? "italic text-muted" : "text-ink"}`}>{r.quote}</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                      {r.image ? (
                        <img src={`/${r.image}`} alt="" className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-copper text-sm font-bold text-white">
                          {r.name?.charAt(0) || "A"}
                        </span>
                      )}
                      <span>
                        <span className="block text-sm font-bold text-ink">{r.name}</span>
                        <span className="block text-xs text-muted">{r.detail || "Seminar attendee"}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="reveal mt-10 text-center">
                <a
                  href="#book"
                  onClick={handleButtonClick}
                  className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 font-bold text-white shadow-lg shadow-copper/25 transition-all hover:-translate-y-0.5 hover:bg-copper-dark"
                >
                  Reserve your seat <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* CASE STUDIES */}
        <section className="bg-white">
          <div className="mx-auto max-w-container px-6 py-14 md:py-20">
            <div className="reveal mb-10 max-w-2xl">
              <Eyebrow>Case studies</Eyebrow>
              <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-navy">
                Real client results
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted lg:text-lg">
                See how we help time-poor professionals bypass the noise, secure off-market properties, and build data-driven property portfolios.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div className="reveal d1 relative flex flex-col justify-between overflow-hidden rounded-2xl bg-navy p-7 text-white shadow-xl md:p-9">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy to-black" />
                <div className="relative z-10">
                  <span className="mb-5 inline-block rounded-full border border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest">
                    Featured case study
                  </span>
                  <h3 className="mb-3 text-2xl font-extrabold md:text-3xl">First home to portfolio</h3>
                  <p className="mb-5 max-w-md text-sm leading-relaxed text-paper/80 md:text-base">
                    We guided Chrisal and Dani through buying their first home in just four months. Two years later, after their property value increased by 30%, we helped them secure a second investment property that pays for itself.
                  </p>
                  <p className="text-base font-bold text-orange md:text-lg">Second investment secured</p>
                </div>
                <div className="relative z-10 mt-8 border-t border-white/10 pt-5">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-white/50">Client result</span>
                  <div className="text-3xl font-extrabold text-orange md:text-4xl">30% value increase</div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {[
                  {
                    title: "Healthcare professionals",
                    body: "We used a data-driven strategy to secure Gian and Kaye a brand-new property in a growing suburb that was tenanted almost immediately.",
                    tag: "Strong demand",
                    result: "Tenanted in 1 week",
                  },
                  {
                    title: "Single mum investor",
                    body: "Uma originally wanted to upgrade her home, but shifted to a strategy of purchasing 3-4 investment properties to build long-term security and more time with her son.",
                    tag: "Immediate rental demand",
                    result: "Tenanted at 1st open",
                  },
                ].map((c, i) => (
                  <div key={c.title} className={`reveal d${i + 2} flex flex-1 flex-col justify-between rounded-2xl border border-line bg-panel p-6 shadow-sm transition-transform hover:-translate-y-0.5`}>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-navy md:text-xl">{c.title}</h3>
                      <p className="mb-4 text-xs leading-relaxed text-muted md:text-sm">{c.body}</p>
                    </div>
                    <div className="border-l-4 border-orange pl-4">
                      <div className="text-lg font-extrabold text-navy md:text-xl">{c.result}</div>
                      <div className="mt-0.5 text-xs font-bold uppercase tracking-wider text-muted">{c.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
            <div className="reveal mb-8 text-center">
              <Eyebrow>Get answers</Eyebrow>
              <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="reveal group rounded-2xl border border-line bg-paper px-5 py-4 transition-colors open:border-navy/30 open:bg-white [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                    {faq.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-6 text-sm leading-relaxed text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-white px-6 pb-14 md:pb-20">
          <div className="mx-auto max-w-container">
            <div className="reveal relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] bg-navy p-8 shadow-2xl md:flex-row md:p-12">
              <div className="absolute right-0 top-0 h-80 w-80 -translate-y-1/2 translate-x-1/3 rounded-full bg-orange/10 blur-3xl" />

              <div className="relative z-10 max-w-xl text-center md:text-left">
                <Eyebrow light>Limited spots available</Eyebrow>
                <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Ready to buy <span className="text-orange">with confidence?</span>
                </h2>
                <p className="mt-3.5 text-base text-white/90">
                  Stop guessing. Start investing with a proven, data-driven property system built specifically for expats and first-time buyers.
                </p>
              </div>

              <div className="relative z-10 flex shrink-0 flex-col items-center md:items-end">
                <a
                  href="#book"
                  onClick={handleButtonClick}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 font-bold text-white shadow-lg shadow-orange/20 transition-transform hover:-translate-y-0.5 hover:bg-copper-dark"
                >
                  Register now <ArrowRight className="h-4 w-4" />
                </a>
                <span className="mt-4 text-xs font-medium text-white/80 sm:text-sm">
                  Join 50+ clients making smarter property moves.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PHOTO LIGHTBOX */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button type="button" aria-label="Close" onClick={() => setLightbox(null)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          {photos.length > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }} className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }} className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={`/${photos[lightbox].src}`} alt={photos[lightbox].alt || "Seminar photo"} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            {photos[lightbox].caption && <figcaption className="mt-3 text-center text-sm text-white/80">{photos[lightbox].caption}</figcaption>}
          </figure>
        </div>
      )}

      {/* MOBILE STICKY REGISTER BAR */}
      {status !== "success" && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-container items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-ink">{s.name || "Property seminar"}</div>
              <div className="truncate text-xs text-muted">{s.date || "Date to be confirmed"} · {s.cost || "Free"}</div>
            </div>
            <a
              href="#book"
              onClick={handleButtonClick}
              className="shrink-0 rounded-full bg-copper px-5 py-2.5 text-sm font-bold text-white shadow-md"
            >
              Reserve seat
            </a>
          </div>
        </div>
      )}

      <Footer />
      {/* Spacer so the sticky bar never covers the footer on mobile */}
      {status !== "success" && <div className="h-20 lg:hidden" />}
    </>
  );
}