"use client";

import { useState, useEffect, useRef } from "react";
import { site } from "@/lib/site";

// Helper component to animate numbers on scroll
function AnimatedCounter({ text }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const numMatch = text.match(/\d+/);
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = text.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section enters the screen, start the animation
        if (entry.isIntersecting) {
          setCount(0);
          let start = 0;
          const duration = 2000; 
          const increment = targetNumber / (duration / 16); 

          if (timerRef.current) clearInterval(timerRef.current);
          
          timerRef.current = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
              clearInterval(timerRef.current);
              setCount(targetNumber);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        } else {
          // When the section leaves the screen, reset everything
          if (timerRef.current) clearInterval(timerRef.current);
          setCount(0);
        }
      },
      { threshold: 0.5 } 
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [targetNumber]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const heading = site.stats?.heading || "A more supported way to invest";
  const items = site.stats?.items || [];

  return (
    <section className="bg-navy py-16 text-paper">
      <div className="mx-auto max-w-container px-6 text-center">
        <h2 className="mb-12 font-display text-2xl font-semibold text-paper/90 sm:text-3xl">
          {heading}
        </h2>
        
        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 divide-y divide-white/10 sm:divide-y-0 sm:divide-x">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center pt-8 sm:pt-0">
                <div className="font-display text-5xl font-bold text-orange sm:text-6xl">
                  <AnimatedCounter text={item.value || "0"} />
                </div>
                <div className="mt-3 text-sm font-bold uppercase tracking-widest text-paper/70">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}