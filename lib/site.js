// =============================================================
//  SUNBLOCK PROPERTY — ALL SITE CONTENT
//  Edit everything here. No coding needed elsewhere.
//  House style: short, plain sentences. No dashes in copy.
// =============================================================

export const site = {
  brandName: "Sunblock Property",

  bookingUrl: "/book-a-call",
  ctaLabel: "Book a call",

  forms: {
    general: "https://services.leadconnectorhq.com/hooks/Mb9b0EE0NgmmnoOMbT0g/webhook-trigger/8c2d50e5-291d-43f4-bf48-bf2a2bebd9fd",
    seminar: "https://services.leadconnectorhq.com/hooks/Mb9b0EE0NgmmnoOMbT0g/webhook-trigger/3d9b5d49-613a-466d-abd2-5763ebc781b9", 
  },

  contact: { phone: "", email: "", whatsapp: "" },

  nav: [
    { label: "Clients", href: "/#clients" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
  ],
  seminar: { label: "Upcoming Seminar", href: "/seminar" },

  hero: {
    eyebrow: "Your trusted partner in Australian property",
    heading: "Buy Australian property with absolute confidence",
    sub: "Stop stressing over where and what to buy. We help expats and first-time buyers with data-driven strategies to secure high-performing investment properties and build long-term security.",
    ctaLabel: "Start your property journey",
    image: "hero.jpg", 
    badge: { rating: "5.0 / 5", text: "Trusted by 50+ clients" },
  },
  trustBar: {
    heading: "Recognised by trusted industry bodies",
    logos: [],
  },

    video: {
    heading: "A simple way to buy with more clarity",
    sub: "A short look at how we guide you from first question to final purchase.",
    embedUrl: "/vsl.mp4",
    poster: "/vsl-poster.jpg",
  },
  about: {
    heading: "A clearer way to buy property",
    body: "We work with migrants and expats who want support through the full buying process, from early planning to purchase. Instead of trying to figure it all out alone, you get full guidance from us.",
    image: "about.jpg", 
    points: [
      { text: "What property may suit your goals", icon: "Target" },
      { text: "Which suburbs to focus on", icon: "MapPin" },
      { text: "What to avoid", icon: "ShieldAlert" },
      { text: "How to move forward with confidence", icon: "TrendingUp" },
    ],
  },
  statsIntro: "A more supported way to buy property",
  stats: {
    heading: "A more supported way to buy property",
    items: [
      { value: "50+", label: "Client Reviews" },
      { value: "12+", label: "Years Experience" },
      { value: "500+", label: "Clients Supported" },
    ],
  },

  services: {
    heading: "What we help with",
    sub: "We help buyers move from uncertainty to action with support at each stage.",
    items: [
      { title: "Clear strategy", desc: "We start by understanding your situation and build a long term property plan around your goals.", icon: "Compass" },
      { title: "Buyer advocacy", desc: "We search, assess, and negotiate the right property on your behalf.", icon: "Handshake" },
      { title: "End to end support", desc: "We coordinate with your broker and conveyancer so the whole purchase runs smoothly.", icon: "Landmark" },
    ],
  },

  process: {
    heading: "Simple, clear, and built to move you forward",
    sub: "We take the complexity out of buying property by managing the entire journey for you. From shaping your initial plan to negotiating the final price, you have expert guidance at every turn.",
    steps: [
      { id: "01", title: "Understand", desc: "We take time to understand your goals and budget." },
      { id: "02", title: "Plan", desc: "We create a property strategy that fits your goals and comfort level." },
      { id: "03", title: "Buy", desc: "We find properties that match your strategy." },
      { id: "04", title: "Secure", desc: "We negotiate and secure the best deal for you." }
    ]
  },
  clients: {
    heading: "Real feedback from real clients",
    sub: "Short stories from people who wanted to buy with more clarity and support.",
    items: [
      { quote: "From start to finish, professional, knowledgeable, and always available. The entire process was smooth and stress-free.", name: "Sarah M.", detail: "Sydney, NSW", rating: 5, image: "" },
      { quote: "Our experience with Sunblock Property was nothing short of amazing. The process was seamless and incredibly fast.", name: "Jason T.", detail: "Melbourne, VIC", rating: 5, image: "" },
      { quote: "I highly recommend Sunblock Property! Thank you for helping me buy my first home. Looking forward to the next one.", name: "Emily R.", detail: "Brisbane, QLD", rating: 5, image: "" },
      { quote: "Their guidance, clear communication, and attention to detail made all the difference. We always felt supported.", name: "Michael B.", detail: "Perth, WA", rating: 4.5, image: "" },
      { quote: "It was basically 'leave it to us and relax' while it's in the process. We could not be happier with the outcome!", name: "Amanda L.", detail: "Adelaide, SA", rating: 5, image: "" },
      { quote: "We cannot thank Kaushi and the team enough. Their data-driven approach gave me absolute confidence in my purchase.", name: "David K.", detail: "Sydney, NSW", rating: 5, image: "" },
      { quote: "Buying from overseas felt risky until we met the Sunblock team. They handled everything on the ground perfectly.", name: "Wei C.", detail: "Singapore", rating: 4.5, image: "" },
      { quote: "Their negotiation skills saved us thousands. Having a dedicated buyer's advocate made all the difference in the world.", name: "Priya S.", detail: "Melbourne, VIC", rating: 5, image: "" }
    ],
  },

  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "What exactly do you do as a buyer's agent?", a: "We handle the full property journey for you. Strategy, suburb selection, sourcing, due diligence, negotiation, and purchase." },
      { q: "How do you choose the right suburb?", a: "We focus on property fundamentals like population growth, infrastructure, jobs, and limited supply. Not hype." },
      { q: "What type of property should I buy?", a: "We favour properties with strong land value and scarcity. That usually means houses or well chosen townhouses over high density apartments." },
      { q: "How do you reduce the risk of buying the wrong property?", a: "We run thorough due diligence on every property, checking demand, supply, and how easily you could sell it later. We only shortlist properties that pass." },
      { q: "Can you help me buy from overseas?", a: "Yes. Many of our clients are expats buying from overseas. We represent you on the ground and manage the full process remotely." },
      { q: "How many properties can you help me buy?", a: "Whether it is your first home or a growing portfolio, we build a plan around your goals and help you buy one property at a time, the right way." },
      { q: "Do you only work with first-time buyers?", a: "No. We work with first-time buyers, upgraders, and investors who want expert representation and a data-driven approach." },
      { q: "How do I get access to off-market properties?", a: "Through our network of agents and developers, we see properties before they hit the public market and bring the best ones to you." },
      { q: "Will you represent me in the negotiation?", a: "Yes. We negotiate on your behalf and act solely in your interest, so you are never up against the selling agent alone." },
      { q: "How long does it take to buy?", a: "Usually four to eight weeks from strategy to purchase, depending on the market and how clear your brief is." },
    ],
  },

  finalCta: {
    heading: "Book a call and get clarity on your next move",
    sub: "A short, no pressure conversation about where you are and what could come next.",
  },

  // =============================================================
  //  SEMINAR PAGE
  //  TODO: update date, time and venue once Kaushi confirms the
  //  new seminar. Until then the page shows "To be announced".
  // =============================================================
  seminarPage: {
    eyebrow: "Upcoming Seminar",
    name: "Migrant to Property Owner",
    tagline: "Learn how to buy Australian property with clarity and confidence.",
    date: "Date to be announced", // TODO e.g. "Saturday, 5 December 2026"
    time: "Time to be announced", // TODO e.g. "3:00 to 5:00pm AEDT"
    venue: { name: "Melbourne, venue to be announced", address: "" }, // TODO venue name and full address
    cost: "Free, in person",
    agenda: [
      { title: "Strategic Frameworks", desc: "Learn what our property framework actually looks for. Discover the entry price and growth combinations that rule a suburb in or out before anything else gets considered." },
      { title: "Market Timing", desc: "How to read early momentum. Identify the window where a property market has started moving but hasn't been noticed yet, and avoid arriving too late." },
      { title: "Risk Mitigation", desc: "How to rule a market out. Understand demand and supply balance, and learn the thinness test that keeps you out of markets too small to exit safely." },
      { title: "Buying the Right Property", desc: "How to choose a property that holds its value and attracts strong tenant demand, and how to structure your search so you buy with confidence." }
    ],
    speakers: [
      { name: "Guest Solicitor", role: "Property Solicitor", bio: "Short speaker bio to be added.", image: "" },
    ],
    offers: [
      { icon: "Gift", amount: "A$5,000", title: "Attendee bonus", desc: "Register and attend to unlock an exclusive bonus. Terms and conditions apply." },
      { icon: "Users", amount: "A$2,700", title: "Referral reward", desc: "Refer a friend who works with us and earn a referral reward. Terms and conditions apply." },
    ],
  },

  footer: {
    blurb: "Property buying guidance for migrants and expats purchasing in Australia.",
    legalLine: "ABN 00 000 000 000. This website is general information only and is not financial or credit advice.",
    links: [
      { label: "Terms and conditions", href: "#" },
      { label: "Privacy policy", href: "#" },
    ],
  },
};