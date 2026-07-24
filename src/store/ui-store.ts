import { create } from "zustand";
import type { CursorVariant } from "@/types";

/* ============================================================
   WebCore Studios — Global UI Store (Zustand)
   ============================================================ */

interface UIStore {
  /* ── Loading ────────────────────────────────────────────── */
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  /* ── Navigation ─────────────────────────────────────────── */
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  /* ── Cursor ─────────────────────────────────────────────── */
  cursorVariant: CursorVariant;
  cursorLabel: string;
  setCursorVariant: (variant: CursorVariant) => void;
  setCursorLabel: (label: string) => void;
  resetCursor: () => void;

  /* ── Active Section ─────────────────────────────────────── */
  activeSection: string;
  setActiveSection: (section: string) => void;

  /* ── Page Transition ────────────────────────────────────── */
  isTransitioning: boolean;
  setTransitioning: (transitioning: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  /* ── Loading ────────────────────────────────────────────── */
  isLoading: true,
  loadingProgress: 0,
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),

  /* ── Navigation ─────────────────────────────────────────── */
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  /* ── Cursor ─────────────────────────────────────────────── */
  cursorVariant: "default",
  cursorLabel: "",
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
  setCursorLabel: (cursorLabel) => set({ cursorLabel }),
  resetCursor: () => set({ cursorVariant: "default", cursorLabel: "" }),

  /* ── Active Section ─────────────────────────────────────── */
  activeSection: "",
  setActiveSection: (activeSection) => set({ activeSection }),

  /* ── Page Transition ────────────────────────────────────── */
  isTransitioning: false,
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
}));
