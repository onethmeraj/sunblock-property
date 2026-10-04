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
        
        {/* The new form handles its own background and headings now */}
        <ContactForm 
          source="General landing page" 
          endpoint={site.forms.general} 
        />
      </main>
      <Footer />
    </>
  );
}