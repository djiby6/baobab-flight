import { Clock, Phone, Plane } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { site, whatsappLink } from "@/lib/site";

export function CtaSection() {
  return (
    <section id="devis" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-brand-gradient-deep px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 bottom-[-30%] h-80 w-80 rounded-full bg-cyan/20 blur-[110px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 top-10 h-48 w-48 rounded-full border border-white/10"
            />
            <Plane
              aria-hidden
              className="pointer-events-none absolute bottom-8 right-10 h-24 w-24 rotate-12 text-white/10 sm:h-32 sm:w-32"
            />

            <div className="relative max-w-2xl">
              <Eyebrow light>Votre prochaine escale</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Prêt à décoller ?
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
                Un message suffit. Dites-nous où vous rêvez d&apos;aller, nous
                nous occupons du reste : billets, itinéraire et accompagnement.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-night transition hover:bg-cyan"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Demander un devis WhatsApp
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>

              <p className="mt-6 flex items-center gap-2 text-xs text-white/70">
                <Clock className="h-3.5 w-3.5" />
                Réponse en moins de 15 minutes · 7j/7
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
