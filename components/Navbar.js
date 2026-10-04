"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper text-ink shadow-sm">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span
            className="grid h-8 w-8 place-items-center rounded-full text-sm text-paper"
            style={{ background: "linear-gradient(135deg,var(--copper),var(--copper-dark))" }}
          >
            ☀
          </span>
          <span className="text-navy">{site.brandName}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-ink/70 transition-colors hover:text-copper">
              {item.label}
            </a>
          ))}
          <Link href={site.seminar.href} className="flex items-center gap-2 font-semibold text-copper transition hover:opacity-80">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            {site.seminar.label}
          </Link>
          <a href={site.bookingUrl} className="rounded-full bg-copper px-5 py-2.5 font-semibold text-paper shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            {site.ctaLabel}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="text-2xl text-navy">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-6 pb-5 pt-2 text-sm md:hidden">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-ink/90">
              {item.label}
            </a>
          ))}
          <Link href={site.seminar.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 font-semibold text-copper">
            {site.seminar.label}
          </Link>
          <a href={site.bookingUrl} onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-copper px-5 py-3 text-center font-semibold text-paper shadow-sm">
            {site.ctaLabel}
          </a>
        </nav>
      )}
    </header>
  );
} 