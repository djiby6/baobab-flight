import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Continent } from "@/data/destinations";

type ContinentCardProps = {
  continent: Continent;
  priority?: boolean;
  className?: string;
};

export function ContinentCard({
  continent,
  priority = false,
  className,
}: ContinentCardProps) {
  return (
    <Link
      href={`/destinations/${continent.slug}`}
      className={cn(
        "group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[32px] ring-1 ring-night/10",
        className,
      )}
    >
      <Image
        src={continent.image}
        alt={continent.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-night via-night/45 to-night/5 opacity-95 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
          {continent.index}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan">
          <MapPin className="h-3 w-3" />
          {continent.name}
        </div>
        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-white">
          {continent.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/65">
          {continent.description}
        </p>
        <p className="mt-3 text-xs text-white/50">{continent.destinations}</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
          <span className="text-sm font-semibold text-white transition-colors group-hover:text-cyan">
            Explorer le continent
          </span>
          <span className="flex items-center gap-2 text-[11px] text-white/55">
            <span className="rounded-full bg-white/10 px-2.5 py-1 font-semibold text-white backdrop-blur-sm">
              Tarif sur demande
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
