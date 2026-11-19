import { Check, Globe, Headset, SlidersHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

type Feature = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  featured?: boolean;
};

const features: Feature[] = [
  {
    index: "01",
    icon: Globe,
    title: "Expertise mondiale",
    description:
      "Un réseau de compagnies aériennes et de partenaires sur les cinq continents. Nous construisons la meilleure route, même pour les itinéraires les plus complexes.",
    points: ["Vols multi-destinations", "Partenaires IATA & compagnies"],
  },
  {
    index: "02",
    icon: Headset,
    title: "Accompagnement humain 24/7",
    description:
      "Un vrai conseiller, pas un chatbot. Disponible sur WhatsApp avant, pendant et après votre voyage, où que vous soyez dans le monde.",
    points: ["Réponse en moins de 15 min", "Assistance 7j/7, 24h/24"],
    featured: true,
  },
  {
    index: "03",
    icon: SlidersHorizontal,
    title: "Tarifs & flexibilité",
    description:
      "Nous comparons, combinons et optimisons chaque option pour vous offrir le meilleur rapport valeur-liberté, sans jamais sacrifier votre confort.",
    points: ["Meilleures combinaisons de vols", "Options d'annulation flexibles"],
  },
];

export function WhySection() {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-cyan/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Pourquoi Baobab Flight</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl lg:text-[3.4rem]">
                Le luxe, c&apos;est la{" "}
                <span className="text-gradient-brand">simplicité</span>.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-night/55 lg:pb-2">
              Nous orchestrons chaque détail de votre voyage pour que vous
              n&apos;ayez qu&apos;une chose à faire : en profiter.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16">
          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={index * 90}
              className="h-full"
            >
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 transition-all duration-500 hover:-translate-y-1.5 lg:p-9",
                  feature.featured
                    ? "border-night bg-night text-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.55)]"
                    : "border-night/10 bg-white text-night shadow-[0_20px_40px_-30px_rgba(15,23,42,0.25)] hover:border-violet/20 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)]",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none absolute right-6 top-5 font-display text-6xl font-semibold tracking-tighter",
                    feature.featured ? "text-white/[0.06]" : "text-night/5",
                  )}
                >
                  {feature.index}
                </span>

                <span
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500",
                    feature.featured
                      ? "bg-white/10 text-cyan"
                      : "bg-cyan-soft text-violet group-hover:bg-violet group-hover:text-white",
                  )}
                >
                  <feature.icon className="h-5 w-5" />
                </span>

                <h3 className="mt-7 font-display text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 flex-1 text-sm leading-relaxed",
                    feature.featured ? "text-white/60" : "text-night/55",
                  )}
                >
                  {feature.description}
                </p>

                <ul
                  className={cn(
                    "mt-7 space-y-2.5 border-t pt-5 text-[13px] font-medium",
                    feature.featured ? "border-white/10" : "border-night/10",
                  )}
                >
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5">
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          feature.featured ? "text-cyan" : "text-violet",
                        )}
                      />
                      <span
                        className={
                          feature.featured ? "text-white/75" : "text-night/70"
                        }
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
