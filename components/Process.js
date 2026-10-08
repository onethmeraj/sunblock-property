import { site } from "@/lib/site";

export default function Process() {
  // Safe fallback in case site.process is not defined yet
  const { heading, sub, steps } = site.process || {
    heading: "Simple, clear, and built to move you forward",
    sub: "Four steps. No jargon. You always know what comes next.",
    steps: [
      { id: "01", title: "Understand", desc: "We take time to understand your financial position." },
      { id: "02", title: "Plan", desc: "We create a strategy that fits your goals and comfort level." },
      { id: "03", title: "Search", desc: "We find properties that match your strategy." },
      { id: "04", title: "Secure", desc: "We negotiate and secure the best deal for you." }
    ]
  };

  return (
    <section id="process" className="bg-paper py-24">
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          
          <div className="reveal sticky top-32 h-fit">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">How it works</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-navy">
              {heading}
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">
              {sub}
            </p>
            {/* The "Book a call" button has been successfully removed from here */}
          </div>

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`reveal d${(i % 3) + 1} flex flex-col justify-center rounded-[2rem] bg-white p-10 shadow-sm border border-line`}
              >
                <div className="mb-4 text-5xl font-display font-bold text-orange/10">
                  {step.id || `0${i + 1}`}
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-navy">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}