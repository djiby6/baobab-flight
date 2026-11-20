import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  Car,
  Check,
  CloudRain,
  CloudSun,
  Compass,
  Languages,
  Mail,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Stamp,
  Sun,
  Ticket,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ExperienceMedia } from "@/components/experience-media";
import { SafeImage } from "@/components/ui/safe-image";
import { Breadcrumbs } from "@/components/destinations/breadcrumbs";
import { CountryCard } from "@/components/destinations/country-card";
import { QuickBooking } from "@/components/destinations/quick-booking";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import {
  continents,
  continentWithPreposition,
  countryWithPreposition,
  getCountry,
  getRelatedCountries,
  type BestPeriodTone,
} from "@/data/destinations";
import { departureCity, getFlightConnection } from "@/data/flights";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { cn } from "@/lib/cn";
import { site, whatsappLink } from "@/lib/site";

type CountryPageProps = {
  params: Promise<{ continent: string; country: string }>;
};

const periodStyles: Record<
  BestPeriodTone,
  { card: string; badge: string; icon: LucideIcon }
> = {
  ideal: {
    card: "border-cyan/30 bg-cyan-soft/60",
    badge: "bg-cyan text-night",
    icon: Sun,
  },
  shoulder: {
    card: "border-violet/20 bg-violet/5",
    badge: "bg-violet text-white",
    icon: CloudSun,
  },
  avoid: {
    card: "border-night/10 bg-night/5",
    badge: "bg-night/70 text-white",
    icon: CloudRain,
  },
};

