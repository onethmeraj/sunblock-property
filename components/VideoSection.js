import { site } from "@/lib/site";

export default function VideoSection() {
  const { heading, sub, embedUrl } = site.video;

  // This ensures that even if you just write "vsl.mp4" in site.js, 
  // Next.js knows to look for "/vsl.mp4" in the public folder.
  const formattedUrl = embedUrl
    ? embedUrl.startsWith("http") || embedUrl.startsWith("/")
      ? embedUrl
      : `/${embedUrl}`
    : null;

  // Check if it's a direct file rather than a YouTube/Vimeo link
  const isDirectVideo = formattedUrl && (formattedUrl.endsWith('.mp4') || formattedUrl.endsWith('.webm'));

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
                /* Native HTML5 Video Player for .mp4 files (Allows Sound & Full Controls) */
                <video
                  controls
                  playsInline
                  className="absolute inset-0 h-full w-full bg-black outline-none"
                >
                  <source src={formattedUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                /* Standard iframe for YouTube/Vimeo embeds */
                <iframe
                  src={formattedUrl}
                  title="Property Investment Video"
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