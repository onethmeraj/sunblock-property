import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import VideoSection from "@/components/VideoSection";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Clients from "@/components/Clients";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <VideoSection />
        <About />
        <Stats />
        <Services />
        <Process />
        <Clients />
        <Faq />
        <FinalCta />
        
        {/* NEW ON-PAGE BOOKING SECTION */}
        <section id="book" className="bg-panel px-6 py-24 md:py-32">
          <div className="mx-auto max-w-container">
            <div className="mb-14 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Take the next step</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold text-navy lg:text-5xl">
                Schedule your strategy call
              </h2>
              <p className="mt-6 text-lg text-muted">
                Choose a time below that works for you.
              </p>
            </div>
            
            {/* Passes the general GHL form URL */}
            <ContactForm embedUrl={site.forms.general} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}