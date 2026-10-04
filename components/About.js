import Icon from "@/components/Icon";
import { site } from "@/lib/site";

const CHIP = ["bg-peach text-copper", "bg-sky text-navy", "bg-mint text-navy", "bg-peach text-orange"];

export default function About() {
  const { heading, body, image, points } = site.about;
  const src = image ? (image.startsWith("http") ? image : `/${image}`) : null;

  return (
    <section id="about" className="bg-paper">
      <div className="mx-auto grid max-w-container items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="reveal order-last md:order-first">
          <div className="photo aspect-[5/6] w-full rounded-[28px] shadow-xl ring-1 ring-black/5">
            {src ? (
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <span className="tag">Add a client / property photo</span>
            )}
          </div>
        </div>
        <div className="reveal d1">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Why Sunblock</span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold">{heading}</h2>
          <p className="mt-5 text-muted">{body}</p>
          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <li key={i} className="card-hover flex items-center gap-4 rounded-xl border border-line bg-white p-3">
                <span className={`grid h-10 w-10 flex-none place-items-center rounded-full ${CHIP[i % CHIP.length]}`}>
                  <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span className="font-semibold">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
