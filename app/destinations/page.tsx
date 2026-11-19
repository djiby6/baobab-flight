import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ContinentCard } from "@/components/destinations/continent-card";
import { CountryCard } from "@/components/destinations/country-card";
import { DestinationCta } from "@/components/destinations/destination-cta";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { continents, getFeaturedCountries } from "@/data/destinations";
import { whatsappLink } from "@/lib/site";

const countryCount = continents.reduce(
  (total, continent) => total + continent.countries.length,
  0,
);

export const metadata: Metadata = {
  title: `Destinations — ${continents.length} continents, ${countryCount} pays`,
  description:
    "Explorez les destinations Baobab Flight : Afrique, Europe, Amériques, Asie et Océanie. Fiches pays, meilleures périodes, incontournables et réservation rapide sur WhatsApp.",
  keywords: [
    "destinations",
    "voyage",
    "Afrique",
    "Europe",
    "Amériques",
    "Asie",
    "Océanie",
    "Baobab Flight",
  ],
  openGraph: {
    title: `Destinations — ${continents.length} continents, ${countryCount} pays | Baobab Flight`,
    description:
      "Fiches pays, meilleures périodes pour partir, incontournables et conseils clés pour préparer votre voyage.",
    type: "website",
    locale: "fr_FR",
    siteName: "Baobab Flight",
  },
};

export default function DestinationsPage() {
  const featured = getFeaturedCountries(10);

  return (
    <main id="contenu">
      <section className="relative overflow-hidden bg-night text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-violet/25 blur-[150px]" />
          <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[130px]" />
          <div className="absolute inset-0 bg-hero-grid" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-night to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
          <div className="max-w-3xl">
            <Eyebrow light>Le monde, à portée de main</Eyebrow>
            <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
              Cinq continents.
              <span className="text-gradient-hero mt-1 block">
                Une infinité d&apos;histoires.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Des médinas du Maroc aux lagons de Polynésie, explorez nos fiches
              pays : meilleures périodes, incontournables, conseils clés et un
              accès direct à nos conseillers pour construire votre voyage.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(
                  "Bonjour Baobab Flight, je souhaite être conseillé pour choisir ma prochaine destination.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Demander un itinéraire
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="#continents"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                Explorer par continent
              </Link>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:mt-16 lg:grid-cols-4">
            {[
              { value: String(continents.length), label: "Continents couverts" },
              { value: String(countryCount), label: "Pays couverts" },
              { value: "24/7", label: "Assistance WhatsApp" },
              { value: "100 %", label: "Sur-mesure" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-white/45 sm:text-[13px]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="continents" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Explorer par continent</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Choisissez votre{" "}
                  <span className="text-gradient-brand">cap</span>.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                {continents.length} portes d&apos;entrée, {countryCount} pays
                et des itinéraires pensés pour chaque envie.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {continents.map((continent, index) => (
              <Reveal
                key={continent.slug}
                delay={index * 70}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <ContinentCard
                  continent={continent}
                  priority={index < 3}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Inspirations</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Nos pays{" "}
                  <span className="text-gradient-brand">phares</span>.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                Une sélection de destinations qui font rêver nos voyageurs, à
                découvrir fiche par fiche.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map(({ continent, country }, index) => (
              <Reveal key={`${continent.slug}-${country.slug}`} delay={index * 50}>
                <CountryCard
                  continentSlug={continent.slug}
                  country={country}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {continents.map((continent) => (
              <Link
                key={continent.slug}
                href={`/destinations/${continent.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-night/10 bg-cream px-4 py-2 text-xs font-semibold text-night/60 transition hover:border-violet/30 hover:text-violet"
              >
                <Compass className="h-3.5 w-3.5" />
                {continent.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DestinationCta
        title="Vous hésitez encore ? Nous dessinons l'itinéraire avec vous."
        description="Un conseiller dédié vous aide à choisir la destination, la période idéale et le budget qui vous ressemble. Réponse en moins de 15 minutes sur WhatsApp."
        message="Bonjour Baobab Flight, je souhaite être accompagné pour choisir ma destination et construire mon itinéraire."
        eyebrow="Conseil personnalisé"
      />
    </main>
  );
}
