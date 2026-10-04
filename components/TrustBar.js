import { site } from "@/lib/site";

export default function TrustBar() {
  const { heading, logos } = site.trustBar;
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-container px-6 py-9">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-muted">{heading}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {logos.length > 0
            ? logos.map((file, i) => (
                <img key={i} src={`/logos/${file}`} alt="" className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
              ))
            : [0, 1, 2, 3, 4].map((i) => <div key={i} className="h-8 w-24 rounded bg-line" />)}
        </div>
      </div>
    </section>
  );
}
