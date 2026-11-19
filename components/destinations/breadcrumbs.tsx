import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  light?: boolean;
  className?: string;
};

export function Breadcrumbs({
  items,
  light = false,
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-xs", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light
                      ? "text-white/55 hover:text-white"
                      : "text-night/45 hover:text-night",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-medium",
                    light ? "text-white/80" : "text-night/70",
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden
                  className={cn(
                    "h-3 w-3",
                    light ? "text-white/30" : "text-night/25",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
