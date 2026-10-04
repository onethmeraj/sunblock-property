import { site } from "@/lib/site";

export default function Hero() {
  const img = site.hero.image;
  const src = img ? (img.startsWith("http") ? img : `/${img}`) : null;

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-12 pb-20 lg:pt-20 lg:pb-32">
      <div className="mx-auto max-w-container px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          
          <div className="reveal d1 relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-copper"></span>
              Your trusted partner in Australian property
            </div>
            
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
              Build wealth through <span className="text-navy">property</span> in Australia
            </h1>
            
            <p className="mt-6 max-w-lg text-lg text-muted leading-relaxed">
              {site.hero.sub}
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href={site.bookingUrl} className="inline-block rounded-full bg-copper px-8 py-4 font-bold text-paper shadow-lg shadow-copper/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-copper-dark">
                {site.hero.ctaLabel}
              </a>
              <a href="#process" className="inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-copper">
                See how it works <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="reveal d2 relative w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-navy shadow-2xl">
              {src ? (
                <img src={src} alt="Property" className="absolute inset-0 h-full w-full object-cover opacity-90" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-paper/50">
                  Add image in site.js
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}