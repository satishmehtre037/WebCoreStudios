/* ============================================================
   WebCore Studios — TypeScript Type Definitions
   ============================================================ */

/* ── Navigation ─────────────────────────────────────────────── */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

/* ── Project / Case Study ───────────────────────────────────── */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail: string;
  images: string[];
  url?: string;
  github?: string;
  year: number;
  featured: boolean;
}

export type ProjectCategory =
  | "website"
  | "saas"
  | "ai"
  | "automation"
  | "dashboard"
  | "mobile"
  | "internal-tool";

export interface CaseStudyItem {
  id: string;
  client: string;
  category: string;
  tagline: string;
  problem: string;
  build: string;
  outcome: string;
  metrics?: readonly { label: string; value: string }[];
  tags: readonly string[];
  image: string | null;
  heroImage?: string | null;
  year?: string;
  link?: string;
}

export interface PinnedProjectItem {
  id: string;
  title: string;
  category: string;
  status: "live" | "in-development" | "coming-soon";
  description: string;
  tags: readonly string[];
  keyFeatures: readonly string[];
  desktopPreview?: string | null;
  mobilePreview?: string | null;
  overview: string;
  techStack: readonly string[];
  timeline: string;
  challenges: string;
  results: string;
  liveUrl: string;
  githubUrl?: string;
}

/* ── Service ────────────────────────────────────────────────── */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

/* ── Testimonial ────────────────────────────────────────────── */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating?: number;
}

/* ── Team Member ────────────────────────────────────────────── */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials?: SocialLink[];
}

/* ── Social Link ────────────────────────────────────────────── */
export interface SocialLink {
  platform: "github" | "twitter" | "linkedin" | "dribbble" | "instagram" | "website";
  url: string;
}

/* ── Timeline Entry ─────────────────────────────────────────── */
export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
}

/* ── Contact Form ───────────────────────────────────────────── */
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  projectType?: ProjectCategory;
  message: string;
}

/* ── Animation ──────────────────────────────────────────────── */
export type AnimationDirection = "up" | "down" | "left" | "right";
export type AnimationVariant = "fade" | "slide" | "scale" | "mask" | "reveal";

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  direction?: AnimationDirection;
  stagger?: number;
  scrub?: boolean | number;
}

/* ── UI State ───────────────────────────────────────────────── */
export interface UIState {
  isLoading: boolean;
  isMenuOpen: boolean;
  isCursorHovered: boolean;
  cursorVariant: CursorVariant;
  activeSection: string;
}

export type CursorVariant = "default" | "pointer" | "text" | "hidden" | "magnetic" | "media" | "card";

/* ── Breakpoints ────────────────────────────────────────────── */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/* ── Component Props Helpers ────────────────────────────────── */
export type WithClassName<T = object> = T & { className?: string };
export type WithChildren<T = object> = T & { children: React.ReactNode };
export type WithOptionalChildren<T = object> = T & { children?: React.ReactNode };
