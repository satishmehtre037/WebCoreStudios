"use client";

import { forwardRef, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { AnimatePresence, motion } from "framer-motion";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Close on backdrop click */
  dismissible?: boolean;
  /** Title for accessibility */
  title?: string;
}

/**
 * Modal / Dialog overlay with Framer Motion transitions.
 * Traps focus and handles Escape key.
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, className, dismissible = true, title }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    /* Escape key handler */
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape" && dismissible) onClose();
      },
      [onClose, dismissible]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [open, handleKeyDown]);

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0" style={{ zIndex: "var(--z-modal)" as unknown as number }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={dismissible ? onClose : undefined}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface border border-border p-6 shadow-2xl",
                  className
                )}
                role="dialog"
                aria-modal="true"
                aria-label={title}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 text-muted hover:text-foreground"
                  onClick={onClose}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </Button>
                <div ref={contentRef}>{children}</div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);
Modal.displayName = "Modal";

export { Modal };
