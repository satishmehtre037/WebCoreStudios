"use client";

import { PRODUCTS_DATA } from "@/config/site";
import { Section, Container, Heading, Card, Tag, Pill } from "@/components/ui";
import { HorizontalScroll } from "@/components/layout";
import { useScrollReveal } from "@/hooks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export function Products() {
  const { setCursorVariant } = useUIStore();
  const prefersReducedMotion = usePrefersReducedMotion();

  // If reduced motion, we want to stagger the vertical stack
  const verticalStackRef = useScrollReveal<HTMLDivElement>({
    type: "fade",
    stagger: 0.1,
    start: "top 80%",
  });

  const renderProductCards = () => {
    return PRODUCTS_DATA.map((product, index) => {
      const isFlagship = index === 0;
      const isLive = product.status === "live";

      return (
        <Card
          key={product.id}
          variant={isLive ? "elevated" : "glass"}
          className={cn(
            "product-card flex flex-col justify-between group flex-shrink-0 transition-transform duration-500 ease-out",
            "cursor-none rounded-3xl", // Emphasizing the rounded-square language
            // Width variations based on layout mode
            prefersReducedMotion ? "w-full min-h-[300px]" : isFlagship ? "w-[75vw] max-w-[900px] h-[60vh] min-h-[400px]" : "w-[40vw] max-w-[500px] h-[60vh] min-h-[400px]",
            isLive ? "hover:scale-[1.02] hover:shadow-glow" : "opacity-80"
          )}
          onMouseEnter={() => setCursorVariant("media")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          {/* Internal Content Wrapper */}
          <div className="flex flex-col h-full p-8 md:p-12 relative z-10">
            {/* Header: Name and Status */}
            <div className="flex items-center justify-between mb-8">
              <Heading level="h3" className={cn("tracking-tight", isLive ? "text-foreground" : "text-foreground/80")}>
                {product.name}
              </Heading>
              
              {!isLive && (
                <Pill variant="outline" size="sm" className="border-foreground/10 text-foreground/50">
                  {product.status.replace("-", " ")}
                </Pill>
              )}
            </div>

            {/* Positioning Statement */}
            <p className={cn(
              "text-body-lg font-medium leading-relaxed max-w-lg mb-auto",
              isLive ? "text-foreground/90" : "text-foreground/60"
            )}>
              {product.positioning}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {product.tags.map((tag) => (
                <Tag 
                  key={tag} 
                  variant={isLive ? "default" : "outline"} 
                  size="md"
                  className={cn(!isLive && "border-foreground/10 text-foreground/40")}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          
          {/* Subtle Background Pattern / Glow (Simulating App Preview) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-radial-glow from-primary/10 to-transparent scale-150" />
            <div className={cn(
              "absolute -right-20 -bottom-20 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl transition-opacity duration-700",
              isLive ? "bg-primary/5 group-hover:bg-primary/20" : "bg-foreground/5 group-hover:bg-foreground/10"
            )} />
          </div>
        </Card>
      );
    });
  };

  return (
    <Section id="work" spacing="none" className="bg-background text-foreground relative z-10">
      
      {/* Intro Header */}
      <Container className="pt-24 md:pt-32 pb-8 md:pb-16">
        <Heading level="h2" className="mb-4">
          The Operating Systems.
        </Heading>
        <p className="text-body-lg text-foreground-secondary max-w-2xl">
          Reusable, industry-specific software engines. Because building from scratch every time is a liability.
        </p>
      </Container>

      {/* Product Showcase */}
      {prefersReducedMotion ? (
        <Container>
          <div ref={verticalStackRef} className="flex flex-col gap-8 pb-24 md:pb-32">
            {renderProductCards()}
          </div>
        </Container>
      ) : (
        <HorizontalScroll speed={1} className="bg-background">
          <div className="flex gap-6 md:gap-12 px-6 md:px-12 h-full items-center">
            {renderProductCards()}
            {/* Spacer at the end so the last card doesn't stick to the edge */}
            <div className="w-[10vw] flex-shrink-0" />
          </div>
        </HorizontalScroll>
      )}

    </Section>
  );
}
