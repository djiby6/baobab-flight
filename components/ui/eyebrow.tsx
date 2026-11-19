import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  light?: boolean;
  className?: string;
};

export function Eyebrow({ children, light = false, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em]",
        light ? "text-cyan" : "text-violet",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          light ? "bg-cyan/60" : "bg-violet/40",
        )}
      />
      {children}
    </span>
  );
}
