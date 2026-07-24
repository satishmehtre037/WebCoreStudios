"use client";

import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { AnimationProvider } from "./animation-provider";
import { LoadingProvider } from "./loading-provider";
import { CursorProvider } from "./cursor-provider";
import { PageTransitionProvider } from "./page-transition-provider";
import { IntroLoader, ScrollProgress } from "@/components/core";
import type { WithChildren } from "@/types";

/**
 * Global Providers — wraps the entire app.
 * Order matters: outermost providers have no dependencies on inner ones.
 */
export function GlobalProviders({ children }: WithChildren) {
  return (
    <LoadingProvider>
      <AnimationProvider>
        <SmoothScrollProvider>
          <CursorProvider>
            <PageTransitionProvider>
              <ScrollProgress />
              <IntroLoader />
              {children}
            </PageTransitionProvider>
          </CursorProvider>
        </SmoothScrollProvider>
      </AnimationProvider>
    </LoadingProvider>
  );
}
