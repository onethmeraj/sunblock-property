"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Check, X } from "lucide-react"; 
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

const BUDGETS = ["Under $500k", "$500k – $750k", "$750k – $1M", "$1M – $1.5M", "$1.5M+", "Not sure yet"];
const TIMELINE = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];

const FAQS = [
  { q: "Is this really free?", a: "Yes, 100% free with no sales pressure. Our goal is to educate and empower you." },
  { q: "Will this be recorded?", a: "To encourage open Q&A and protect the exclusivity of the data shared, we do not distribute recordings." },
  { q: "I am between contracts right now, should I attend?", a: "Absolutely. Planning your strategy before you are ready to buy is the best way to ensure you can act fast when the time comes." },
  { q: "Why use a buyer's agent?", a: "We level the playing field. We give you access to off-market properties, negotiate on your behalf, and remove the emotion and guesswork from investing." }
];

export default function SeminarPage() {
  const s = site.seminarPage || { offers: [], agenda: [] };

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    basedIn: "", investedBefore: "", budget: "", timeline: ""
  });
  const [status, setStatus] = useState("idle");

  // META PIXEL SCROLL TRACKING
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowSize = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      const scrollPercentage = Math.round((scrollPosition / (bodyHeight - windowSize)) * 100);

      if (scrollPercentage > 50 && !window.hasFiredScroll50) {
        window.hasFiredScroll50 = true; 
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'Scrolled_50_Percent_Seminar');
        }
      }
      
      if (scrollPercentage > 90 && !window.hasFiredScroll90) {
        window.hasFiredScroll90 = true; 
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('trackCustom', 'Scrolled_90_Percent_Seminar');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // META PIXEL LEAD TRACKING ON FORM SUBMISSION
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      if (site.forms?.seminar) {
        await fetch(site.forms.seminar, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source: "Seminar Registration" }), 
        });
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      
      // Fire Meta Pixel Lead Event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // META PIXEL BUTTON CLICK TRACKING
  const handleButtonClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'Clicked_Register_Seminar');
    }
  };

  const inputClass = "w-full rounded-xl border border-line bg-gray-50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy";
  const selectClass = "w-full rounded-xl border border-line bg-gray-50 px-4 py-3 text-sm text-ink outline-none transition-all focus:bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy appearance-none cursor-pointer";

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="bg-paper">
        
        {/* HERO & REGISTRATION */}
        <section className="relative overflow-hidden bg-paper text-ink pb-10 pt-8 lg:pb-14 lg:pt-14">
          <div className="relative mx-auto max-w-container px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              
              <div className="max-w-xl">
                <span className="reveal text-xs font-bold uppercase tracking-[0.18em] text-orange">
                  {s.eyebrow || "Upcoming Seminar"}
                </span>

                {/* Solid Ink Headline */}
                <h1 className="reveal d1 mt-3 font-display text-[clamp(2.35rem,4.5vw,3.75rem)] font-extrabold leading-[1.12] tracking-tight text-ink">
                  {s.name || "Property Investment Seminar"}
                </h1>

                <p className="reveal d2 mt-4 text-base text-muted leading-relaxed lg:text-lg">
                  {s.tagline || "Learn how to invest in Australian property with clarity and confidence."}
                </p>

                {/* Event Metadata Badges */}
                <div className="reveal d2 mt-6 flex flex-wrap gap-2.5">
                  {[
                    { icon: Calendar, label: s.date || "Date to be confirmed" },
                    { icon: Clock, label: s.time || "Time to be confirmed" },
                    { icon: MapPin, label: s.venue?.name || "Venue to be confirmed" },
                  ].map(({ icon: I, label }, i) => (
                    <span key={i} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink shadow-sm sm:text-sm">
                      <I className="h-4 w-4 text-orange" /> {label}
                    </span>
                  ))}
                </div>

                {/* Enhanced & Highlighted Offers / Reward Cards */}
                <div className="reveal d3 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {s.offers && s.offers.length > 0 ? (
                    s.offers.map((o, i) => {
                      const isFirst = i === 0;
                      return (
                        <div 
                          key={i} 
                          className={`relative overflow-hidden rounded-2xl border-2 p-5 shadow-sm transition-all hover:shadow-md ${
                            isFirst 
                              ? "border-orange/30 bg-gradient-to-br from-orange/5 via-white to-white hover:border-orange/50" 
                              : "border-navy/25 bg-gradient-to-br from-navy/5 via-white to-white hover:border-navy/40"
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                              isFirst ? "bg-orange/15 text-orange" : "bg-navy/15 text-navy"
                            }`}>
                              <Icon name={o.icon} className="h-5 w-5" strokeWidth={2} />
                            </span>
                            <div>
                              <div className={`text-2xl font-black tracking-tight leading-none ${
                                isFirst ? "text-orange" : "text-navy"
                              }`}>
                                {o.amount}
                              </div>
                              <h3 className="mt-1 text-sm font-bold text-ink">{o.title}</h3>
                              <p className="mt-1 text-xs text-muted leading-relaxed">{o.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      {/* Fallback Attendee Bonus */}
                      <div className="relative overflow-hidden rounded-2xl border-2 border-orange/30 bg-gradient-to-br from-orange/5 via-white to-white p-5 shadow-sm transition-all hover:border-orange/50 hover:shadow-md">
                        <div className="flex items-start gap-3.5">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange/15 text-orange">
                            <Icon name="gift" className="h-5 w-5" strokeWidth={2} />
                          </span>
                          <div>
                            <div className="text-2xl font-black tracking-tight text-orange leading-none">A$5,000</div>
                            <h3 className="mt-1 text-sm font-bold text-ink">Attendee bonus</h3>
                            <p className="mt-1 text-xs text-muted leading-relaxed">Register and attend to unlock an exclusive bonus. Terms and conditions apply.</p>
                          </div>
                        </div>
                      </div>

                      {/* Fallback Referral Reward */}
                      <div className="relative overflow-hidden rounded-2xl border-2 border-navy/25 bg-gradient-to-br from-navy/5 via-white to-white p-5 shadow-sm transition-all hover:border-navy/40 hover:shadow-md">
                        <div className="flex items-start gap-3.5">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/15 text-navy">
                            <Icon name="users" className="h-5 w-5" strokeWidth={2} />
                          </span>
                          <div>
                            <div className="text-2xl font-black tracking-tight text-navy leading-none">A$2,700</div>
                            <h3 className="mt-1 text-sm font-bold text-ink">Referral reward</h3>
                            <p className="mt-1 text-xs text-muted leading-relaxed">Refer a friend who works with us and earn a referral reward. Terms and conditions apply.</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* REGISTRATION FORM */}
              <div id="book" className="reveal d2 relative w-full rounded-[2rem] bg-white shadow-xl border border-line overflow-hidden">
                <div className="pt-6 pb-4 px-6 sm:px-8 border-b border-line bg-gray-50/60">
                  <h3 className="font-display text-2xl font-bold text-ink">Reserve your seat</h3>
                  <p className="mt-1 text-sm text-muted">Spaces are strictly limited. Register today.</p>
                </div>

                {status === "success" ? (
                  <div className="p-12 text-center min-h-[420px] flex flex-col justify-center items-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-5">
                      <Check className="h-8 w-8" strokeWidth={3} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink">Registration Confirmed</h3>
                    <p className="mt-2 text-muted max-w-xs text-sm">Your seat is reserved. We have sent the event details to your email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div><input required className={inputClass} placeholder="First name*" value={form.firstName} onChange={set("firstName")} /></div>
                      <div><input required className={inputClass} placeholder="Last name*" value={form.lastName} onChange={set("lastName")} /></div>
                      <div className="sm:col-span-2"><input required type="email" className={inputClass} placeholder="Email address*" value={form.email} onChange={set("email")} /></div>
                      <div className="sm:col-span-2"><input required type="tel" className={inputClass} placeholder="Phone number*" value={form.phone} onChange={set("phone")} /></div>
                      
                      <div className="sm:col-span-2 mt-1">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Investment Profile</span>
                      </div>

                      <div>
                        <select required className={selectClass} value={form.budget} onChange={set("budget")}>
                          <option value="" disabled>Approx budget*</option>
                          {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <select required className={selectClass} value={form.timeline} onChange={set("timeline")}>
                          <option value="" disabled>Timeline*</option>
                          {TIMELINE.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <select required className={selectClass} value={form.basedIn} onChange={set("basedIn")}>
                          <option value="" disabled>Based in*</option>
                          <option value="Australia">Australia</option>
                          <option value="Overseas">Overseas</option>
                        </select>
                      </div>
                      <div>
                        <select required className={selectClass} value={form.investedBefore} onChange={set("investedBefore")}>
                          <option value="" disabled>Invested before?*</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No (First-time)</option>
                        </select>
                      </div>
                    </div>

                    {/* Single-Line Action Button & Terms */}
                    <div className="bg-[#f8fbff] px-6 sm:px-8 py-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-muted leading-relaxed sm:max-w-[200px]">
                        By registering, you agree to our{" "}
                        <a href="/privacy-policy" className="text-ink underline hover:text-copper">privacy policy</a>{" "}
                        and event terms.
                      </p>
                      <button 
                        type="submit" 
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto shrink-0 whitespace-nowrap rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-copper hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {status === "submitting" ? "Processing..." : "Complete Registration"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
            </div>
          </div>
        </section>

        {/* STATS / TRUST BANNER */}
        <section className="bg-panel py-10 md:py-12 border-y border-line relative z-10">
          <div className="mx-auto max-w-container px-6 text-center reveal">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-8">
              A more supported way to invest
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-line/60">
              <div className="flex flex-col items-center justify-center pt-6 md:pt-0 reveal d1">
                <span className="text-4xl md:text-5xl font-extrabold text-orange mb-2">50+</span>
                <span className="text-xs sm:text-sm font-bold text-navy uppercase tracking-widest">Client Reviews</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-6 md:pt-0 reveal d2">
                <span className="text-4xl md:text-5xl font-extrabold text-orange mb-2">12+</span>
                <span className="text-xs sm:text-sm font-bold text-navy uppercase tracking-widest">Years Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-6 md:pt-0 reveal d3">
                <span className="text-4xl md:text-5xl font-extrabold text-orange mb-2">500+</span>
                <span className="text-xs sm:text-sm font-bold text-navy uppercase tracking-widest">Clients Supported</span>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-container px-6">
            <div className="reveal text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.25rem)] font-extrabold leading-[1.12] text-navy">
                <span className="text-muted line-through decoration-orange/40 decoration-[4px]">Investing With Guesswork.</span><br/>
                <span className="text-orange">Investing with certainty.</span>
              </h2>
              <p className="mt-3 text-base md:text-lg text-muted">
                See the difference between scrolling through unfamiliar listings and using a data-driven system to secure your property.
              </p>
            </div>
            
            <div className="relative grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-orange text-white font-black text-sm border-4 border-white shadow-xl reveal">
                VS
              </div>
              
              <div className="reveal d1 rounded-2xl border border-line bg-gray-50 p-6 md:p-8 h-full">
                <h3 className="text-xl font-bold text-navy mb-5 text-center md:text-left">Investing Without A System</h3>
                <ul className="space-y-3.5">
                  <li className="flex gap-3.5 items-start text-muted text-sm md:text-base">
                    <X className="h-5 w-5 shrink-0 text-gray-400 mt-0.5"/> 
                    <span className="leading-relaxed">Overwhelmed by hundreds of listings and unfamiliar markets.</span>
                  </li>
                  <li className="flex gap-3.5 items-start text-muted text-sm md:text-base">
                    <X className="h-5 w-5 shrink-0 text-gray-400 mt-0.5"/> 
                    <span className="leading-relaxed">Fear of making a $500K+ mistake due to lack of local insight.</span>
                  </li>
                  <li className="flex gap-3.5 items-start text-muted text-sm md:text-base">
                    <X className="h-5 w-5 shrink-0 text-gray-400 mt-0.5"/> 
                    <span className="leading-relaxed">Relying on real estate agents who work exclusively for the seller.</span>
                  </li>
                </ul>
              </div>

              <div className="reveal d2 rounded-2xl bg-navy text-white p-6 md:p-8 shadow-xl transform md:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-bl-full blur-2xl"></div>
                <h3 className="text-xl font-bold mb-5 text-center md:text-left relative z-10">
                  Investing With <span className="text-orange">Sunblock</span>
                </h3>
                <ul className="space-y-3.5 relative z-10">
                  <li className="flex gap-3.5 items-start text-paper/90 text-sm md:text-base">
                    <Check className="h-5 w-5 shrink-0 text-orange mt-0.5"/> 
                    <span className="leading-relaxed font-medium">Data-driven shortlist removing the guesswork and emotion.</span>
                  </li>
                  <li className="flex gap-3.5 items-start text-paper/90 text-sm md:text-base">
                    <Check className="h-5 w-5 shrink-0 text-orange mt-0.5"/> 
                    <span className="leading-relaxed font-medium">Built-in risk management and cash buffer planning.</span>
                  </li>
                  <li className="flex gap-3.5 items-start text-paper/90 text-sm md:text-base">
                    <Check className="h-5 w-5 shrink-0 text-orange mt-0.5"/> 
                    <span className="leading-relaxed font-medium">100% independent representation acting solely in your interest.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AGENDA SECTION */}
        <section className="bg-panel border-t border-line">
          <div className="mx-auto max-w-container px-6 py-12 md:py-16">
            <div className="reveal max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1 text-xs font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                SYLLABUS
              </div>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                What You’ll Learn
              </h2>
              <p className="mt-3 text-base text-muted leading-relaxed lg:text-lg">
                Master the exact frameworks and strategies we use to consistently identify and secure high-performing investment properties across Australia.
              </p>
            </div>
            
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {s.agenda?.map((item, i) => {
                const title = item.title || `Agenda Item 0${i + 1}`;
                const desc = item.desc || item;

                return (
                  <div key={i} className="reveal card-hover relative flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:border-orange/30 hover:shadow-md">
                    <div className="mb-2 font-display text-5xl font-extrabold text-navy/10">0{i + 1}</div>
                    <h3 className="mb-2 font-display text-xl font-bold text-navy">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-container px-6 py-12 md:py-16 border-t border-line">
            <div className="reveal mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1 text-xs font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                CASE STUDIES
              </div>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] text-navy">
                Real Client Results
              </h2>
              <p className="mt-3 text-base text-muted max-w-2xl leading-relaxed lg:text-lg">
                See how we help time-poor professionals bypass the noise, secure off-market properties, and build data-driven wealth.
              </p>
            </div>

            <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
              
              <div className="reveal d1 rounded-2xl bg-navy text-white p-7 md:p-9 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-navy to-black z-0"></div>
                <div className="relative z-10">
                  <span className="inline-block border border-white/20 rounded-full px-3.5 py-1 text-xs font-bold tracking-widest uppercase mb-5">
                    Featured Case Study
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-3">First Home to Portfolio</h3>
                  <p className="text-paper/80 text-sm md:text-base leading-relaxed mb-5 max-w-md">
                    We restructured Chrisal and Dani's finances so they could buy their first home in just four months. Two years later, after their property value increased by 30%, we helped them use that equity to secure a positively geared investment property despite rising interest rates.
                  </p>
                  <p className="font-bold text-orange text-base md:text-lg">Positively geared investment</p>
                </div>
                <div className="relative z-10 mt-8 border-t border-white/10 pt-5">
                  <span className="text-xs font-bold text-white/50 tracking-widest uppercase mb-1 block">Client Result</span>
                  <div className="text-3xl md:text-4xl font-extrabold text-orange">30% VALUE INCREASE</div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                
                <div className="reveal d2 rounded-2xl bg-panel border border-line p-6 flex-1 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-0.5">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-navy mb-2">Healthcare Professionals</h3>
                    <p className="text-muted text-xs md:text-sm leading-relaxed mb-4">
                      After helping Gian and Kaye consolidate debt, we used a data-driven strategy to secure them a brand-new property in a growing suburb with instant equity.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Instant Equity</p>
                    <div className="inline-block bg-orange text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-orange/20">
                      TENANTED IN 1 WEEK
                    </div>
                  </div>
                </div>

                <div className="reveal d3 rounded-2xl bg-panel border border-line p-6 flex-1 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-0.5">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-navy mb-2">Single Mum Investor</h3>
                    <p className="text-muted text-xs md:text-sm leading-relaxed mb-4">
                      Uma originally wanted to upgrade her home, but shifted to a strategy of purchasing 3-4 positively geared properties to achieve financial freedom and more time with her son.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Positively Geared</p>
                    <div className="border-l-4 border-orange pl-4">
                      <div className="text-lg md:text-xl font-extrabold text-navy">TENANTED AT 1ST OPEN</div>
                      <div className="text-xs font-bold text-muted uppercase tracking-wider mt-0.5">Immediate Income</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* MEET KAUSHI SECTION */}
        <section className="bg-panel overflow-hidden border-t border-line">
          <div className="mx-auto max-w-container px-6 py-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              
              <div className="reveal order-last md:order-first">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1 text-xs font-semibold text-navy shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                  LICENSED BUYER'S AGENT & FOUNDER
                </div>
                <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                  Meet Kaushi
                </h2>
                <p className="mt-3.5 text-base text-muted leading-relaxed lg:text-lg">
                  An experienced Licensed Buyer's Agent, Kaushi spent years navigating the Australian property market. She built Sunblock Property to bring an analytical, calm, and data-driven approach to property investing, specifically helping migrants, expats, and busy professionals make confident decisions without the sales hype.
                </p>
                
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="font-display text-xl font-bold text-navy">Kaushi</span>
                </div>
              </div>

              <div className="reveal relative">
                <div className="photo aspect-[4/5] w-full rounded-2xl shadow-xl overflow-hidden bg-gray-100">
                  <img src="/kaushi.jpg" alt="Kaushi" className="absolute inset-0 h-full w-full object-cover object-center" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SPEAKERS SECTION: Tarindu & The Solicitor */}
        <section className="bg-white border-t border-line py-12 md:py-16">
          <div className="mx-auto max-w-container px-6">
            
            <div className="reveal max-w-2xl mx-auto text-center mb-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1 text-xs font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                EVENT SPEAKERS
              </div>
              <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.15] text-ink">
                Learn From The Experts
              </h2>
              <p className="mt-2.5 text-sm md:text-base text-muted leading-relaxed">
                Get practical property strategies and critical legal insights directly from industry professionals actively securing high-performing assets.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              
              {/* Speaker 1: Tarindu */}
              <div className="reveal d1 rounded-2xl border border-line bg-panel p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all hover:border-orange/40 hover:shadow-md">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-200 shadow-inner">
                  <img 
                    src="/tarindu.jpg" 
                    alt="Tarindu" 
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block rounded-md bg-orange/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase text-orange">
                    Property & Wealth Strategist
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink">
                    Tarindu
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed">
                    Specializing in market research, cash-flow analysis, and portfolio growth strategies tailored for working professionals and expats.
                  </p>
                </div>
              </div>

              {/* Speaker 2: The Solicitor */}
              <div className="reveal d2 rounded-2xl border border-line bg-panel p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all hover:border-navy/40 hover:shadow-md">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-200 shadow-inner">
                  <img 
                    src="/solicitor.jpg" 
                    alt="Property Solicitor" 
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block rounded-md bg-navy/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase text-navy">
                    Legal & Conveyancing Expert
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink">
                    Property Solicitor
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-muted leading-relaxed">
                    Guiding buyers through contract reviews, off-the-plan terms, title searches, and mitigating transaction risks before settlement.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-panel border-t border-line">
          <div className="mx-auto max-w-container px-6 py-12 md:py-16">
            <div className="reveal max-w-2xl mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1 text-xs font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                GET ANSWERS
              </div>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] text-ink">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="reveal">
                  <details className="group border-b border-line pb-4 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between font-bold text-navy list-none text-sm uppercase tracking-wide">
                      {faq.q}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </summary>
                    <p className="mt-3 text-sm text-muted leading-relaxed pr-6">
                      {faq.a}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="bg-white px-6 py-12 md:py-16">
          <div className="mx-auto max-w-container">
            <div className="reveal flex flex-col md:flex-row items-center justify-between gap-8 rounded-[2rem] bg-navy p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="max-w-xl relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
                  <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                  LIMITED SPOTS AVAILABLE
                </div>
                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl leading-tight">
                  Ready To Buy <br/> <span className="text-orange">With Confidence?</span>
                </h2>
                <p className="mt-3.5 text-white/90 text-base">
                  Stop guessing. Start investing with a proven, data-driven system built specifically for expats and first-time buyers.
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0 relative z-10">
                <a 
                  href="#book" 
                  onClick={handleButtonClick}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-3.5 font-bold text-white shadow-lg shadow-orange/20 transition-transform hover:-translate-y-0.5 hover:bg-copper-dark"
                >
                  REGISTER NOW <span aria-hidden="true">→</span>
                </a>
                <div className="mt-4">
                  <span className="text-xs sm:text-sm font-medium text-white/90 leading-tight">
                    Join 50+ clients making smarter property moves.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}