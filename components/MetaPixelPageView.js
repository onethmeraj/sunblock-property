"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/tracking";

// The pixel base code in app/layout.js fires the first PageView.
// This fires a PageView on every later page change (Next.js changes pages
// without a full reload), so Meta sees the real URL of each page.
export default function MetaPixelPageView() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    captureAttribution();
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.fbq) window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}