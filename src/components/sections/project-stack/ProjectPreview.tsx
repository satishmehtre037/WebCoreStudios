"use client";

import { PinnedProjectItem } from "@/types";
import { cn } from "@/lib/utils";
import { Globe, Smartphone, ShieldCheck, Activity } from "lucide-react";

export interface ProjectPreviewProps {
  project: PinnedProjectItem;
  className?: string;
  isModal?: boolean;
}

export function ProjectPreview({ project, className, isModal = false }: ProjectPreviewProps) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center p-4 md:p-8 overflow-hidden", className)}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial-glow from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Main Desktop Mockup Frame */}
      <div
        className={cn(
          "relative w-full max-w-2xl bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-transform duration-700",
          isModal ? "h-[320px] md:h-[400px]" : "h-[280px] md:h-[340px]"
        )}
      >
        {/* Browser Top Chrome Header */}
        <div className="h-10 border-b border-border/60 bg-background/80 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 bg-surface-elevated/70 px-3 py-1 rounded-md border border-border/40 text-overline text-foreground/50 max-w-[220px] truncate">
            <Globe size={11} className="text-primary" />
            <span className="truncate">{project.liveUrl.replace("https://", "")}</span>
          </div>

          <div className="flex items-center gap-2 text-foreground/40">
            <ShieldCheck size={14} className="text-emerald-400" />
          </div>
        </div>

        {/* Browser Screen Content Area */}
        <div className="flex-1 bg-background/90 p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Hero Banner Mock */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-overline text-primary font-mono">
                {project.category.toUpperCase()}
              </span>
            </div>
            <h4 className="text-h4 font-bold text-foreground tracking-tight">
              {project.title}
            </h4>
            <p className="text-body-sm text-foreground/70 line-clamp-2 max-w-md">
              {project.description}
            </p>
          </div>

          {/* Telemetry Status Cards inside Mockup */}
          <div className="relative z-10 grid grid-cols-2 gap-3 pt-4 border-t border-border/40">
            <div className="p-3 rounded-xl bg-surface-elevated/80 border border-border/40 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-overline text-foreground/40">SYSTEM STATUS</span>
                <span className="text-body-sm font-semibold text-emerald-400">OPERATIONAL</span>
              </div>
              <Activity size={16} className="text-emerald-400" />
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated/80 border border-border/40 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-overline text-foreground/40">LATENCY</span>
                <span className="text-body-sm font-semibold text-primary">&lt; 45ms</span>
              </div>
              <Globe size={16} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Overlapping Mobile Mockup Frame */}
      <div
        className={cn(
          "absolute right-4 bottom-2 md:right-8 md:bottom-4 w-36 md:w-44 h-56 md:h-64",
          "bg-surface border-2 border-border/90 rounded-[2rem] shadow-2xl p-2 flex flex-col justify-between z-20",
          "hidden sm:flex"
        )}
      >
        <div className="w-12 h-1.5 bg-border/60 rounded-full mx-auto mb-1 shrink-0" />
        <div className="flex-1 bg-background/90 rounded-2xl p-3 flex flex-col justify-between border border-border/30">
          <div className="flex items-center justify-between text-[10px] text-foreground/50">
            <span>{project.title.split(" ")[0]}</span>
            <Smartphone size={10} className="text-primary" />
          </div>
          <div className="space-y-1 my-auto">
            <div className="h-3 bg-primary/20 rounded w-3/4" />
            <div className="h-2 bg-foreground/10 rounded w-full" />
            <div className="h-2 bg-foreground/10 rounded w-5/6" />
          </div>
          <div className="h-6 bg-primary/30 rounded-lg flex items-center justify-center text-[9px] text-primary font-bold">
            Live Preview
          </div>
        </div>
      </div>
    </div>
  );
}
