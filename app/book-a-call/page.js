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
      setFade(true); // Start fade out
      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setFade(false); // Fade back in
      }, 300); // 300ms transition duration
    }, 3000); // 3 seconds per review

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
          body: JSON.stringify({ ...form, source: "Book A Call Page" }), // CRM Routing Tag
        });
      } else {
        await new Promise((r) => setTimeout(r, 800)); // Simulate network request
      }
      
      // Update status to success to trigger the calendar iframe
      setStatus("success");
      
    } catch {
      setStatus("error");
    }
  }

  // Pill-shaped input styling
  const inputClass = "w-full rounded-full bg-gray-100/80 px-6 py-3.5 text-sm text-ink outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-copper/50";
  const selectClass = "w-full rounded-full bg-gray-100/80 px-6 py-3.5 text-sm text-ink outline-none transition-all focus:bg-white focus:ring-2 focus:ring-copper/50 appearance-none cursor-pointer";

  const currentReview = REVIEWS[reviewIndex];

  return (
    <>
      <ScrollReveal />
      <Navbar />
      
      <main className="hero-grad relative overflow-hidden text-paper min-h-[90vh]">
        <div className="relative mx-auto grid max-w-container items-center gap-12 px-6 py-12 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* LEFT COLUMN: Copy & Trust Signals */}
          <div className="reveal flex flex-col h-full justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange2">
              Get in touch
            </span>
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
              Schedule your strategy call
            </h1>
            <p className="mt-5 max-w-md text-paper/80 leading-relaxed">
              Select a time that works best for you below. We will come back with clear, honest next steps tailored to your goals.
            </p>

            {/* Trust Bullets */}
            <ul className="mt-8 space-y-4">
              {TRUST_BULLETS.map((t, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white/10 text-orange2">
                    <Check className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  <span className="text-paper/90">{t}</span>
                </li>
              ))}
            </ul>

            {/* ROTATING REVIEW BOX */}
            <figure 
              className={`mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-opacity duration-300 min-h-[160px] flex flex-col justify-center ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex gap-1 text-gold">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-3 font-display text-lg leading-snug text-paper transition-all">
                “{currentReview.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-orange text-sm font-bold text-white">
                  {currentReview.name.charAt(0)}
                </span>
                <span className="font-semibold text-paper text-sm">{currentReview.name}</span>
              </figcaption>
            </figure>
          </div>

          {/* RIGHT COLUMN: The Form / Calendar Container */}
          <div className="reveal d1 w-full rounded-[2rem] bg-white shadow-2xl overflow-hidden relative">
            
            {status === "success" ? (
              // Embedded GHL Calendar - Fixed Scrolling & Height
              <div className="w-full bg-white relative p-2 sm:p-4">
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/1MzdLOjOF7kLrcs0lCMP"
                  style={{ width: "100%", height: "800px", border: "none" }}
                  scrolling="yes"
                  id="ghl-calendar"
                  className="w-full rounded-xl"
                  title="Book a Call Calendar"
                ></iframe>
              </div>
            ) : (
              // Contact Form
              <>
                <div className="pt-8 pb-4 px-8 sm:px-10">
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
                    <div className="sm:col-span-2 mt-2">
                      <span className="ml-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Investment Profile</span>
                    </div>

                    <div>
                      <select required className={selectClass} value={form.budget} onChange={set("budget")}>
                        <option value="" disabled>Approximate budget*</option>
                        {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <select required className={selectClass} value={form.timeline} onChange={set("timeline")}>
                        <option value="" disabled>Purchase timeline*</option>
                        {TIMELINE.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <select required className={selectClass} value={form.basedIn} onChange={set("basedIn")}>
                        <option value="" disabled>Currently based in*</option>
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

                  {/* Form Footer / Submit Area */}
                  <div className="bg-[#f8fbff] px-8 sm:px-10 py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] text-muted max-w-[250px] leading-relaxed">
                      By clicking submit, you agree to our privacy policy and terms of service.
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto rounded-full bg-navy hover:bg-copper transition-colors px-10 py-3.5 font-bold text-white shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
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