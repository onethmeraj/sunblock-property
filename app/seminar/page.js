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

  const inputClass = "w-full rounded-xl border border-line bg-gray-50 px-5 py-3 text-sm text-ink outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-copper/50";
  const selectClass = "w-full rounded-xl border border-line bg-gray-50 px-5 py-3 text-sm text-ink outline-none transition-all focus:bg-white focus:ring-2 focus:ring-copper/50 appearance-none cursor-pointer";

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        
        {/* HERO & REGISTRATION */}
        <section className="bg-white relative overflow-hidden text-ink pb-20 pt-12 lg:pb-32 lg:pt-20">
          <div className="relative mx-auto max-w-container px-6">
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              
              <div className="max-w-xl">
                <span className="reveal text-xs font-bold uppercase tracking-[0.18em] text-orange">{s.eyebrow || "Upcoming Seminar"}</span>
                <h1 className="reveal d1 mt-4 text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] text-navy">
                  {s.name || "Property Investment Seminar"}
                </h1>
                <p className="reveal d2 mt-6 text-lg text-muted leading-relaxed">
                  {s.tagline || "Learn how to invest in Australian property with clarity and confidence."}
                </p>

                <div className="reveal d2 mt-8 flex flex-wrap gap-3">
                  {[
                    { icon: Calendar, label: s.date || "Date to be confirmed" },
                    { icon: Clock, label: s.time || "Time to be confirmed" },
                    { icon: MapPin, label: s.venue?.name || "Venue to be confirmed" },
                  ].map(({ icon: I, label }, i) => (
                    <span key={i} className="inline-flex items-center gap-2 rounded-full border border-line bg-gray-50 px-4 py-2 text-sm text-navy font-medium">
                      <I className="h-4 w-4 text-orange" /> {label}
                    </span>
                  ))}
                </div>

                <div className="reveal d3 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.offers?.map((o, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-line bg-gray-50 p-4 transition-colors hover:bg-white hover:shadow-sm">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange">
                        <Icon name={o.icon} className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <div className="text-xl font-bold text-navy leading-none">{o.amount}</div>
                        <h3 className="mt-1 text-sm font-semibold text-ink">{o.title}</h3>
                        <p className="mt-1 text-[11px] text-muted leading-snug">{o.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REGISTRATION FORM */}
              <div id="book" className="reveal d2 relative w-full rounded-[2rem] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-black/5">
                <div className="pt-8 pb-4 px-8 sm:px-10 border-b border-line bg-gray-50/50">
                  <h3 className="font-display text-2xl font-bold text-navy">Reserve your seat</h3>
                  <p className="mt-1 text-sm text-muted">Spaces are strictly limited. Register today.</p>
                </div>

                {status === "success" ? (
                  <div className="p-16 text-center min-h-[450px] flex flex-col justify-center items-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                      <Check className="h-8 w-8" strokeWidth={3} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink">Registration Confirmed</h3>
                    <p className="mt-3 text-muted max-w-xs text-sm">Your seat is reserved. We have sent the event details to your email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="px-8 sm:px-10 py-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><input required className={inputClass} placeholder="First name*" value={form.firstName} onChange={set("firstName")} /></div>
                      <div><input required className={inputClass} placeholder="Last name*" value={form.lastName} onChange={set("lastName")} /></div>
                      <div className="sm:col-span-2"><input required type="email" className={inputClass} placeholder="Email address*" value={form.email} onChange={set("email")} /></div>
                      <div className="sm:col-span-2"><input required type="tel" className={inputClass} placeholder="Phone number*" value={form.phone} onChange={set("phone")} /></div>
                      
                      <div className="sm:col-span-2 mt-2">
                        <span className="ml-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Investment Profile</span>
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

                    <div className="bg-[#f8fbff] px-8 sm:px-10 py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] text-muted max-w-[200px] leading-relaxed hidden sm:block">
                        By registering, you agree to our privacy policy and event terms.
                      </div>
                      <button 
                        type="submit" 
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto rounded-full bg-navy hover:bg-copper transition-colors px-10 py-3.5 font-bold text-white shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
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
        <section className="bg-panel py-12 md:py-16 border-y border-line relative z-10">
          <div className="mx-auto max-w-container px-6 text-center reveal">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-10 md:mb-14">
              A more supported way to invest
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-line/60">
              <div className="flex flex-col items-center justify-center pt-8 md:pt-0 reveal d1">
                <span className="text-5xl md:text-6xl font-extrabold text-orange mb-3">50+</span>
                <span className="text-sm font-bold text-navy uppercase tracking-widest">Client Reviews</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-8 md:pt-0 reveal d2">
                <span className="text-5xl md:text-6xl font-extrabold text-orange mb-3">12+</span>
                <span className="text-sm font-bold text-navy uppercase tracking-widest">Years Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-8 md:pt-0 reveal d3">
                <span className="text-5xl md:text-6xl font-extrabold text-orange mb-3">500+</span>
                <span className="text-sm font-bold text-navy uppercase tracking-widest">Clients Supported</span>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="bg-white py-20 md:py-32">
          <div className="mx-auto max-w-container px-6">
            <div className="reveal text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-[1.1] text-navy">
                <span className="text-muted line-through decoration-orange/40 decoration-[4px]">Investing With Guesswork.</span><br/>
                <span className="text-orange">Investing with certainty.</span>
              </h2>
              <p className="mt-6 text-lg text-muted">
                See the difference between scrolling through unfamiliar listings and using a data-driven system to secure your property.
              </p>
            </div>
            
            <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white font-black text-lg border-4 border-white shadow-xl reveal">
                VS
              </div>
              
              <div className="reveal d1 rounded-3xl border border-line bg-gray-50 p-8 md:p-12 h-full">
                <h3 className="text-xl md:text-2xl font-bold text-navy mb-8 text-center md:text-left">Investing Without A System</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start text-muted">
                    <X className="h-6 w-6 shrink-0 text-gray-400 mt-0.5"/> 
                    <span className="leading-relaxed">Overwhelmed by hundreds of listings and unfamiliar markets.</span>
                  </li>
                  <li className="flex gap-4 items-start text-muted">
                    <X className="h-6 w-6 shrink-0 text-gray-400 mt-0.5"/> 
                    <span className="leading-relaxed">Fear of making a $500K+ mistake due to lack of local insight.</span>
                  </li>
                  <li className="flex gap-4 items-start text-muted">
                    <X className="h-6 w-6 shrink-0 text-gray-400 mt-0.5"/> 
                    <span className="leading-relaxed">Relying on real estate agents who work exclusively for the seller.</span>
                  </li>
                </ul>
              </div>

              <div className="reveal d2 rounded-3xl bg-navy text-white p-8 md:p-12 shadow-2xl transform md:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-bl-full blur-2xl"></div>
                <h3 className="text-xl md:text-2xl font-bold mb-8 text-center md:text-left relative z-10">
                  Investing With <span className="text-orange">Sunblock</span>
                </h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4 items-start text-paper/90">
                    <Check className="h-6 w-6 shrink-0 text-orange mt-0.5"/> 
                    <span className="leading-relaxed font-medium">Data-driven shortlist removing the guesswork and emotion.</span>
                  </li>
                  <li className="flex gap-4 items-start text-paper/90">
                    <Check className="h-6 w-6 shrink-0 text-orange mt-0.5"/> 
                    <span className="leading-relaxed font-medium">Built-in risk management and cash buffer planning.</span>
                  </li>
                  <li className="flex gap-4 items-start text-paper/90">
                    <Check className="h-6 w-6 shrink-0 text-orange mt-0.5"/> 
                    <span className="leading-relaxed font-medium">100% independent representation acting solely in your interest.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* REDESIGNED AGENDA SECTION */}
        <section className="bg-panel">
          <div className="mx-auto max-w-container px-6 py-20 md:py-32">
            <div className="reveal max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                SYLLABUS
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-ink">
                What You’ll Learn
              </h2>
              <p className="mt-5 text-lg text-muted leading-relaxed">
                Master the exact frameworks and strategies we use to consistently identify and secure high-performing investment properties across Australia.
              </p>
            </div>
            
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {s.agenda?.map((item, i) => {
                const title = item.title || `Agenda Item 0${i + 1}`;
                const desc = item.desc || item;

                return (
                  <div key={i} className="reveal card-hover relative flex flex-col rounded-2xl border border-line bg-white p-10 shadow-sm transition-all hover:border-orange/30 hover:shadow-lg">
                    <div className="mb-4 font-display text-7xl font-extrabold text-navy/5">0{i + 1}</div>
                    <h3 className="mb-3 font-display text-2xl font-bold text-navy">{title}</h3>
                    <p className="text-muted leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-container px-6 py-20 md:py-32 border-t border-line">
            <div className="reveal mb-14">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                CASE STUDIES
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-navy">
                Real Client Results
              </h2>
              <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
                See how we help time-poor professionals bypass the noise, secure off-market properties, and build data-driven wealth.
              </p>
            </div>

            <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
              
              <div className="reveal d1 rounded-3xl bg-navy text-white p-10 md:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-navy to-black z-0"></div>
                <div className="relative z-10">
                  <span className="inline-block border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-8">
                    Featured Case Study
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-5">First Home to Portfolio</h3>
                  <p className="text-paper/80 leading-relaxed mb-6 max-w-md">
                    We restructured Chrisal and Dani's finances so they could buy their first home in just four months. Two years later, after their property value increased by 30%, we helped them use that equity to secure a positively geared investment property despite rising interest rates.
                  </p>
                  <p className="font-bold text-orange text-lg">Positively geared investment</p>
                </div>
                <div className="relative z-10 mt-16 border-t border-white/10 pt-8">
                  <span className="text-xs font-bold text-white/50 tracking-widest uppercase mb-2 block">Client Result</span>
                  <div className="text-5xl font-extrabold text-orange">30% VALUE INCREASE</div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                
                <div className="reveal d2 rounded-3xl bg-panel border border-line p-8 md:p-10 flex-1 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-1">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-navy mb-4">Healthcare Professionals</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                      After helping Gian and Kaye consolidate debt, we used a data-driven strategy to secure them a brand-new property in a growing suburb with instant equity.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Instant Equity</p>
                    <div className="inline-block bg-orange text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange/20">
                      TENANTED IN 1 WEEK
                    </div>
                  </div>
                </div>

                <div className="reveal d3 rounded-3xl bg-panel border border-line p-8 md:p-10 flex-1 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-1">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-navy mb-4">Single Mum Investor</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                      Uma originally wanted to upgrade her home, but shifted to a strategy of purchasing 3-4 positively geared properties to achieve financial freedom and more time with her son.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Positively Geared</p>
                    <div className="border-l-4 border-orange pl-5">
                      <div className="text-2xl font-extrabold text-navy">TENANTED AT 1ST OPEN</div>
                      <div className="text-xs font-bold text-muted uppercase tracking-wider mt-1">Immediate Income</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* MEET KAUSHI SECTION */}
        <section className="bg-panel overflow-hidden border-t border-line">
          <div className="mx-auto max-w-container px-6 py-20 md:py-32">
            <div className="grid gap-16 md:grid-cols-2 items-center">
              
              <div className="reveal order-last md:order-first">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                  LICENSED BUYER'S AGENT & FOUNDER
                </div>
                <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-ink">
                  Meet Kaushi
                </h2>
                <p className="mt-6 text-lg text-muted leading-relaxed">
                  An experienced Licensed Buyer's Agent, Kaushi spent years navigating the Australian property market. She built Sunblock Property to bring an analytical, calm, and data-driven approach to property investing, specifically helping migrants, expats, and busy professionals make confident decisions without the sales hype.
                </p>
                
                <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
                  <span className="font-display text-xl font-bold text-navy">Kaushi</span>
                </div>
              </div>

              <div className="reveal relative">
                <div className="photo aspect-[4/5] w-full rounded-3xl shadow-xl overflow-hidden bg-gray-100">
                  <img src="/kaushi-profile.jpg" alt="Kaushi" className="absolute inset-0 h-full w-full object-cover object-center" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-container px-6 py-20 md:py-32">
            <div className="reveal max-w-2xl mb-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                GET ANSWERS
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.1] text-ink">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="reveal">
                  <details className="group border-b border-line pb-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between font-bold text-navy list-none text-sm uppercase tracking-wide">
                      {faq.q}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </summary>
                    <p className="mt-4 text-muted leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="bg-panel px-6 py-20">
          <div className="mx-auto max-w-container">
            <div className="reveal flex flex-col md:flex-row items-center justify-between gap-10 rounded-[2.5rem] bg-navy p-10 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="max-w-xl relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur">
                  <span className="flex h-2 w-2 rounded-full bg-copper"></span>
                  LIMITED SPOTS AVAILABLE
                </div>
                <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl leading-tight">
                  Ready To Buy <br/> <span className="text-orange">With Confidence?</span>
                </h2>
                <p className="mt-5 text-white/90 text-lg">
                  Stop guessing. Start investing with a proven, data-driven system built specifically for expats and first-time buyers.
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0 relative z-10">
                <a 
                  href="#book" 
                  onClick={handleButtonClick}
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 font-bold text-white shadow-lg shadow-orange/20 transition-transform hover:-translate-y-1 hover:bg-copper-dark"
                >
                  REGISTER NOW <span aria-hidden="true">→</span>
                </a>
                <div className="mt-5">
                  <span className="text-sm font-medium text-white/90 leading-tight">
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