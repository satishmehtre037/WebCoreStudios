"use client";

import { SERVICES_DATA } from "@/config/site";
import { Container, Section, Heading } from "@/components/ui";
import { useScrollReveal } from "@/hooks";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export function Services() {
  const { setCursorVariant } = useUIStore();

  // We use the scroll reveal hook on the parent list, tracking the .line elements inside.
  const listRef = useScrollReveal<HTMLDivElement>({
    type: "text",
    stagger: 0.08,
    start: "top 80%",
  });

  return (
    <Section id="services" spacing="lg" className="bg-surface text-foreground relative z-10 border-t border-border/50">
      <Container>
        {/* Section Header */}
        <div className="mb-10 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <Heading level="h2" className="text-foreground">
            What We Build
          </Heading>
          <p className="text-body-md text-foreground-secondary max-w-sm">
            Core engineering capabilities designed for scale, speed, and durability.
          </p>
        </div>

        {/* Editorial Services List */}
        <div ref={listRef} className="flex flex-col border-t border-border/50">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-12 py-8 md:py-14 border-b border-border/50 transition-colors duration-500 hover:bg-surface-elevated md:cursor-none"
              onMouseEnter={() => setCursorVariant("card")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {/* Expanding Accent Line on Hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary transform scale-y-0 origin-bottom transition-transform duration-500 ease-out group-hover:scale-y-100" />
              
              <div className="w-full md:w-5/12 pl-4 md:pl-10">
                <span className="text-body-sm text-foreground-secondary mb-1 sm:mb-2 block font-mono">
                  <span className="line block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <Heading level="h3" className="text-foreground">
                  <span className="line block">{service.title}</span>
                </Heading>
              </div>
              
              <div className="w-full md:w-7/12 pl-4 md:pl-0 pr-4 md:pr-10">
                <p className="text-body-md sm:text-body-lg text-foreground-secondary leading-relaxed max-w-2xl">
                  <span className="line block">{service.description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
