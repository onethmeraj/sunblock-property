import { Calendar, Clock, MapPin, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata = {
  title: "Upcoming Seminar | Sunblock Property",
  description: "Register for the Sunblock Property investment seminar.",
};

export default function SeminarPage() {
  const s = site.seminarPage;

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <section className="hero-grad relative overflow-hidden text-paper">
          <div className="relative mx-auto max-w-container px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <span className="reveal text-xs font-bold uppercase tracking-[0.18em] text-orange2">{s.eyebrow}</span>
              <h1 className="reveal d1 mt-4 text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[1.05]">
                {s.name}
              </h1>
              <p className="reveal d2 mt-6 max-w-xl text-lg text-paper/80">{s.tagline}</p>

              <div className="reveal d2 mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Calendar, label: s.date },
                  { icon: Clock, label: s.time },
                  { icon: MapPin, label: s.venue.name },
                ].map(({ icon: I, label }, i) => (
                  <span key={i} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                    <I className="h-4 w-4 text-orange2" /> {label}
                  </span>
                ))}
              </div>

              <div className="reveal d3 mt-9">
                <a href="#book" className="btn-grad inline-block rounded-full px-8 py-4 font-bold text-white">Register your spot</a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-container px-6 py-20 md:py-28">
            <div className="reveal max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">What you will learn</span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold">The agenda</h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {s.agenda.map((item, i) => (
                <div key={i} className="reveal flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-orange/15 text-orange">
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                  </span>
                  <span className="pt-1 text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-panel">
          <div className="mx-auto max-w-container px-6 py-20 md:py-28">
            <div className="reveal max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Your hosts</span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold">Meet the speakers</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {s.speakers.map((sp, i) => {
                const src = sp.image ? (sp.image.startsWith("http") ? sp.image : `/${sp.image}`) : null;
                return (
                  <div key={i} className="reveal card-hover flex gap-6 rounded-3xl border border-line bg-white p-6">
                    <div className="photo h-28 w-28 flex-none rounded-2xl">
                      {src ? (
                        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <span className="tag">Photo</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink">{sp.name}</h3>
                      <p className="text-sm font-semibold text-orange">{sp.role}</p>
                      <p className="mt-3 text-sm text-muted">{sp.bio}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy text-paper">
          <div className="absolute inset-0" style={{ background: "radial-gradient(700px 320px at 80% 0%, rgba(242,130,60,.28), transparent 60%)" }} />
          <div className="relative mx-auto max-w-container px-6 py-20 md:py-24">
            <div className="reveal mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange2">For attendees</span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold">Exclusive seminar rewards</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {s.offers.map((o, i) => (
                <div key={i} className="reveal rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg" style={{ background: "linear-gradient(135deg,var(--orange),var(--copper-dark))" }}>
                    <Icon name={o.icon} className="h-7 w-7" strokeWidth={1.9} />
                  </span>
                  <div className="mt-6 grad-text text-5xl font-extrabold">{o.amount}</div>
                  <h3 className="mt-2 text-2xl font-bold">{o.title}</h3>
                  <p className="mt-3 text-paper/75">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactForm
          source="Seminar landing page"
          endpoint={site.forms?.seminar}
          heading="Register for the seminar"
          sub="Reserve your spot below. Add your details and we will send you the date, venue, and joining information."
        />
      </main>
      <Footer />
    </>
  );
}