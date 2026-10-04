"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        
        <h2 className="reveal font-display text-[clamp(2rem,4vw,3rem)] font-bold text-navy">
          {site.faq.heading}
        </h2>
        
        <div className="reveal mt-10 divide-y divide-line border-y border-line">
          {site.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-bold text-ink transition-colors group-hover:text-copper"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg">{item.q}</span>
                  <span
                    aria-hidden
                    className={`grid h-8 w-8 flex-none place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-copper bg-copper text-paper"
                        : "border-line text-copper group-hover:border-copper group-hover:bg-copper/10"
                    }`}
                  >
                    +
                  </span>
                </button>
                
                {/* Smooth sliding accordion animation */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-8 text-muted leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}