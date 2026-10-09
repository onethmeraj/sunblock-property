// =============================================================
//  SUNBLOCK PROPERTY — ALL SITE CONTENT
//  Edit everything here. No coding needed elsewhere.
//  House style: short, plain sentences. No dashes in copy.
// =============================================================

export const site = {
  brandName: "Sunblock Property",

  bookingUrl: "/book-a-call",
  ctaLabel: "Book a call",

  // Where the forms send leads. 
  forms: {
    general: "https://services.leadconnectorhq.com/hooks/Mb9b0EE0NgmmnoOMbT0g/webhook-trigger/8c2d50e5-291d-43f4-bf48-bf2a2bebd9fd",
    seminar: "https://services.leadconnectorhq.com/hooks/Mb9b0EE0NgmmnoOMbT0g/webhook-trigger/3d9b5d49-613a-466d-abd2-5763ebc781b9", 
  },

  contact: { phone: "", email: "", whatsapp: "" },

  nav: [
    { label: "Clients", href: "#clients" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  seminar: { label: "Upcoming Seminar", href: "/seminar" },

  hero: {
    eyebrow: "Your trusted partner in Australian property",
    heading: "Invest in Australian property with absolute confidence",
    sub: "Stop stressing over where and what to buy. We provide expats and first-time investors with data-driven strategies to secure top-tier assets and build long-term wealth.",
    ctaLabel: "Start your investment journey",
    image: "hero.jpg", 
    badge: { rating: "5.0 / 5", text: "Trusted by 50+ clients" },
  },
  trustBar: {
    heading: "Recognised by trusted industry bodies",
    logos: [],
  },

  video: {
    heading: "A simple way to invest with more clarity",
    sub: "A short look at how we guide you from first question to final purchase.",
    embedUrl: "kaushi-intro.mp4", 
    poster: "",
  },
  about: {
    heading: "A clearer way to invest",
    body: "We work with migrants and expats who want support through the full buying process, from early planning to purchase. Instead of trying to figure it all out alone, you get full guidance from us.",
    image: "about.jpg", 
    points: [
      { text: "What may suit your goals", icon: "Target" },
      { text: "Which areas to focus on", icon: "MapPin" },
      { text: "What to avoid", icon: "ShieldAlert" },
      { text: "How to move forward with confidence", icon: "TrendingUp" },
    ],
  },
  statsIntro: "A more supported way to invest",
  stats: {
    heading: "A more supported way to invest",
    items: [
      { value: "50+", label: "Client Reviews" },
      { value: "12+", label: "Years Experience" },
      { value: "500+", label: "Clients Supported" },
    ],
  },

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
    sub: "We take the complexity out of buying property by managing the entire journey for you. From structuring your initial plan to negotiating the final price, you have expert guidance at every turn.",
    steps: [
      { id: "01", title: "Understand", desc: "We take time to understand your financial position." },
      { id: "02", title: "Plan", desc: "We create a strategy that fits your goals and comfort level." },
      { id: "03", title: "Buy", desc: "We find properties that match your strategy." },
      { id: "04", title: "Secure", desc: "We negotiate and secure the best deal for you." }
    ]
  },
  clients: {
    heading: "Real feedback from real clients",
    sub: "Short stories from people who wanted to invest with more clarity and support.",
    items: [
      { 
        quote: "From start to finish, professional, knowledgeable, and always available. The entire process was smooth and stress-free.", 
        name: "Sarah M.", 
        detail: "Sydney, NSW", 
        rating: 5,
        image: "" 
      },
      { 
        quote: "Our experience with Sunblock Property was nothing short of amazing. The process was seamless and incredibly fast.", 
        name: "Jason T.", 
        detail: "Melbourne, VIC", 
        rating: 5, 
        image: "" 
      },
      { 
        quote: "I highly recommend Sunblock Property! Thank you for helping me buy my first home. Looking forward to the next one.", 
        name: "Emily R.", 
        detail: "Brisbane, QLD", 
        rating: 5,
        image: "" 
      },
      { 
        quote: "Their guidance, clear communication, and attention to detail made all the difference. We always felt supported.", 
        name: "Michael B.", 
        detail: "Perth, WA", 
        rating: 4.5,
        image: "" 
      },
      { 
        quote: "It was basically 'leave it to us and relax' while it's in the process. We could not be happier with the outcome!", 
        name: "Amanda L.", 
        detail: "Adelaide, SA", 
        rating: 5,
        image: "" 
      },
      { 
        quote: "We cannot thank Kaushi and the team enough. Their data-driven approach gave me absolute confidence in my purchase.", 
        name: "David K.", 
        detail: "Sydney, NSW", 
        rating: 5,
        image: "" 
      },
      { 
        quote: "Investing from overseas felt risky until we met the Sunblock team. They handled everything on the ground perfectly.", 
        name: "Wei C.", 
        detail: "Singapore", 
        rating: 4.5,
        image: "" 
      },
      { 
        quote: "Their negotiation skills saved us thousands. Having a dedicated buyer's advocate made all the difference in the world.", 
        name: "Priya S.", 
        detail: "Melbourne, VIC", 
        rating: 5,
        image: "" 
      }
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
    name: "Property Investment Seminar",
    tagline: "Learn how to invest in Australian property with clarity and confidence.",
    date: "Date to be confirmed",
    time: "Time to be confirmed",
    venue: { name: "Venue to be confirmed", address: "Full address to be confirmed" },
    agenda: [
      {
        title: "Strategic Frameworks",
        desc: "Learn what our framework actually looks for. Discover the entry price and yield combinations that rule a suburb in or out before anything else gets considered."
      },
      {
        title: "Market Timing",
        desc: "How to read early momentum. Identify the window where a market has started moving but hasn't been noticed yet, and avoid arriving too late."
      },
      {
        title: "Risk Mitigation",
        desc: "How to rule a market out. Understand demand and supply balance, and learn the thinness test that keeps you out of markets too small to exit safely."
      },
      {
        title: "Borrowing Mechanics",
        desc: "How lending and borrowing power really work in the current economic climate, and how to structure your finances to scale your portfolio safely."
      }
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
      { label: "Terms and conditions", href: "#" },
      { label: "Privacy policy", href: "#" },
    ],
  },
};