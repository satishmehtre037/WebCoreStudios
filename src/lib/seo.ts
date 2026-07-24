import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Generate consistent metadata for any page.
 * Usage: export const metadata = constructMetadata({ title: "About", description: "..." });
 */
export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.name;
  const resolvedDescription = description || siteConfig.description;
  const resolvedImage = image || siteConfig.ogImage;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: [
      "web development",
      "software engineering",
      "SaaS",
      "AI applications",
      "business automation",
      "enterprise dashboard",
      "mobile apps",
      "premium design",
      "WebCore Studios",
    ],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
      creator: "@webcorestudios",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL(siteConfig.url),
  };
}
