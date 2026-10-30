import { site } from "@/lib/site";

// Turns "file.mp4" into "/file.mp4" so Next.js finds it in /public.
function toPublicUrl(path) {
  if (!path) return null;
  return path.startsWith("http") || path.startsWith("/") ? path : `/${path}`;
}

export default function VideoSection() {
  const { heading, sub, embedUrl, poster } = site.video;

  const formattedUrl = toPublicUrl(embedUrl);
  const posterUrl = toPublicUrl(poster);

  // Direct file (mp4/webm) vs YouTube/Vimeo embed
  const isDirectVideo = formattedUrl && (formattedUrl.endsWith(".mp4") || formattedUrl.endsWith(".webm"));

  return (
    <section className="relative bg-panel border-t border-line pt-10 pb-14 lg:pt-14 lg:pb-16">
      <div className="mx-auto max-w-container px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-navy leading-[1.1] tracking-tight">
            {heading}
          </h2>
          <p className="mt-6 text-muted text-lg">
            {sub}
          </p>
        </div>

        <div className="reveal d1 mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] bg-panel shadow-2xl ring-1 ring-black/5">
          <div className="relative aspect-video w-full bg-navy/5 flex items-center justify-center">
            {formattedUrl ? (
              isDirectVideo ? (
                /* preload="none": the video only downloads when someone presses play */
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={posterUrl || undefined}
                  className="absolute inset-0 h-full w-full bg-black outline-none"
                >
                  <source src={formattedUrl} type={formattedUrl.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={formattedUrl}
                  title="Property Investment Video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 outline-none"
                ></iframe>
              )
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-navy/40 font-medium">
                Add your video embed URL in site.js
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}