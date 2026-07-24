import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Performance ──────────────────────────────────────────── */
  reactStrictMode: true,
  poweredByHeader: false,

  /* ── Image Optimization ───────────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ── Bundle Optimization ──────────────────────────────────── */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
    ],
  },

  /* ── Turbopack Configuration (Next.js 16+) ────────────────── */
  turbopack: {},

  /* ── Security Headers ─────────────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
