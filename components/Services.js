import Icon from "@/components/Icon";
import { site } from "@/lib/site";

export default function Services() {
  const { heading, sub, items } = site.services;
  return (
    <section id="services" className="bg-navy px-6 py-24 text-paper">
      <div className="mx-auto max-w-container">
        
        <div className="mb-16 md:w-2/3">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">What we help with</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold lg:text-5xl">{heading}</h2>
          <p className="mt-6 text-lg text-paper/70">{sub}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="group rounded-3xl bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-xl">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-copper text-paper shadow-md">
                <Icon name={item.icon} className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-paper/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}