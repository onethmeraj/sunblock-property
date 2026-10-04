import "./globals.css";

export const metadata = {
  title: "Sunblock Property | Build Wealth Through Property in Australia",
  description:
    "Property investment guidance for migrants and expats buying in Australia. Clear advice and full support from plan to purchase.",
  openGraph: {
    title: "Sunblock Property | Build Wealth Through Property in Australia",
    description:
      "Property investment guidance for migrants and expats buying in Australia.",
    type: "website",
  },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
