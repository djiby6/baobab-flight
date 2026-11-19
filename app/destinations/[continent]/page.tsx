import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Compass,
  MapPin,
  Plane,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Breadcrumbs } from "@/components/destinations/breadcrumbs";
import { CountryCard } from "@/components/destinations/country-card";
import { DestinationCta } from "@/components/destinations/destination-cta";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import {
  continents,
  continentWithPreposition,
  getContinent,
} from "@/data/destinations";
import { whatsappLink } from "@/lib/site";

type ContinentPageProps = {
  params: Promise<{ continent: string }>;
};

export function generateStaticParams() {
  return continents.map((continent) => ({ continent: continent.slug }));
}

export async function generateMetadata({
  params,
}: ContinentPageProps): Promise<Metadata> {
  const { continent: slug } = await params;
  const continent = getContinent(slug);

  if (!continent) return {};

  return {
    title: `${continent.name} — ${continent.title}`,
    description: `${continent.description} Découvrez nos pays phares ${continentWithPreposition(continent.name)}, les meilleures périodes pour partir et nos conseils clés.`,
    keywords: [
      continent.name,
      "voyage",
      "destinations",
      "Baobab Flight",
      ...continent.countries.map((country) => country.name),
    ],
    openGraph: {
      title: `${continent.name} — ${continent.title} | Baobab Flight`,
      description: continent.description,
      type: "website",
      locale: "fr_FR",
      siteName: "Baobab Flight",
      images: [{ url: continent.image, alt: continent.imageAlt }],
    },
  };
}

export default async function ContinentPage({ params }: ContinentPageProps) {
  const { continent: slug } = await params;
  const continent = getContinent(slug);

  if (!continent) notFound();

  const otherContinents = continents.filter(
    (item) => item.slug !== continent.slug,
  );

  return (
    <main id="contenu">
      <section className="relative overflow-hidden bg-night text-white">
        <Image
          src={continent.image}
          alt={continent.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-t from-night via-night/80 to-night/40" />
        <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-60" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
          <Breadcrumbs
            light
            items={[
              { label: "Accueil", href: "/" },
              { label: "Destinations", href: "/destinations" },
              { label: continent.name },
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <Eyebrow light>
              {continent.index} · {continent.name}
            </Eyebrow>
            <h1 className="mt-5 font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
              {continent.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {continent.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/60">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan" />
                {continent.countries.length} pays
              </span>
              <span className="inline-flex items-center gap-2">
                <Compass className="h-4 w-4 text-cyan" />
                {continent.destinations}
              </span>
              <span className="inline-flex items-center gap-2">
                <Plane className="h-4 w-4 text-cyan" />
                Tarif sur demande
              </span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(
                  `Bonjour Baobab Flight, je souhaite un itinéraire ${continentWithPreposition(continent.name)}.`,
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
                href="#pays"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <Plane className="h-4 w-4" />
                Voir les pays
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pays" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Tous les pays</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Où partir{" "}
                  <span className="text-gradient-brand">
                    {continentWithPreposition(continent.name)}
                  </span>{" "}
                  ?
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                Chaque fiche pays réunit l&apos;essentiel : aperçu, meilleures
                périodes, incontournables et conseils clés.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {continent.countries.map((country, index) => (
              <Reveal
                key={country.slug}
                delay={index * 60}
                className="h-full"
              >
                <CountryCard
                  continentSlug={continent.slug}
                  country={country}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Continuer l&apos;exploration</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-night sm:text-4xl">
                Les autres{" "}
                <span className="text-gradient-brand">continents</span>.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherContinents.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-night/10 bg-cream p-4 transition hover:border-violet/30 hover:bg-white"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet">
                    {item.index}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-night">
                    {item.name}
                  </p>
                  <p className="text-xs text-night/50">
                    {item.countries.length} pays
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-night/30 transition-transform group-hover:translate-x-1 group-hover:text-violet" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DestinationCta
        title={`Votre prochain voyage ${continentWithPreposition(continent.name)} commence ici.`}
        description="Dites-nous vos envies, vos dates et votre budget : nous construisons un itinéraire sur-mesure et vous accompagnons à chaque étape."
        message={`Bonjour Baobab Flight, je souhaite un itinéraire ${continentWithPreposition(continent.name)}.`}
        eyebrow="Sur-mesure"
      />
    </main>
  );
}
