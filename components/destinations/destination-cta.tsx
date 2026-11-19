import { ArrowUpRight, Phone } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { site, whatsappLink } from "@/lib/site";

type DestinationCtaProps = {
  title: string;
  description: string;
  message: string;
  eyebrow?: string;
};

export function DestinationCta({
  title,
  description,
  message,
  eyebrow = "Un projet en tête ?",
}: DestinationCtaProps) {
  return (
    <section className="bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-brand-gradient-deep px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-[110px]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <Eyebrow light>{eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-night transition hover:bg-cyan"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Parler à un conseiller
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/15"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
