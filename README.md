# Sunblock Property — Landing Page

A fast, mobile first, single page landing site built with Next.js and Tailwind CSS.
Built to do one job: get the right visitor to book a call with Kaushi.

---

## 1. Run it on your computer

You need Node.js installed (version 18 or newer). Get it from https://nodejs.org if you do not have it.

Open a terminal in this folder and run these three commands, one at a time:

```bash
npm install        # downloads the pieces the site needs (do this once)
npm run dev         # starts the site locally
```

Then open your browser to **http://localhost:3000**

While `npm run dev` is running, any change you save shows up instantly in the browser.
Press `Ctrl + C` in the terminal to stop it.

To see the final optimised version the way it runs live:

```bash
npm run build       # builds the production version
npm run start       # serves that version at http://localhost:3000
```

---

## 2. Where to edit things

You almost never need to touch the code. Nearly everything lives in one file:

### `lib/site.js`  ← edit this
All the words, the links, the FAQ, contact details, and the button destination.
Change text here and it updates everywhere on the page.

A few things to set before it goes live:
- **Stats** (`stats`): empty by default so nothing fake shows. Add Kaushi's real numbers.
- **Client stories** (`stories`): replace the placeholder quotes with real testimonials (with permission).
- **Contact** (`contact`): add phone, email or WhatsApp to show them in the footer. Leave blank to hide.
- **Legal line** (`footer.legalLine`): set Kaushi's real ABN and any required disclosure.

### `app/globals.css`  ← the colours
The colour palette is at the very top. Two concepts are included:
- **Active:** Ink Navy / Aged Copper / Antique Gold
- **Alternate:** Warm Amber / Deep Emerald / Warm Ivory (commented out)

To switch, comment out the active block and uncomment the alternate. Nothing else changes.

---

## 3. How the project is put together

```
sunblock-property/
├── app/
│   ├── layout.jsx      Page shell, fonts, SEO title and description
│   ├── page.jsx        Stacks the sections in order
│   └── globals.css     Colours, fonts, base styles  ← palette lives here
├── components/         One file per section of the page
│   ├── Navbar.jsx        Sticky header + mobile menu
│   ├── Hero.jsx          Top headline and main button
│   ├── About.jsx         Who you help + checklist
│   ├── Stats.jsx         Numbers band (hidden until filled in)
│   ├── Services.jsx      The three services
│   ├── Process.jsx       Four step process
│   ├── Stories.jsx       Client testimonials
│   ├── Faq.jsx           Tap to open questions
│   ├── FinalCta.jsx      Closing "book a call" band
│   └── Footer.jsx        Links, contact, legal
├── lib/
│   └── site.js         ALL your content  ← edit this
├── package.json        The project's settings and dependencies
├── tailwind.config.js  Styling setup (rarely touched)
└── next.config.mjs     Next.js setup (rarely touched)
```

The idea: **content** sits in `lib/site.js`, **colours** sit in `app/globals.css`, and the
**components** just arrange that content. You can run the whole site knowing only those two files.

---

## 4. Put it online

Easiest option is Vercel (made by the same team as Next.js, free tier is fine):

1. Create a free account at https://vercel.com
2. Click **Add New Project** and upload this folder (or connect a GitHub repo).
3. Vercel detects Next.js automatically. Click **Deploy**.
4. You get a live link in about a minute. Point Kaushi's domain at it when ready.

Netlify works the same way if you prefer it.

---

## Notes
- Fonts (Cormorant Garamond and Hanken Grotesk) load from Google Fonts, so keep an internet
  connection when viewing. They are referenced in `app/layout.jsx`.
- Every button on the page points to the booking link set in `lib/site.js` (`bookingUrl`).
- The site is responsive down to small phones and respects reduced motion settings.
