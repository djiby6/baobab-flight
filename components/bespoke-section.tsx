import Image from "next/image";
import { ArrowRight, CalendarDays, Check, Headset } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/site";

const benefits = [
  "Itinéraire 100 % personnalisé",
  "Vols, hôtels & transferts coordonnés",
  "Conseiller dédié avant & pendant le voyage",
  "Assistance WhatsApp 24h/24",
];

const steps = [
  {
    index: "01",
    title: "Racontez-nous votre rêve",
    description:
      "Un message, un appel : partagez vos envies, votre budget et vos dates.",
  },
  {
    index: "02",
    title: "Nous dessinons l'itinéraire",
    description:
      "Notre équipe compose la combinaison parfaite, vols et expériences inclus.",
  },
  {
    index: "03",
    title: "Vous n'avez plus qu'à décoller",
    description:
      "Tout est réservé, confirmé et suivi. Nous restons joignables à chaque étape.",
  },
];

const bespokeImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

export function BespokeSection() {
  return (
    <section id="sur-mesure" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-night text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-violet/25 blur-[130px]" />
            <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
          </div>

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-14 xl:p-16">
            <Reveal>
              <div>
                <Eyebrow light>Sur-mesure</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  Un voyage qui vous ressemble,{" "}
                  <span className="text-gradient-hero">de A à Z</span>.
                </h2>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
                  Une lune de miel aux Maldives, un safari photo au Kenya ou un
                  périple multi-destinations en Asie : nous concevons chaque
                  itinéraire comme une pièce unique, à votre rythme et selon vos
                  envies.
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-white/75"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                        <Check className="h-3 w-3" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappLink(
                      "Bonjour Baobab Flight, je souhaite construire un voyage sur-mesure.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Construire mon voyage
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    Parler à un conseiller
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative h-[340px] overflow-hidden rounded-[28px] ring-1 ring-white/15 sm:h-[420px] lg:h-[470px]">
                <Image
                  src={bespokeImage}
                  alt="Plage de sable blanc et eau turquoise"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night/80 via-night/10 to-transparent" />

                <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-night/40 px-3.5 py-2 text-[11px] font-medium text-white backdrop-blur-md">
                  <CalendarDays className="h-3.5 w-3.5 text-cyan" />
                  Itinéraire 12 jours
                </span>

                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-night/50 p-3.5 backdrop-blur-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan text-night">
                    <Headset className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      Votre conseiller dédié
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-white/55">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      En ligne · réponse en moins de 15 min
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="relative grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 lg:col-span-2">
              {steps.map((step) => (
                <div key={step.index}>
                  <span className="font-display text-sm font-semibold text-cyan">
                    {step.index}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
