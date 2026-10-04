"use client";

import { useEffect, useState, useRef } from "react";
import { site } from "@/lib/site";

// This small helper function handles the math for the smooth counting animation
function useCountUp(endString, inView) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !endString) return;
    
    // Extract just the numbers from the string (e.g., "500+" becomes 500)
    const numericPart = parseInt(endString.replace(/\D/g, ""), 10);
    if (isNaN(numericPart)) {
      setCount(endString);
      return;
    }

    let start = 0;
    const duration = 2000; // Animation takes exactly 2 seconds
    const increment = numericPart / (duration / 16); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endString, inView]);

  // Reattach any plus signs (e.g., puts the "+" back on "500+")
  if (typeof count === "number" && endString) {
    return endString.replace(/[0-9]+/, count);
  }
  return endString || "";
}

export default function Stats() {
  const { stats } = site;
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // This watches the screen. When this section scrolls into view, it triggers the animation.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hasData = stats.some(stat => stat.value);
  if (!hasData) return null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy py-24 px-6 border-b border-white/5">
      
      {/* Premium Touch: A subtle warm amber glow at the top of the section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,138,61,0.08),transparent_50%)]" />
      
      <div className="relative z-10 mx-auto max-w-container">
        <h2 className="text-center font-display text-3xl font-bold text-paper mb-16 md:mb-24">
          A more supported way to invest
        </h2>

        <div className="flex flex-col items-center justify-center gap-16 md:flex-row md:gap-32 text-center">
          {stats.map((stat, i) => {
            const animatedValue = useCountUp(stat.value, inView);
            
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="font-display text-6xl md:text-7xl font-extrabold text-copper mb-4 tracking-tight drop-shadow-lg">
                  {stat.value ? animatedValue : "-"}
                </div>
                
                {/* Bug fixed here: Replaced text-paper/60 with solid text-paper + opacity class */}
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-paper opacity-80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}