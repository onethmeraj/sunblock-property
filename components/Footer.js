import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const { phone, email, whatsapp } = site.contact;
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-line bg-paper text-ink pb-6">
      {/* Tightened vertical padding from py-12 down to pt-8 pb-4 lg:pt-10 */}
      <div className="mx-auto max-w-container px-6 pt-8 pb-4 lg:pt-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          
       <div className="max-w-sm">
<div className="flex items-center py-2">
  <Link href="/" className="inline-block">
    <img 
      src="/logo.png" 
      alt={site.brandName} 
      className="h-20 sm:h-24 md:h-28 w-auto min-w-[180px] sm:min-w-[220px] max-w-none object-contain scale-125 origin-left" 
    />
  </Link>
</div>
  <p className="mt-4 text-sm text-muted leading-relaxed">
    {site.footer.blurb}
  </p>
</div>
          
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-orange">Explore</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-ink/80 transition-colors hover:text-copper">
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={site.seminar.href} className="text-ink/80 transition-colors hover:text-copper">
                    {site.seminar.label}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-orange">Get in touch</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={site.bookingUrl} className="text-ink/80 transition-colors hover:text-copper">
                    {site.ctaLabel || "Book a call"}
                  </a>
                </li>

                {/* Direct routes to your legal and policy pages */}
                <li>
                 <Link href="/terms-and-conditions" className="text-ink/80 transition-colors hover:text-copper">
  Terms and conditions
</Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-ink/80 transition-colors hover:text-copper">
  Privacy policy
</Link>
                </li>

                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-ink/80 transition-colors hover:text-copper">
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="text-ink/80 transition-colors hover:text-copper">
                      {email}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink/80 transition-colors hover:text-copper">
                      WhatsApp
                    </a>
                  </li> 
                )}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright line with reduced top margin */}
        <div className="mt-8 border-t border-line pt-5 text-xs text-muted sm:flex sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">{site.footer.legalLine}</p>
          <p className="mt-3 shrink-0 sm:mt-0">© {year} {site.brandName}. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}