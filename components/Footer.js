import { site } from "@/lib/site";

export default function Footer() {
  const { phone, email, whatsapp } = site.contact;
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/10 bg-navy text-paper">
      <div className="mx-auto max-w-container px-6 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          
          <div className="max-w-sm">
           <div className="flex items-center">
  {/* Change 'logo.png' if your file has a different name. Use a white/light version here if your footer is dark. */}
  <img src="/logo.png" alt={site.brandName} className="h-10 w-auto object-contain" />
</div>
            <p className="mt-4 text-sm text-paper opacity-70 leading-relaxed">
              {site.footer.blurb}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-paper opacity-50">Explore</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={site.seminar.href} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                    {site.seminar.label}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-paper opacity-50">Get in touch</h4>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={site.bookingUrl} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                    {site.ctaLabel}
                  </a>
                </li>
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                      {email}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li>
                    <a href={whatsapp} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                      WhatsApp
                    </a>
                  </li>
                )}
                {site.footer.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-paper opacity-80 transition-colors hover:text-copper hover:opacity-100">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-paper opacity-50 sm:flex sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">{site.footer.legalLine}</p>
          <p className="mt-4 shrink-0 sm:mt-0">© {year} {site.brandName}. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}
