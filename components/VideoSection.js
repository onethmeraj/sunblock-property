import { site } from "@/lib/site";

export default function VideoSection() {
  const { heading, sub, embedUrl } = site.video;

  return (
  // Inside components/VideoSection.js:
// Replace the outer <section> tag with:
<section className="relative bg-panel border-t border-line pt-10 pb-14 lg:pt-14 lg:pb-16">
      <div className="mx-auto max-w-container px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          
          {/* THE FIX: Added leading-[1.1] to pull the lines tightly together and tracking-tight for a polished look */}
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-navy leading-[1.1] tracking-tight">
            {heading}
          </h2>
          
          <p className="mt-6 text-muted text-lg">
            {sub}
          </p>
        </div>
        
        <div className="reveal d1 mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] bg-panel shadow-2xl ring-1 ring-black/5">
          <div className="relative aspect-video w-full bg-navy/5">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="Property Investment Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              ></iframe>
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