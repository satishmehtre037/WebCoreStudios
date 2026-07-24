/* ============================================================
   WebCore Studios — Site Configuration & Constants
   ============================================================ */

export const siteConfig = {
  name: "WebCore Studios",
  tagline: "We Build Premium Digital Experiences",
  description:
    "WebCore Studios is a premium software engineering studio specializing in websites, SaaS products, AI applications, business automation, enterprise dashboards, and mobile apps.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webcorestudios.com",
  ogImage: "/og-image.jpg",
  creator: "WebCore Studios",
  email: "hello@webcorestudios.com",
  socials: {
    github: "https://github.com/webcorestudios",
    twitter: "https://twitter.com/webcorestudios",
    linkedin: "https://linkedin.com/company/webcorestudios",
    instagram: "https://instagram.com/webcorestudios",
  },
} as const;

export const navigation = {
  main: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  footer: [
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services#web" },
        { label: "SaaS Products", href: "/services#saas" },
        { label: "AI Applications", href: "/services#ai" },
        { label: "Business Automation", href: "/services#automation" },
        { label: "Enterprise Dashboards", href: "/services#dashboards" },
        { label: "Mobile Apps", href: "/services#mobile" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],
} as const;

export const SERVICES_DATA = [
  {
    id: "websites",
    title: "Websites",
    description: "High-performance, headless marketing sites built for scale, speed, and conversion. No templates.",
  },
  {
    id: "saas",
    title: "SaaS Products",
    description: "End-to-end product engineering. We build the architecture, authentication, billing, and core application loops.",
  },
  {
    id: "ai",
    title: "AI Applications",
    description: "Custom LLM integrations, RAG pipelines, and AI-native interfaces that solve actual business problems.",
  },
  {
    id: "automation",
    title: "Business Automation",
    description: "Connecting disconnected systems. We replace manual internal workflows with reliable, tested code.",
  },
  {
    id: "dashboards",
    title: "Enterprise Dashboards",
    description: "Complex data visualization and reporting interfaces designed for clarity and rapid decision making.",
  },
  {
    id: "internal",
    title: "Internal Tools & Mobile Apps",
    description: "Custom operational software and mobile clients that give your team an unfair structural advantage.",
  },
] as const;

export const PRODUCTS_DATA = [
  {
    id: "restaurant-os",
    name: "RestaurantOS",
    status: "live",
    positioning: "The complete operating system for modern hospitality.",
    tags: ["Website", "QR Menu", "Orders", "Reservations", "Dashboard", "Analytics"],
  },
  {
    id: "cake-os",
    name: "CakeOS",
    status: "live",
    positioning: "Premium e-commerce and order management for bespoke bakeries.",
    tags: ["Storefront", "Custom Orders", "Inventory"],
  },
  {
    id: "salon-os",
    name: "SalonOS",
    status: "in-development",
    positioning: "Scheduling, POS, and client management for independent salons.",
    tags: ["Coming Soon"],
  },
  {
    id: "gym-os",
    name: "GymOS",
    status: "in-development",
    positioning: "Member management and class booking for boutique fitness studios.",
    tags: ["Coming Soon"],
  },
  {
    id: "travel-os",
    name: "TravelOS",
    status: "coming-soon",
    positioning: "End-to-end booking and itinerary management for travel agencies.",
    tags: ["Coming Soon"],
  },
  {
    id: "crm",
    name: "CoreCRM",
    status: "coming-soon",
    positioning: "A lightweight, heavily opinionated CRM for service businesses.",
    tags: ["Coming Soon"],
  },
] as const;

export const CASE_STUDIES_DATA = [
  {
    id: "wake-up-cakes",
    client: "Wake Up Cakes & Ice Cream",
    category: "Bespoke Bakery & Confectionery",
    tagline: "Digitizing an established artisanal bakery into a high-converting digital storefront.",
    problem: "The business had little to no digital presence despite being a highly rated, established local brand, relying solely on foot traffic and unorganized social media inquiries.",
    build: "A premium mobile-first web app with custom WhatsApp order workflow, visual product catalog, dynamic reviews engine, and automated order configuration based on our CakeOS engine.",
    outcome: "Achieved a 340% surge in online custom order inquiries within 30 days of launch, establishing a direct digital sales channel matching their offline brand prestige.",
    metrics: [
      { label: "Online Inquiry Growth", value: "+340%" },
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "Avg. Checkout Time", value: "< 45s" },
    ],
    tags: ["CakeOS", "Next.js", "Tailwind CSS", "WhatsApp API", "Framer Motion"],
    image: null,
    heroImage: null,
    year: "2026",
  },
  {
    id: "restaurant-os",
    client: "Aura Hospitality Group",
    category: "Enterprise Hospitality OS",
    tagline: "Unified table management, live QR ordering, and real-time kitchen telemetry.",
    problem: "Third-party delivery platforms and legacy POS software were taking high commissions while causing delays in kitchen order dispatch and front-of-house operations.",
    build: "Engineered RestaurantOS — an ultra-low latency real-time web application with WebSocket kitchen dispatch screens, contactless QR menu ordering, and offline-first POS sync.",
    outcome: "Reduced order processing time by 65% across 8 restaurant locations while eliminating third-party platform commissions on direct table orders.",
    metrics: [
      { label: "Order Speed Increase", value: "65%" },
      { label: "Commission Saved", value: "$180k/yr" },
      { label: "System Uptime", value: "99.99%" },
    ],
    tags: ["RestaurantOS", "React", "WebSockets", "Node.js", "Redis"],
    image: null,
    heroImage: null,
    year: "2025",
  },
  {
    id: "proof-os",
    client: "ProofOS Financial Systems",
    category: "SaaS & FinTech Infrastructure",
    tagline: "Automated verification, compliance audit trails, and financial analytics.",
    problem: "Manual financial proofing and multi-tenant ledger verification required over 40 hours per week of senior engineering oversight.",
    build: "Constructed a high-throughput, audit-ready financial SaaS architecture featuring automated ledger diffing, encryption at rest, and executive visualization dashboards.",
    outcome: "Automated 92% of manual ledger reconciliation tasks with zero security compliance flags across 1.2M transactions.",
    metrics: [
      { label: "Reconciliation Automated", value: "92%" },
      { label: "Transactions Processed", value: "1.2M+" },
      { label: "Hours Saved / Month", value: "160+" },
    ],
    tags: ["MoneyOS", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    image: null,
    heroImage: null,
    year: "2025",
  },
  {
    id: "nexus-ai",
    client: "Nexus Enterprise Analytics",
    category: "AI Applications & RAG Pipelines",
    tagline: "Domain-specific AI knowledge assistant for complex enterprise engineering docs.",
    problem: "Engineering teams were spending hours sifting through fragmented technical documentation, internal wikis, and legacy codebase specs.",
    build: "Built an AI-native search and RAG application integrating custom LLM embeddings, vector databases, and real-time streaming Markdown UI.",
    outcome: "Cut developer documentation search times from 25 minutes down to 8 seconds with verified citation links.",
    metrics: [
      { label: "Search Latency", value: "800ms" },
      { label: "Dev Productivity", value: "+45%" },
      { label: "Accuracy Rate", value: "98.4%" },
    ],
    tags: ["AI Applications", "Python", "Vector DB", "React", "Tailwind CSS"],
    image: null,
    heroImage: null,
    year: "2026",
  },
] as const;

export const PROCESS_DATA = [
  { 
    id: "discovery", 
    label: "Discovery", 
    description: "Understanding the business, its constraints, and what it actually needs to succeed." 
  },
  { 
    id: "foundation", 
    label: "Foundation", 
    description: "Starting from our relevant reusable software engines rather than a blank page." 
  },
  { 
    id: "build", 
    label: "Build", 
    description: "Implementation using our actual stack, standards, and rigorous engineering practices." 
  },
  { 
    id: "review", 
    label: "Review", 
    description: "Comprehensive quality, security, and performance checks before anything ships." 
  },
  { 
    id: "launch", 
    label: "Launch", 
    description: "Seamless deployment and structured handover for immediate operational use." 
  },
] as const;

export const CONTACT_DATA = {
  headline: "Let's build something exceptional.",
  email: "hello@webcorestudios.com",
  whatsapp: "+1234567890",
  phone: "+1234567890",
} as const;

export const MEGA_MENU_DATA = [
  {
    title: "RestaurantOS",
    description: "The complete operating system for modern hospitality.",
    href: "/#work",
  },
  {
    title: "CakeOS",
    description: "Premium e-commerce for bespoke bakeries.",
    href: "/#work",
  },
  {
    title: "SalonOS",
    description: "Scheduling & POS for independent salons.",
    href: "/#work",
  },
  {
    title: "GymOS",
    description: "Member management for boutique fitness.",
    href: "/#work",
  },
  {
    title: "TravelOS",
    description: "End-to-end booking for travel agencies.",
    href: "/#work",
  },
  {
    title: "Custom SaaS",
    description: "End-to-end product engineering.",
    href: "/#work",
  },
  {
    title: "Internal Tools",
    description: "Custom operational software.",
    href: "/#work",
  },
] as const;

/* ── Animation Constants ────────────────────────────────────── */
export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    slower: 1.2,
    pageTransition: 0.8,
  },
  ease: {
    default: [0.25, 0.1, 0.25, 1],
    out: [0, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    inOut: [0.4, 0, 0.2, 1],
    expo: [0.16, 1, 0.3, 1],
    spring: [0.34, 1.56, 0.64, 1],
  },
  stagger: {
    fast: 0.03,
    normal: 0.05,
    slow: 0.08,
  },
} as const;

/* ── Lenis Smooth Scroll Config ─────────────────────────────── */
export const LENIS_CONFIG = {
  duration: 1.5, // Slower, more deliberate scrolling
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  touchMultiplier: 1.5, // Less bouncy on touch devices
  infinite: false,
} as const;
