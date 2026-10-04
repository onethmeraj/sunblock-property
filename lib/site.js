// =============================================================
//  SUNBLOCK PROPERTY — ALL SITE CONTENT
//  Edit everything here. No coding needed elsewhere.
//  House style: short, plain sentences. No dashes in copy.
// =============================================================

export const site = {
  brandName: "Sunblock Property",

  // All CTAs scroll to the on-page form
  bookingUrl: "#book",
  ctaLabel: "Book a call",

  // Where the forms send leads. Paste your GHL webhook/embed URLs here.
  forms: {
    general: "",
    seminar: "",
  },

  // Footer contact. Leave blank to hide, fill in to show.
  contact: { phone: "", email: "", whatsapp: "" },

  nav: [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Clients", href: "/#clients" },
    { label: "FAQ", href: "/#faq" },
  ],

  seminar: { label: "Upcoming Seminar", href: "/seminar" },

  hero: {
    heading: "Build wealth through property in Australia",
    sub: "If you want to invest but do not want to get it wrong, we help you decide what to buy, where to buy, and what to do next.",
    ctaLabel: "Start your investment journey",
    image: "", // put a wide photo in /public and name it here, or paste an image URL
    badge: { rating: "5.0 / 5", text: "Trusted by 50+ clients" },
  },

  trustBar: {
    heading: "Recognised by trusted industry bodies",
    logos: [],
  },

  video: {
    heading: "A simple way to invest with more clarity",
    sub: "A short look at how we guide you from first question to final purchase.",
    embedUrl: "",
    poster: "",
  },

  about: {
    heading: "A clearer way to invest",
    body: "Buying an investment property is hard when you are not sure where to start, what to buy, or who to trust. We work with migrants and expats through the full buying journey, from the first plan to the final purchase. Instead of figuring it out alone, you get guidance at every step.",
    image: "",
    points: [
      { text: "What may suit your goals", icon: "Target" },
      { text: "Which areas to focus on", icon: "MapPin" },
      { text: "What to avoid", icon: "ShieldAlert" },
      { text: "How to move forward with confidence", icon: "TrendingUp" },
    ],
  },

  statsIntro: "A more supported way to invest",
  stats: [
    { value: "50+", label: "Client reviews" },
    { value: "12+", label: "Years experience" },
    { value: "500+", label: "Clients supported" },
  ],

  services: {
    heading: "What we help with",
    sub: "We help investors move from uncertainty to action with support at each stage.",
    items: [
      { title: "Clear strategy", body: "We start by understanding your situation and build a long term plan around your goals.", icon: "Compass" },
      { title: "Buyer advocacy", body: "We search, assess, and negotiate the right property on your behalf.", icon: "Handshake" },
      { title: "Lending coordination", body: "We work alongside your broker, or connect you with the right one.", icon: "Landmark" },
    ],
  },

  process: {
    heading: "Simple, clear, and built to move you forward",
    steps: [
      { title: "Understand", body: "We take time to understand your financial position." },
      { title: "Plan", body: "We create a strategy that fits your goals and comfort level." },
      { title: "Buy", body: "We help you buy the right property, not just any property." },
      { title: "Support", body: "We coordinate lending and guide your next steps." },
    ],
  },

  clients: {
    heading: "Real feedback from real clients",
    sub: "Short stories from people who wanted to invest with more clarity and support.",
    items: [
      { quote: "Add a real client testimonial here.", name: "Client name", detail: "Suburb, state", image: "" },
      { quote: "Add a real client testimonial here.", name: "Client name", detail: "Suburb, state", image: "" },
      { quote: "Add a real client testimonial here.", name: "Client name", detail: "Suburb, state", image: "" },
    ],
  },

  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "Should I buy in my personal name or a trust?", a: "It depends on your income, tax position, borrowing power, and long term goals. There is no single right answer. The wrong structure can limit borrowing and create tax problems, so we plan this early." },
      { q: "Can I use equity from my current home to invest?", a: "Yes. Most clients do. We structure it so your investment loan stays separate and remains tax deductible." },
      { q: "How many investment properties can I realistically afford?", a: "It depends on your income, expenses, and current debt. With the right structure, most clients can build a portfolio of two to five properties." },
      { q: "Should I pay off my home first or start investing?", a: "It is not one or the other. A good strategy balances paying down debt with growing assets. Waiting often costs more in missed opportunities." },
      { q: "How much deposit do I need?", a: "Usually ten to twenty percent. Many clients use equity instead of cash to keep out of pocket costs low." },
      { q: "Will this affect my future borrowing power?", a: "Yes. Poor structuring can reduce how much you can borrow next time. That is why we plan multiple purchases up front." },
      { q: "What type of property should I invest in?", a: "We favour properties with strong land value and scarcity. That usually means houses or well chosen townhouses over high density apartments." },
      { q: "How do you choose the right suburb?", a: "We focus on fundamentals like population growth, infrastructure, jobs, and limited supply. Not hype." },
      { q: "What exactly do you do as a buyer agent?", a: "We handle the full process. Strategy, suburb selection, sourcing, due diligence, negotiation, and purchase." },
      { q: "How long does it take to buy?", a: "Usually four to eight weeks from strategy to purchase, depending on the market and how clear your brief is." },
    ],
  },

  finalCta: {
    heading: "Book a call and get clarity on your next move",
    sub: "A short, no pressure conversation about where you are and what could come next.",
  },

  seminarPage: {
    eyebrow: "Upcoming Seminar",
    name: "Property Investment Seminar",            // replace with the final seminar name
    tagline: "Learn how to invest in Australian property with clarity and confidence.",
    date: "Date to be confirmed",                   // e.g. "Saturday, 15 November 2026"
    time: "Time to be confirmed",                   // e.g. "2:00 PM – 4:30 PM"
    venue: { name: "Venue to be confirmed", address: "Full address to be confirmed" },
    agenda: [
      "How to build a property strategy that fits your goals",
      "Choosing the right suburbs using real data, not hype",
      "How lending and borrowing power really work",
      "Common mistakes first-time investors make",
      "A clear, step by step path to your first or next property",
      "Live question and answer with the team",
    ],
    speakers: [
      { name: "Tarindu", role: "Property Investment Specialist", bio: "Short speaker bio to be added.", image: "" },
      { name: "Guest Solicitor", role: "Property Solicitor", bio: "Short speaker bio to be added.", image: "" },
    ],
    offers: [
      { icon: "Gift", amount: "A$5,000", title: "Attendee bonus", desc: "Register and attend to unlock an exclusive bonus. Terms and conditions apply." },
      { icon: "Users", amount: "A$2,700", title: "Referral reward", desc: "Refer a friend who works with us and earn a referral reward. Terms and conditions apply." },
    ],
  },

  footer: {
    blurb: "Property investment guidance for migrants and expats buying in Australia.",
    legalLine: "ABN 00 000 000 000. This website is general information only and is not financial or credit advice.",
    links: [
      { label: "Terms and conditions", href: "#" }, // replace with your own terms page/link
      { label: "Privacy policy", href: "#" },        // replace with your own privacy page/link
    ],
  },
};