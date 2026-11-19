import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { continents, type Continent } from "@/data/destinations";
import { cn } from "@/lib/cn";

export function InspirationSection() {
  return (
    <section id="inspirations" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Inspirations &amp; destinations</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl lg:text-[3.4rem]">
                Le monde, en cinq{" "}
                <span className="text-gradient-brand">chapitres</span>.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                Des itinéraires choisis avec soin, pensés pour les voyageurs qui
                cherchent l&apos;essentiel : l&apos;émotion.
              </p>
              <Link
                href="/destinations"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-night transition hover:text-violet"
              >
                Explorer toutes les destinations
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div
          id="destinations"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:h-[680px] lg:grid-cols-4 lg:grid-rows-2"
        >
          {continents.map((continent, index) => (
            <Reveal
              key={continent.slug}
              delay={index * 70}
              className={cn(
                "h-full",
                continent.featured &&
                  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
              )}
            >
              <InspirationCard continent={continent} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InspirationCard({ continent }: { continent: Continent }) {
  return (
    <Link
      href={`/destinations/${continent.slug}`}
      className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[28px] ring-1 ring-night/10"
    >
      <Image
        src={continent.image}
        alt={continent.imageAlt}
        fill
        sizes={
          continent.featured
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        }
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-night via-night/45 to-night/5 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
          {continent.index}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative p-6 lg:p-7">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan">
          <MapPin className="h-3 w-3" />
          {continent.name}
        </div>
        <h3
          className={cn(
            "mt-2 font-display font-semibold leading-tight tracking-tight text-white",
            continent.featured ? "text-3xl lg:text-[2.6rem]" : "text-2xl",
          )}
        >
          {continent.title}
        </h3>
        {continent.featured && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
            {continent.description}
          </p>
        )}
        <p className="mt-3 text-xs text-white/50">{continent.destinations}</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
          <span className="text-sm font-semibold text-white transition-colors group-hover:text-cyan">
            Explorer la destination
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
