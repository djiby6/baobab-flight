import { FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/destinations/breadcrumbs";
import { DestinationCta } from "@/components/destinations/destination-cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalShell({
  eyebrow,
  title,
  intro,
  updatedAt,
  sections,
}: LegalShellProps) {
  return (
    <main id="contenu">
      <section className="relative overflow-hidden bg-night text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet/25 blur-[150px]" />
          <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[130px]" />
          <div className="absolute inset-0 bg-hero-grid" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-night to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
          <Breadcrumbs
            light
            items={[{ label: "Accueil", href: "/" }, { label: title }]}
          />

          <div className="mt-6 max-w-3xl">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.8rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {intro}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              <FileText className="h-3.5 w-3.5 text-cyan" />
              Dernière mise à jour : {updatedAt}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-night/40">
                Sommaire
              </p>
              <nav aria-label="Sommaire" className="mt-4">
                <ol className="space-y-1.5 border-l border-night/10">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-start gap-2.5 border-l-2 border-transparent -ml-px py-1.5 pl-4 text-sm text-night/55 transition hover:border-violet hover:text-night"
                      >
                        <span className="mt-px font-display text-xs font-semibold text-violet/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="max-w-3xl">
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <Reveal key={section.id}>
                    <article
                      id={section.id}
                      className="scroll-mt-28 border-t border-night/10 pt-8 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-sm font-semibold text-violet">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-night sm:text-[1.7rem]">
                          {section.heading}
                        </h2>
                      </div>

                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-4 text-[15px] leading-relaxed text-night/65"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {section.list && (
                        <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-night/65">
                          {section.list.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                ))}
              </div>

              <p className="mt-12 rounded-[24px] border border-night/10 bg-white p-5 text-sm leading-relaxed text-night/55 sm:p-6">
                Ce document est fourni à titre informatif et peut évoluer. Pour
                toute question relative à ces informations, écrivez-nous à{" "}
                <a
                  href="mailto:marketingdj12@gmail.com"
                  className="font-semibold text-violet transition hover:text-violet-dark"
                >
                  marketingdj12@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <DestinationCta
        title="Une question sur nos conditions ?"
        description="Notre équipe vous répond en moins de 15 minutes sur WhatsApp et vous accompagne dans toutes vos démarches, du devis au retour."
        message="Bonjour Baobab Flight, j'ai une question concernant vos conditions et informations légales."
        eyebrow="Besoin d'une précision ?"
      />
    </main>
  );
}
