"use client";
import { site } from "@/lib/site";

export default function Clients() {
  const { heading, sub, items } = site.clients;
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section id="clients" className="overflow-hidden bg-paper py-24">
      
      <div className="mx-auto max-w-container px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">What clients say</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-navy lg:text-5xl">{heading}</h2>
        <p className="mt-4 text-muted">{sub}</p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex w-max animate-marquee gap-6 pl-6 hover:[animation-play-state:paused]">
          {duplicatedItems.map((item, i) => {
            const src = item.image ? (item.image.startsWith("http") ? item.image : `/${item.image}`) : null;
            // Defaults to 5 if you forget to add a rating to an item in site.js
            const rating = item.rating || 5; 

            return (
              <figure key={i} className="flex w-[350px] shrink-0 flex-col rounded-3xl bg-white p-8 border border-line shadow-sm transition-shadow hover:shadow-md">
                
                {/* SVG Star Rating (Bulletproof Half-Stars) */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    const isFull = starIndex <= Math.floor(rating);
                    const isHalf = !isFull && starIndex === Math.ceil(rating) && rating % 1 !== 0;

                    return (
                      <div key={starIndex} className="relative h-5 w-5">
                        {/* 1. The Empty Gray Background Star */}
                        <svg className="absolute inset-0 h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        
                        {/* 2. The Gold Overlay Star (Sliced to 50% width if isHalf is true) */}
                        {(isFull || isHalf) && (
                          <div className={`absolute inset-0 overflow-hidden ${isHalf ? 'w-[50%]' : 'w-full'}`}>
                            <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <blockquote className="mt-6 flex-1 font-display text-xl leading-snug text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {src ? (
                    <img src={src} alt="" className="h-12 w-12 rounded-full object-cover shadow-sm" />
                  ) : (
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-copper font-bold text-paper shadow-sm">
                      {item.name ? item.name.charAt(0) : "C"}
                    </span>
                  )}
                  <span>
                    <span className="block font-bold text-ink">{item.name}</span>
                    <span className="block text-sm text-muted">{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}} />
      </div>
    </section>
  );
} 