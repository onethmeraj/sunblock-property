import { site } from "@/lib/site";

export default function Process() {
  const { heading, steps } = site.process;
  
  return (
    <section id="process" className="bg-paper px-6 py-24">
      <div className="mx-auto max-w-container gap-16 lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        
        {/* Left Column: Sticky Header & CTA */}
        <div className="mb-16 lg:sticky lg:top-32 lg:mb-0 lg:h-fit">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper">
            How it works
          </span>
          
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink lg:text-5xl">
            {heading}
          </h2>
          
          <p className="mt-6 text-lg text-muted">
            Four steps. No jargon. You always know what comes next.
          </p>
          
          <a 
            href={site.bookingUrl} 
            className="mt-10 inline-block rounded-full bg-copper px-8 py-4 font-bold text-paper shadow-lg shadow-copper/20 transition-all hover:-translate-y-1 hover:bg-copper-dark hover:shadow-xl"
          >
            {site.ctaLabel}
          </a>
        </div>
        
        {/* Right Column: Interactive Process Cards */}
        <div className="space-y-6 md:space-y-8">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-10"
            >
              {/* Premium Touch: Large, subtle watermark number that moves on hover */}
              <div 
                className="absolute -right-4 -top-6 select-none font-display text-[8rem] font-extrabold text-paper transition-transform duration-500 group-hover:-translate-x-6 group-hover:text-panel"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              
              <div className="relative z-10">
                {/* Crisp, high-contrast step indicator */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-panel text-lg font-bold text-copper">
                  {String(i + 1).padStart(2, "0")}
                </div>
                
                <h3 className="text-2xl font-bold text-ink">
                  {step.title}
                </h3>
                
                <p className="mt-3 max-w-md leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}