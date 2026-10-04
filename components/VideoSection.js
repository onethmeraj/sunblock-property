import { Play } from "lucide-react";
import { site } from "@/lib/site";

export default function VideoSection() {
  const { heading, sub, embedUrl, poster } = site.video;
  return (
    <section className="bg-panel">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold">{heading}</h2>
          <p className="mt-4 text-muted">{sub}</p>
        </div>
        <div className="reveal mx-auto mt-12 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-navy shadow-xl">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={heading}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <>
                {poster && <img src={poster.startsWith("http") ? poster : `/${poster}`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="btn-grad grid h-20 w-20 place-items-center rounded-full text-white">
                    <Play className="ml-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-paper/60">Video coming soon</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
