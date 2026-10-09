import { Star } from "lucide-react";
import { site } from "@/lib/site";

export default function Hero() {
  const img = site.hero.image;
  const src = img ? (img.startsWith("http") ? img : `/${img}`) : null;

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-8 pb-8 lg:pt-14 lg:pb-10">
      <div className="mx-auto max-w-container px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          
          <div className="reveal d1 relative z-10">
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-copper"></span>
              {site.hero.eyebrow}
            </div>
            
            {/* Pure Black Professional Headline */}
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              Invest in Australian property with absolute confidence
            </h1>
            
            <p className="mt-5 max-w-lg text-lg text-muted leading-relaxed">
              {site.hero.sub}
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a 
                href={site.bookingUrl} 
                className="inline-block rounded-full bg-copper px-8 py-4 font-bold text-paper shadow-lg shadow-copper/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-copper-dark"
              >
                {site.hero.ctaLabel}
              </a>
              <a 
                href="#process" 
                className="inline-flex items-center gap-2 font-semibold text-navy transition-colors hover:text-copper"
              >
                See how it works <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="reveal d2 relative w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-navy shadow-2xl">
              {src ? (
                <img src={src} alt="Property Investment" className="absolute inset-0 h-full w-full object-cover opacity-90" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-paper/50">
                  Add image in site.js
                </div>
              )}
            </div>

            {site.hero.badge && (
              <div className="absolute -left-4 bottom-8 sm:-left-12 sm:bottom-12 z-20 flex items-center gap-4 rounded-2xl bg-[#11241a] p-4 pr-6 shadow-2xl border border-white/10">
                <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[15px] font-bold text-white">
                    <Star className="h-4 w-4 fill-orange text-orange" />
                    {site.hero.badge.rating}
                  </div>
                  <div className="text-[13px] text-gray-300">
                    {site.hero.badge.text}
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}