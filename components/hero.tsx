import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plane, Star } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { heroImages, whatsappLink } from "@/lib/site";

const stats = [
  { value: "120+", label: "Destinations desservies" },
  { value: "5 000+", label: "Voyageurs accompagnés" },
  { value: "24/7", label: "Assistance WhatsApp" },
  { value: "98 %", label: "Clients satisfaits" },
];

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-night text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-violet/25 blur-[150px]" />
        <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[130px]" />
        <div className="absolute inset-0 bg-hero-grid" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-night to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div className="max-w-2xl">
            <div
              className="animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              <Eyebrow light>Agence de voyage internationale</Eyebrow>
            </div>

            <h1
              className="mt-6 animate-fade-up font-display text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]"
              style={{ animationDelay: "160ms" }}
            >
              Votre prochain voyage
              <span className="text-gradient-hero mt-1 block">
                commence ici.
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/65 sm:text-lg"
              style={{ animationDelay: "240ms" }}
            >
              Envolez-vous vers le monde entier avec un accompagnement
              sur-mesure, des billets aux meilleurs tarifs et un suivi VIP.
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "320ms" }}
            >
              <Link
                href="/destinations"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
              >
                Explorer les destinations
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-night">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </span>
                Demander un devis WhatsApp
              </a>
            </div>

            <div
              className="mt-9 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/55"
              style={{ animationDelay: "400ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="flex text-cyan">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span className="text-white/75">4,9/5</span> · 320 avis vérifiés
              </span>
              <span className="hidden h-4 w-px bg-white/15 sm:block" />
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Conseillers en ligne maintenant
              </span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <HeroCollage />
          </div>
        </div>

        <div className="relative mt-12 lg:hidden">
          <div className="relative h-[340px] overflow-hidden rounded-[28px] ring-1 ring-white/15 sm:h-[400px]">
            <Image
              src={heroImages.main}
              alt="Bungalows sur pilotis aux Maldives"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-night/90 via-night/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan">
                  Coup de cœur
                </p>
                <p className="mt-1 font-display text-xl font-semibold">
                  Maldives
                </p>
                <p className="text-xs text-white/60">Océan Indien · 8 jours</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
                Tarif sur demande
              </span>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:mt-16 lg:mt-20 lg:grid-cols-4">
          {stats.map((stat) => (
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
  );
}

function HeroCollage() {
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[520px]">
      <div className="absolute right-0 top-8 h-[430px] w-[290px] rotate-[2.5deg] overflow-hidden rounded-[30px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/20">
        <Image
          src={heroImages.main}
          alt="Bungalows sur pilotis aux Maldives"
          fill
          priority
          sizes="(max-width: 1024px) 0px, 290px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-night/85 via-transparent to-night/10" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan">
            Coup de cœur
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold">Maldives</p>
          <p className="text-xs text-white/65">Océan Indien · 8 jours</p>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 h-[230px] w-[200px] -rotate-[4deg] overflow-hidden rounded-[26px] shadow-2xl ring-1 ring-white/15">
        <Image
          src={heroImages.secondary}
          alt="Dunes du désert près de Dubaï"
          fill
          sizes="200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-night/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[9px] uppercase tracking-[0.24em] text-cyan">
            Moyen-Orient
          </p>
          <p className="mt-1 font-display text-base font-semibold">Dubaï</p>
        </div>
      </div>

      <div className="absolute left-2 top-10 w-[236px] animate-float rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
          <span>Prochain départ</span>
          <Plane className="h-3.5 w-3.5 text-cyan" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-display text-lg font-semibold">CDG</p>
            <p className="text-[10px] text-white/45">Paris</p>
          </div>
          <div className="flex flex-1 flex-col items-center px-3">
            <span className="text-[10px] text-white/45">6h45</span>
            <span className="relative mt-1 h-px w-full bg-white/20">
              <span className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="mt-1 text-[10px] text-white/45">Direct</span>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-semibold">DXB</p>
            <p className="text-[10px] text-white/45">Dubaï</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[11px] text-white/50">Aller simple</span>
          <span className="text-sm font-semibold text-cyan">
            Tarif sur demande
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -right-3 bottom-16 flex h-24 w-24 items-center justify-center rounded-full border border-cyan/30 bg-night/70 backdrop-blur-md"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin-slow"
        >
          <defs>
            <path
              id="badge-circle"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text className="fill-cyan/80 text-[8px] uppercase tracking-[0.22em]">
            <textPath href="#badge-circle">
              Baobab Flight · Local Service ·
            </textPath>
          </text>
        </svg>
        <Plane className="h-6 w-6 -rotate-45 text-cyan" />
      </div>
    </div>
  );
}
