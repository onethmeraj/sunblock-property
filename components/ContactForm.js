"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { site } from "@/lib/site";

const BUDGETS = ["Under $500k", "$500k – $750k", "$750k – $1M", "$1M – $1.5M", "$1.5M+", "Not sure yet"];
const DEPOSIT = ["Yes", "No", "Not sure"];
const TIMELINE = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just researching"];
const GOALS = ["Buy my first home", "Buy an investment property", "Build a property portfolio", "Not sure yet"];

const TRUST = [
  "A relaxed, no pressure conversation",
  "Honest guidance tailored to your goals",
  "We only reach out to help, never to spam",
];

export default function ContactForm({
  source = "General landing page",
  endpoint = site.forms?.general || "",
  heading = "Schedule your strategy call",
  sub = "Tell us a little about where you are. We will come back with clear, honest next steps.",
  testimonial = {
    quote: "Great attention to detail and strong understanding of client needs. Very supportive and professional.",
    name: "Elaine Cai",
  },
}) {
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    basedIn: "", investedBefore: "",
    budget: "", deposit: "", timeline: "", goal: "",
  });
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source }),
        });
        if (!res.ok) throw new Error("bad response");
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink outline-none transition focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/30";
  const label = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <section id="book" className="hero-grad relative overflow-hidden text-paper">
      <div className="relative mx-auto grid max-w-container items-stretch gap-10 px-6 py-20 md:py-28 lg:grid-cols-2">
        <div className="reveal flex flex-col">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange2">Get in touch</span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold">{heading}</h2>
          <p className="mt-5 max-w-md text-paper/80">{sub}</p>

          <ul className="mt-8 space-y-4">
            {TRUST.map((t, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white/10 text-orange2">
                  <Check className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="text-paper/90">{t}</span>
              </li>
            ))}
          </ul>

          <figure className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex gap-1 text-gold">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="mt-3 font-display text-lg leading-snug text-paper">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-orange font-bold text-white">
                {testimonial.name ? testimonial.name.charAt(0) : "C"}
              </span>
              <span className="font-semibold text-paper">{testimonial.name}</span>
            </figcaption>
          </figure>
        </div>

        <div className="reveal d1 rounded-[2rem] border border-line bg-white p-6 text-ink shadow-2xl md:p-8">
          {status === "success" ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg" style={{ background: "linear-gradient(135deg,var(--orange),var(--copper-dark))" }}>
                <Check className="h-8 w-8" strokeWidth={2.4} />
              </span>
              <h3 className="font-display text-3xl font-bold text-ink">Thank you</h3>
              <p className="mt-3 max-w-xs text-muted">We have your details and will be in touch shortly to arrange your call.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={label}>Full name</label>
                <input className={input} value={form.fullName} onChange={set("fullName")} placeholder="Your name" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>Phone <span className="text-orange">*</span></label>
                  <input type="tel" required className={input} value={form.phone} onChange={set("phone")} placeholder="Phone number" />
                </div>
                <div>
                  <label className={label}>Email <span className="text-orange">*</span></label>
                  <input type="email" required className={input} value={form.email} onChange={set("email")} placeholder="Email address" />
                </div>
              </div>

              <div>
                <span className={label}>Are you currently based in</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                  {["Australia", "Overseas (planning to invest in AU)"].map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2">
                      <input type="radio" name="basedIn" value={o} checked={form.basedIn === o} onChange={set("basedIn")} className="h-4 w-4 accent-orange" />
                      <span className="text-sm">{o}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className={label}>Have you invested in property before</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                  {["Yes", "No (first-time investor)"].map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2">
                      <input type="radio" name="investedBefore" value={o} checked={form.investedBefore === o} onChange={set("investedBefore")} className="h-4 w-4 accent-orange" />
                      <span className="text-sm">{o}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-line" />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>Approximate budget</label>
                  <select className={input} value={form.budget} onChange={set("budget")}>
                    <option value="">Select an option</option>
                    {BUDGETS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>Deposit ready</label>
                  <select className={input} value={form.deposit} onChange={set("deposit")}>
                    <option value="">Select an option</option>
                    {DEPOSIT.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>When are you looking to invest</label>
                  <select className={input} value={form.timeline} onChange={set("timeline")}>
                    <option value="">Select an option</option>
                    {TIMELINE.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label}>Your primary goal</label>
                  <select className={input} value={form.goal} onChange={set("goal")}>
                    <option value="">Select an option</option>
                    {GOALS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {status === "error" && (
                <p className="text-sm font-semibold text-copper-dark">Something went wrong. Please try again, or contact us directly.</p>
              )}

              <button type="submit" disabled={status === "submitting"} className="btn-grad w-full rounded-full px-8 py-4 font-bold text-white disabled:opacity-70">
                {status === "submitting" ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}