export function generateStaticParams() {
  return continents.flatMap((continent) =>
    continent.countries.map((country) => ({
      continent: continent.slug,
      country: country.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { continent: continentSlug, country: countrySlug } = await params;
  const data = getCountry(continentSlug, countrySlug);

  if (!data) return {};

  const { continent, country } = data;

  return {
    title: `${country.name} â€” ${country.tagline}`,
    description: country.description,
    keywords: [
      country.name,
      continent.name,
      "voyage",
      "sÃ©jour",
      "Baobab Flight",
      ...country.experiences.map((experience) => experience.title),
    ],
    openGraph: {
      title: `${country.name} â€” ${country.tagline} | Baobab Flight`,
      description: country.description,
      type: "website",
      locale: "fr_FR",
      siteName: "Baobab Flight",
      images: [{ url: country.image, alt: country.imageAlt }],
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { continent: continentSlug, country: countrySlug } = await params;
  const data = getCountry(continentSlug, countrySlug);

  if (!data) notFound();

  const { continent, country } = data;
  const flight = getFlightConnection(country, continent);
  const related = getRelatedCountries(continent.slug, country.slug, 3);
  const idealPeriod =
    country.bestPeriods.find((period) => period.tone === "ideal") ??
    country.bestPeriods[0];

  const countryLabel = countryWithPreposition(country.name);
  const reserveLink = whatsappLink(
    `Bonjour Baobab Flight, je souhaite un devis pour un voyage ${countryLabel}.`,
  );
  const adviceLink = whatsappLink(
    `Bonjour Baobab Flight, je souhaite Ãªtre conseillÃ© pour un voyage ${countryLabel}.`,
  );

  const facts = [
    { label: "Vol", value: `${departureCity} â†’ ${flight.arrivalCity}`, icon: Plane },
    { label: "Capitale", value: country.capital, icon: MapPin },
    { label: "Monnaie", value: country.currency, icon: Banknote },
    { label: "Langue", value: country.language, icon: Languages },
    { label: "PÃ©riode idÃ©ale", value: idealPeriod.months, icon: CalendarDays },
    { label: "Temps de vol", value: country.flightTime, icon: Plane },
    { label: "Visa", value: country.visa, icon: Stamp },
  ];

  return (
    <main id="contenu">
      {/* Hero immersif */}
      <section className="relative overflow-hidden bg-night text-white">
        <div aria-hidden className="absolute inset-0">
          <SafeImage
            src={country.image}
            fallbackSrc={country.fallbackImage}
            alt={country.imageAlt}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-linear-to-t from-night via-night/85 to-night/35" />
          <div className="absolute inset-0 bg-hero-grid opacity-50" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet/20 blur-[130px]" />
          <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
          <Breadcrumbs
            light
            items={[
              { label: "Accueil", href: "/" },
              { label: "Destinations", href: "/destinations" },
              {
                label: continent.name,
                href: `/destinations/${continent.slug}`,
              },
              { label: country.name },
            ]}
          />

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-14">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                  <Compass className="h-3 w-3 text-cyan" />
                  {continent.name}
                </span>
                <span className="inline-flex max-w-full items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 backdrop-blur">
                  <span className="truncate">{country.tagline}</span>
                </span>
              </div>

              <h1 className="mt-5 break-words font-display text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]">
                {country.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                {country.description}
              </p>

              <dl className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-white/70">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="inline-flex max-w-full items-start gap-2"
                  >
                    <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="font-medium text-white/80">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/vols"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan transition hover:text-white"
              >
                <Plane className="h-3.5 w-3.5" />
                Toutes les liaisons au dÃ©part de {departureCity}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={reserveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  RÃ©server sur WhatsApp
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={buildAffiliateUrl({
                    provider: "kiwi",
                    destination: flight.arrivalCity,
                    country: country.name,
                    origin: departureCity,
                    subId: `${country.slug}-vol`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                >
                  <Plane className="h-4 w-4" />
                  Rechercher un vol
                </a>
                <Link
                  href="#experiences"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                >
                  <Sparkles className="h-4 w-4 text-cyan" />
                  Voir les incontournables
                </Link>
              </div>
            </div>

            <div className="group block w-full overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md lg:justify-self-end">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/25 blur-3xl"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-violet/40">
                  <Sparkles className="relative h-4 w-4" />
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Ambiance
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="relative mt-5 font-display text-xl font-semibold leading-tight text-white">
                {country.name} en images
              </p>
              <p className="relative mt-1.5 text-xs leading-relaxed text-white/55">
                Une premiÃ¨re immersion visuelle pour dÃ©couvrir l&apos;atmosphÃ¨re
                du pays avant mÃªme de boucler votre valise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Essence du pays + pourquoi Baobab Flight */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <Reveal>
              <div>
                <Eyebrow>L&apos;essence du pays</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Un voyage au cÅ“ur de{" "}
                  <span className="text-gradient-brand">{country.name}</span>.
                </h2>

                <p className="mt-7 text-pretty font-display text-xl leading-[1.6] text-night/75 sm:text-2xl sm:leading-[1.55]">
                  {country.immersive}
                </p>

                <div className="mt-8 rounded-[24px] border border-violet/15 bg-white p-5 shadow-sm shadow-night/5 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet">
                    Le conseil Baobab Flight
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-night/65">
                    {country.tips[0]}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-[32px] bg-night p-7 text-white shadow-2xl shadow-night/20 sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/25 blur-[90px]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-cyan/10 blur-[90px]"
                />

                <div className="relative">
                  <Eyebrow light>Pourquoi partir avec Baobab Flight</Eyebrow>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                    Votre voyage {countryLabel}, orchestrÃ© de A Ã  Z.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    {country.whyGo}
                  </p>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                        <Plane className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <strong className="font-semibold text-white">
                          Vols optimisÃ©s.
                        </strong>{" "}
                        Tarifs nÃ©gociÃ©s, correspondances intelligentes et
                        itinÃ©raire sur-mesure.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <strong className="font-semibold text-white">
                          Expertise locale.
                        </strong>{" "}
                        Adresses vÃ©rifiÃ©es, guides francophones et expÃ©riences
                        confidentielles.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20 text-[#4ade80]">
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <strong className="font-semibold text-white">
                          Conciergerie WhatsApp 24/7.
                        </strong>{" "}
                        Un conseiller dÃ©diÃ©, du premier message au dernier
                        transfert.
                      </span>
                    </li>
                  </ul>

                  <a
                    href={adviceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-night transition hover:bg-cyan hover:text-night"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Parler Ã  un conseiller
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quand partir */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Quand partir ?</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Les meilleures{" "}
                  <span className="text-gradient-brand">pÃ©riodes</span>.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                MÃ©tÃ©o, affluence et budget : nos repÃ¨res pour choisir le bon
                moment pour partir {countryLabel}.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {country.bestPeriods.map((period, index) => {
              const styles = periodStyles[period.tone];
              const Icon = styles.icon;

              return (
                <Reveal
                  key={period.label}
                  delay={index * 80}
                  className="h-full"
                >
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-[28px] border p-6",
                      styles.card,
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
                        styles.badge,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {period.label}
                    </span>
                    <p className="mt-5 font-display text-2xl font-semibold text-night">
                      {period.months}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-night/55">
                      {period.note}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-night/45">
            Ces repÃ¨res sont indicatifs : la mÃ©tÃ©o et les conditions varient
            selon les rÃ©gions et les annÃ©es. Nous affinons les dates avec vous.
          </p>
        </div>
      </section>

      {/* ExpÃ©riences incontournables */}
      <section id="experiences" className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Ã€ ne pas manquer</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                  Trois expÃ©riences{" "}
                  <span className="text-gradient-brand">signatures</span>.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-night/55">
                Les incontournables qui donnent Ã  votre voyage sa saveur unique,
                Ã  intÃ©grer dans votre itinÃ©raire.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {country.experiences.map((experience, index) => (
              <Reveal
                key={experience.title}
                delay={index * 80}
                className="h-full"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-night/10 bg-white transition hover:border-violet/30 hover:shadow-xl hover:shadow-night/5">
                  <div className="relative h-48 overflow-hidden bg-night sm:h-56">
                    <ExperienceMedia
                      image={experience.image}
                      imageAlt={experience.imageAlt}
                      videoUrl={experience.videoUrl}
                      poster={experience.poster}
                      fallbackImage={country.image}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-night/75 via-night/10 to-transparent"
                    />
                    <span className="absolute bottom-4 left-5 font-display text-5xl font-semibold text-white/85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-night/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                      Ã‰tape {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-violet/25">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet">
                        Incontournable
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-night">
                      {experience.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-night/55">
                      {experience.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-night/10 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-soft text-violet">
                  <Compass className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-night">
                    Envie d&apos;un itinéraire qui relie ces expériences ?
                  </p>
                  <p className="mt-1 text-sm text-night/55">
                    Nous construisons le fil rouge de votre voyage{" "}
                    {countryLabel}, selon vos dates et votre budget.
                  </p>
                </div>
              </div>
              <a
                href={adviceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition hover:brightness-110"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Créer mon itinéraire
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-4 rounded-[24px] border border-night/10 bg-white p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet">
                Préparer votre arrivée
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-night">
                Services complémentaires du voyageur
              </h3>
              <p className="mt-1 text-sm text-night/55">
                Anticipez l&apos;essentiel pour profiter de {country.name} dès
                votre arrivée.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="flex flex-col rounded-2xl border border-night/10 bg-cream p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10 text-violet">
                    <Wifi className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-display text-base font-semibold text-night">
                    eSIM internationale
                  </p>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-night/55">
                    Restez connecté dès l&apos;atterrissage avec Airalo.
                  </p>
                  <a
                    href={buildAffiliateUrl({
                      provider: "airalo",
                      country: country.name,
                      subId: `${country.slug}-esim`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-night/15 bg-white px-4 py-2.5 text-xs font-semibold text-night transition hover:border-violet/40 hover:text-violet"
                  >
                    Acheter une eSIM
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="flex flex-col rounded-2xl border border-night/10 bg-cream p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10 text-violet">
                    <Car className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-display text-base font-semibold text-night">
                    Transfert aéroport
                  </p>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-night/55">
                    Un chauffeur vous attend à l&apos;arrivée avec Welcome Pickups.
                  </p>
                  <a
                    href={buildAffiliateUrl({
                      provider: "welcomepickups",
                      country: country.name,
                      subId: `${country.slug}-transfer`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-night/15 bg-white px-4 py-2.5 text-xs font-semibold text-night transition hover:border-violet/40 hover:text-violet"
                  >
                    Réserver un transfert
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="flex flex-col rounded-2xl border border-night/10 bg-cream p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10 text-violet">
                    <Ticket className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-display text-base font-semibold text-night">
                    Activités & billets sur place
                  </p>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-night/55">
                    Réservez vos visites et attractions avec Tiqets.
                  </p>
                  <a
                    href={buildAffiliateUrl({
                      provider: "tiqets",
                      country: country.name,
                      subId: `${country.slug}-activities`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-night/15 bg-white px-4 py-2.5 text-xs font-semibold text-night transition hover:border-violet/40 hover:text-violet"
                  >
                    Activités & billets
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Conseils + rÃ©servation rapide */}
      <section className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet/20 blur-[130px]" />
          <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-cyan/10 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-start lg:gap-14">
            <Reveal>
              <div>
                <Eyebrow light>Conseils clÃ©s</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  Voyagez l&apos;esprit{" "}
                  <span className="text-gradient-hero">tranquille</span>.
                </h2>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
                  Nos conseils pour prÃ©parer votre sÃ©jour {countryLabel} et
                  profiter pleinement de chaque Ã©tape.
                </p>

                <ul className="mt-8 space-y-4">
                  {country.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-1.5 transition hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-1.5 transition hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {site.email}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <QuickBooking
                countryName={country.name}
                capital={flight.arrivalCity}
                flightTime={flight.flightTime}
                departureCity={departureCity}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <Eyebrow>Continuer l&apos;exploration</Eyebrow>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-5xl">
                    Autres pays{" "}
                    <span className="text-gradient-brand">
                      {continentWithPreposition(continent.name)}
                    </span>
                    .
                  </h2>
                </div>
                <Link
                  href={`/destinations/${continent.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-night transition hover:text-violet"
                >
                  Voir tout le continent
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 60} className="h-full">
                  <CountryCard
                    continentSlug={continent.slug}
                    country={item}
                    className="h-full"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
