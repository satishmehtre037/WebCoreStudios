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
    category: "Bakery & Ice Cream",
    problem: "The business had little to no real digital presence despite being an established, well-reviewed local brand.",
    build: "A premium, mobile-first website with WhatsApp ordering, gallery, reviews, and clear conversion paths, built on the reusable CakeOS product approach.",
    outcome: "A credible, premium web presence matching the quality of the brand's reputation.",
    image: null,
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
