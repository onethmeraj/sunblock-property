"use client";
import { site } from "@/lib/site";

export default function Clients() {
  const { heading, sub, items } = site.clients;
  
  // Duplicate the items array multiple times to create a seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section id="clients" className="overflow-hidden bg-paper py-24">
      
      <div className="mx-auto max-w-container px-6 text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">What clients say</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-navy lg:text-5xl">{heading}</h2>
        <p className="mt-4 text-muted">{sub}</p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* The scrolling track. Pauses when the user hovers over it to read. */}
        <div className="flex w-max animate-marquee gap-6 pl-6 hover:[animation-play-state:paused]">
          {duplicatedItems.map((item, i) => {
            const src = item.image ? (item.image.startsWith("http") ? item.image : `/${item.image}`) : null;
            return (
              <figure key={i} className="flex w-[350px] shrink-0 flex-col rounded-3xl bg-white p-8 border border-line shadow-sm transition-shadow hover:shadow-md">
                <div className="text-gold">★★★★★</div>
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
        
        {/* Inject the CSS animation directly into the component */}
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