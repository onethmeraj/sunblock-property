import { site } from "@/lib/site";

export default function Process() {
  const { heading, sub, steps } = site.process || {
    heading: "Simple, clear, and built to move you forward",
    sub: "We take the complexity out of buying property by managing the entire journey for you.",
    steps: [
      { id: "01", title: "Understand", desc: "We take time to understand your financial position." },
      { id: "02", title: "Plan", desc: "We create a strategy that fits your goals and comfort level." },
      { id: "03", title: "Buy", desc: "We find properties that match your strategy." },
      { id: "04", title: "Secure", desc: "We negotiate and secure the best deal for you." }
    ]
  };

  return (
    <section id="process" className="bg-panel border-y border-line py-10 lg:py-16">
      <div className="mx-auto max-w-container px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          
          {/* Sticky only on lg screens; static on mobile to prevent overlapping */}
          <div className="reveal relative lg:sticky lg:top-28 lg:h-fit">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              How it works
            </span>
            <h2 className="mt-2.5 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-extrabold leading-[1.18] tracking-tight text-ink">
              {heading}
            </h2>
            <p className="mt-3.5 max-w-lg text-base text-muted leading-relaxed lg:text-lg">
              {sub}
            </p>
          </div>

          {/* Cards container with responsive padding and spacing */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`reveal d${(i % 3) + 1} flex flex-col justify-center rounded-2xl bg-white p-6 shadow-sm border border-line sm:rounded-[1.75rem] sm:p-8`}
              >
                <div className="mb-2 text-3xl font-display font-black tracking-tight text-ink/85 sm:text-4xl">
                  {step.id || `0${i + 1}`}
                </div>
                <h3 className="mb-1.5 font-display text-lg font-bold text-ink sm:text-xl">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed sm:text-base">
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