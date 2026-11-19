import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/cn";
import type { Country } from "@/data/destinations";

type CountryCardProps = {
  continentSlug: string;
  country: Country;
  priority?: boolean;
  className?: string;
};

export function CountryCard({
  continentSlug,
  country,
  priority = false,
  className,
}: CountryCardProps) {
  return (
    <Link
      href={`/destinations/${continentSlug}/${country.slug}`}
      className={cn(
        "group relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-[28px] ring-1 ring-night/10",
        className,
      )}
    >
      <SafeImage
        src={country.image}
        fallbackSrc={country.fallbackImage}
        alt={country.imageAlt}
        fill
        priority={priority}
        unoptimized
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-night via-night/45 to-night/5 opacity-95 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="inline-flex max-w-[calc(100%-3.25rem)] items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
          <MapPin className="h-3 w-3 shrink-0 text-cyan" />
          <span className="truncate">{country.tagline}</span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white">
          {country.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/60">
          {country.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
          <span className="text-xs text-white/55">
            Tarif en temps réel sur demande
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan">
            Découvrir
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
