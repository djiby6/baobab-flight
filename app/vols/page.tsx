import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { FlightSearch } from "@/components/flights/flight-search";
import { DestinationCta } from "@/components/destinations/destination-cta";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildAffiliateUrl } from "@/lib/affiliate";
import {
  defaultDepartureCode,
  departureAirports,
  departureLabel,
  getFlightConnections,
  getFeaturedFlightConnections,
} from "@/data/flights";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vols & liaisons — 195 destinations | Baobab Flight",
  description:
    "Trouvez votre vol depuis 195 aéroports, dont Casablanca, Dakar et Paris, vers 195 destinations : temps de vol, tarif en temps réel sur demande et devis WhatsApp avec Baobab Flight.",
  keywords: [
    "vols",
    "billets d'avion",
    "liaisons",
    "Casablanca",
    "Dakar",
    "Paris",
    "Baobab Flight",
  ],
  openGraph: {
    title: "Vols & liaisons | Baobab Flight",
    description:
      "195 destinations desservies, un devis vol en quelques minutes sur WhatsApp.",
    type: "website",
    locale: "fr_FR",
    siteName: "Baobab Flight",
  },
};

export default function FlightsPage() {
  const connections = getFlightConnections();
  const featured = getFeaturedFlightConnections(4);

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
            <Eyebrow light>Billets d&apos;avion & liaisons</Eyebrow>
            <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
              Votre prochain vol
              <span className="text-gradient-hero mt-1 block">commence ici.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {connections.length} destinations reliées depuis 195 aéroports,
              dont Mohammed V (CMN), Dakar (DSS) et Paris (CDG/ORY). Choisissez
              votre départ, comparez les temps de vol et envoyez votre demande à
              un conseiller Baobab Flight en un clic.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
              <a
                href={whatsappLink(
                  "Bonjour Baobab Flight, je souhaite un devis de billet d'avion. Pouvez-vous m'aider ?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Demander un devis vol
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={buildAffiliateUrl({ provider: "kiwi", subId: "vols-hero" })}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <Plane className="h-4 w-4" />
                Rechercher un vol sur Kiwi.com
              </a>
              <Link
                href="#liaisons"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                Explorer les liaisons
              </Link>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:mt-16 lg:grid-cols-4">
            {[
              {
                value: String(connections.length),
                label: "Destinations desservies",
              },
              { value: departureLabel, label: "Départ par défaut" },
              { value: "24/7", label: "Assistance WhatsApp" },
              { value: "15 min", label: "Réponse estimée" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
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

      <section id="liaisons" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Toutes les liaisons</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Recherchez votre{" "}
                  <span className="text-gradient-brand">destination</span>.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                Chaque liaison est issue de la fiche pays : capitale, durée de
                vol et tarif en temps réel sur demande. Aucune donnée manquante.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            <FlightSearch
              connections={connections}
              departures={departureAirports}
              defaultDepartureCode={defaultDepartureCode}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Départs populaires</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Les itinéraires les plus{" "}
                  <span className="text-gradient-brand">demandés</span>.
                </h2>
              </div>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet transition hover:gap-3"
              >
                Toutes les destinations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((connection) => (
              <Link
                key={`${connection.continentSlug}-${connection.countrySlug}`}
                href={connection.href}
                className="group rounded-2xl border border-night/10 bg-cream p-5 transition hover:border-violet/30 hover:bg-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet/10 text-violet">
                  <Plane className="h-4 w-4" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-night group-hover:text-violet">
                  {connection.arrivalCity}
                </p>
                <p className="mt-0.5 text-xs text-night/45">
                  {connection.countryName} · Tarif sur demande
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DestinationCta
        title="Une date, une escale, un budget ? On s'en occupe."
        description="Transmettez-nous votre projet : nos conseillers trouvent le meilleur vol au départ de Casablanca, Dakar ou Paris et construisent l'itinéraire autour."
        message="Bonjour Baobab Flight, je souhaite réserver un vol et construire mon itinéraire. Je suis à votre disposition pour les dates et le budget."
        eyebrow="Vol sur-mesure"
      />
    </main>
  );
}
