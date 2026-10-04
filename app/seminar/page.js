import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: 'Upcoming Seminar | Sunblock Property',
};

export default function SeminarPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-paper">
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-container">
            
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Exclusive Event</span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl lg:text-6xl">
                Upcoming Property Investment Seminar
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Register your interest below to secure your spot. Learn our exact data-driven strategies for navigating the Australian property market with absolute clarity.
              </p>
            </div>
            
            <div className="mt-16">
              {/* Passes the seminar-specific GHL form URL */}
              <ContactForm embedUrl={site.forms.seminar} />
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}