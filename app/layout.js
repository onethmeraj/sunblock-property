import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// 1. Map to the body text variable
const sansFont = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], 
  variable: '--font-sans',
  display: 'swap',
});

// 2. Map the EXACT SAME font to the heading variable to completely overwrite the old serif
const displayFont = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], 
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: 'Sunblock Property | Build Wealth in Australia',
  description: 'Your trusted partner in Australian property investment.',
};

export default function RootLayout({ children }) {
  return (
    // 3. Inject both variables at the HTML root so Tailwind catches them globally
    <html lang="en" className={`${sansFont.variable} ${displayFont.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        {children}

        {/* Meta Pixel Base Code (Next.js format) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1425738326388331');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}