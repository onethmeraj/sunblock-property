import Icon from "@/components/Icon";
import { site } from "@/lib/site";

export default function Services() {
  const { heading, sub, items } = site.services;

  return (
    <section id="services" className="bg-paper py-24 text-ink">
      <div className="mx-auto max-w-container px-6">
        
        <div className="mb-16 max-w-2xl reveal">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">What we help with</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy lg:text-5xl">{heading}</h2>
          <p className="mt-5 text-lg text-muted">{sub}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`reveal d${i + 1} card-hover flex flex-col rounded-3xl bg-white p-8 shadow-sm border border-line`}
            >
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-peach text-orange">
                <Icon name={item.icon} className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold text-navy">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}