import Link from "next/link";
import { Container } from "../ui/container";
import { navigation, siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

/**
 * Site footer with navigation columns and social links.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/30">
      <Container>
        <div className="py-16 md:py-20">
          {/* Top section */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="text-h4 font-bold text-foreground">
                {siteConfig.name}
              </Link>
              <p className="text-body-sm mt-4 max-w-xs text-foreground-secondary">
                {siteConfig.tagline}
              </p>
            </div>

            {/* Navigation columns */}
            {navigation.footer.map((group) => (
              <div key={group.title}>
                <h4 className="text-caption text-foreground-secondary mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-body-sm text-muted">
              © {year} {siteConfig.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {Object.entries(siteConfig.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-muted transition-colors duration-200 hover:text-foreground capitalize inline-flex items-center gap-1"
                  aria-label={`${platform} profile`}
                >
                  {platform}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
