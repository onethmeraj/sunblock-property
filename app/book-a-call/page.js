"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Star } from "lucide-react";
import { site } from "@/lib/site";

const BUDGETS = ["Under $500k", "$500k – $750k", "$750k – $1M", "$1M – $1.5M", "$1.5M+", "Not sure yet"];
const TIMELINE = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];

const TRUST_BULLETS = [
  "A relaxed, no pressure conversation",
  "Honest guidance tailored to your goals",
  "We only reach out to help, never to spam",
];

// The array of reviews that will rotate every 3 seconds
const REVIEWS = [
  { quote: "Great attention to detail and strong understanding of client needs. Very supportive and professional.", name: "Elaine Cai" },
  { quote: "Kaushi made the entire process clear and stress-free. Highly recommended for first-time investors.", name: "Mark Taylor" },
  { quote: "Exceptional market knowledge. We found exactly what we were looking for within our exact budget.", name: "Sarah Lin" }
];

export default function BookACallPage() {
  // Form State
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    basedIn: "", investedBefore: "", budget: "", timeline: ""
  });
  const [status, setStatus] = useState("idle");

  // Rotating Review State
  const [reviewIndex, setReviewIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // 3-Second Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); 
      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setFade(false); 
      }, 300); 
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      if (site.forms?.general) {
        await fetch(site.forms.general, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source: "Book A Call Page" }), 
        });
      } else {
        await new Promise((r) => setTimeout(r, 800)); 
      }
      
      // Update status to success to trigger the calendar iframe
      setStatus("success");
      
    } catch {
      setStatus("error");
    }
  }

  // Premium ghost-white input styling matching the homepage form
  const inputClass = "w-full rounded-2xl border-none bg-gray-100/80 px-5 py-4 text-sm text-ink outline-none transition-all placeholder:text-gray-400 focus:bg-gray-200 focus:ring-2 focus:ring-navy/20";
  const selectClass = "w-full rounded-2xl border-none bg-gray-100/80 px-5 py-4 text-sm text-ink outline-none transition-all focus:bg-gray-200 focus:ring-2 focus:ring-navy/20 appearance-none cursor-pointer";

  const currentReview = REVIEWS[reviewIndex];

  return (
    <>
      <ScrollReveal />
      <Navbar />
      
      {/* THE FIX: Changed to the premium Ghost White background */}
      <main className="bg-[#f8f9fa] relative overflow-hidden min-h-[90vh] pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="relative mx-auto grid max-w-container items-start gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
          
          {/* LEFT COLUMN: Copy & Trust Signals */}
          <div className="reveal flex flex-col h-full justify-start sticky top-32">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper">
              Get in touch
            </span>
            
            <h1 className="mt-4 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-[1.1] text-navy">
              Schedule your strategy call
            </h1>
            
            <p className="mt-5 max-w-md text-base md:text-lg text-muted leading-relaxed">
              Select a time that works best for you below. We will come back with clear, honest next steps tailored to your goals.
            </p>

            {/* Trust Bullets */}
            <ul className="mt-8 space-y-4">
              {TRUST_BULLETS.map((t, i) => (
                <li key={i} className="flex items-center gap-3.5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-copper/20 text-copper">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-ink">{t}</span>
                </li>
              ))}
            </ul>

            {/* ROTATING REVIEW BOX */}
            <figure 
              className={`mt-12 max-w-md rounded-3xl border border-line bg-white p-8 shadow-xl shadow-black/5 transition-opacity duration-300 min-h-[160px] flex flex-col justify-center hidden md:flex ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="mb-4 flex gap-1 text-lg text-gold">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-display text-lg font-medium leading-snug text-navy transition-all">
                “{currentReview.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-copper font-bold text-white shadow-sm">
                  {currentReview.name.charAt(0)}
                </span>
                <span className="font-bold text-ink">{currentReview.name}</span>
              </figcaption>
            </figure>
          </div>

          {/* RIGHT COLUMN: The Form / Calendar Container */}
          <div className="reveal d1 w-full rounded-[2.5rem] bg-white shadow-2xl shadow-navy/5 border border-line overflow-hidden relative">
            
            {status === "success" ? (
              // Embedded GHL Calendar - Fixed Scrolling & Height
              <div className="w-full bg-white relative p-2 sm:p-4">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/1MzdLOjOF7kLrcs0lCMP"
                  style={{ width: "100%", height: "800px", border: "none" }}
                  scrolling="yes"
                  id="ghl-calendar"
                  className="w-full rounded-2xl"
                  title="Book a Call Calendar"
                ></iframe>
              </div>
            ) : (
              // Contact Form
              <>
                <div className="pt-8 pb-6 px-8 sm:px-10">
                  <h2 className="font-display text-2xl font-bold text-navy">Your Details</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="px-8 sm:px-10 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Personal Details */}
                    <div>
                      <input required className={inputClass} placeholder="First name*" value={form.firstName} onChange={set("firstName")} />
                    </div>
                    <div>
                      <input required className={inputClass} placeholder="Last name*" value={form.lastName} onChange={set("lastName")} />
                    </div>
                    <div className="sm:col-span-2">
                      <input required type="email" className={inputClass} placeholder="Email address*" value={form.email} onChange={set("email")} />
                    </div>
                    <div className="sm:col-span-2">
                      <input required type="tel" className={inputClass} placeholder="Phone number*" value={form.phone} onChange={set("phone")} />
                    </div>
                    
                    {/* Investment Profile Split */}
                    <div className="sm:col-span-2 mt-4 pb-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Investment Profile</span>
                    </div>

                    <div>
                      <select required className={`${selectClass} ${!form.budget ? 'text-gray-400' : 'text-ink'}`} value={form.budget} onChange={set("budget")}>
                        <option value="" disabled>Approximate budget*</option>
                        {BUDGETS.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <select required className={`${selectClass} ${!form.timeline ? 'text-gray-400' : 'text-ink'}`} value={form.timeline} onChange={set("timeline")}>
                        <option value="" disabled>Purchase timeline*</option>
                        {TIMELINE.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <select required className={`${selectClass} ${!form.basedIn ? 'text-gray-400' : 'text-ink'}`} value={form.basedIn} onChange={set("basedIn")}>
                        <option value="" disabled>Currently based in*</option>
                        <option value="Australia" className="text-ink">Australia</option>
                        <option value="Overseas" className="text-ink">Overseas</option>
                      </select>
                    </div>
                    <div>
                      <select required className={`${selectClass} ${!form.investedBefore ? 'text-gray-400' : 'text-ink'}`} value={form.investedBefore} onChange={set("investedBefore")}>
                        <option value="" disabled>Invested before?*</option>
                        <option value="Yes" className="text-ink">Yes</option>
                        <option value="No" className="text-ink">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Form Footer / Submit Area */}
                  <div className="bg-[#f8fbff] px-8 sm:px-10 py-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-[11px] text-muted sm:max-w-[220px] leading-relaxed">
                      By clicking submit, you agree to our <a href="/privacy-policy" className="text-ink underline hover:text-copper">privacy policy</a> and terms of service.
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto rounded-full bg-navy px-10 py-4 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-all hover:-translate-y-0.5 hover:bg-navy/90 hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {status === "submitting" ? "Sending..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}