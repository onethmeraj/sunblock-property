import { site } from "@/lib/site";

export default function FinalCta() {
  return (
    <section id="book" className="bg-paper px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-container relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-20 text-center text-paper shadow-2xl">
        
        {/* Subtle Amber glow behind the text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,138,61,0.15),transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-extrabold leading-tight lg:text-5xl">
            {site.finalCta.heading}
          </h2>
          <p className="mt-6 text-lg text-paper/80">
            {site.finalCta.sub}
          </p>
          <a href={site.bookingUrl} className="mt-10 inline-block rounded-full bg-copper px-10 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-copper-dark hover:shadow-xl">
            {site.ctaLabel}
          </a>
        </div>
        
      </div>
    </section>
  );
}