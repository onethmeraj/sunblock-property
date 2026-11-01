"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { site } from "@/lib/site";

export default function VideoSection() {
  const v = site.video || {};
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    // fire a pixel event when someone actually watches the VSL
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "Played_VSL");
    }
    setTimeout(() => videoRef.current?.play(), 0);
  };

  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="mx-auto max-w-container px-6 text-center">
        {v.heading && (
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold text-navy">
            {v.heading}
          </h2>
        )}
        {v.sub && <p className="mt-3 text-base md:text-lg text-muted">{v.sub}</p>}

        <div className="relative mt-8 mx-auto max-w-3xl aspect-video overflow-hidden rounded-2xl shadow-xl bg-black">
          <video
            ref={videoRef}
            src={v.embedUrl}
            poster={v.poster || undefined}
            controls={playing}
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />

          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-orange text-white shadow-lg transition-transform hover:scale-110">
                <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}