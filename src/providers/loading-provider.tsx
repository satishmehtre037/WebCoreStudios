"use client";

import { useEffect, useState, createContext, useContext, useCallback } from "react";
import { useUIStore } from "@/store";
import type { WithChildren } from "@/types";

/* ── Context ────────────────────────────────────────────────── */
interface LoadingContextValue {
  isLoading: boolean;
  progress: number;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: true,
  progress: 0,
  finishLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

/* ── Provider ───────────────────────────────────────────────── */
export function LoadingProvider({ children }: WithChildren) {
  const { isLoading, setLoading, loadingProgress, setLoadingProgress } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);

  const finishLoading = useCallback(() => {
    setLoadingProgress(100);
    setTimeout(() => setLoading(false), 500);
  }, [setLoading, setLoadingProgress]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <LoadingContext.Provider
      value={{ isLoading, progress: loadingProgress, finishLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
