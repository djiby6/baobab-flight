import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { continents } from "@/data/destinations";
import { legalLinks, navigation, site, whatsappLink } from "@/lib/site";

const socials = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-night text-white"
    >
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.45fr_0.85fr_0.85fr_1.35fr] lg:gap-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Baobab Flight — retour à l'accueil"
            >
              <Logo imageClassName="h-10 sm:h-11" />
            </Link>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan">
              {site.tagline}
            </p>
            <p className="mt-1.5 text-xs text-white/45">{site.subSlogan}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {site.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                {site.founder.role}
              </p>
              <p className="mt-1.5 font-display text-sm font-semibold text-white">
                {site.founder.name}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
                <MapPin className="h-3 w-3 text-cyan" />
                {site.locations}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-cyan/40 hover:bg-cyan hover:text-night"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition hover:text-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Destinations
            </h3>
            <ul className="mt-5 space-y-3">
              {continents.map((continent) => (
                <li key={continent.slug}>
                  <Link
                    href={`/destinations/${continent.slug}`}
                    className="text-sm text-white/60 transition hover:text-cyan"
                  >
                    {continent.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Nos bureaux
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {site.offices.map((office) => (
                <div
                  key={office.country}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan">
                    {office.country}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-white">
                    {office.city}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/45">
                    {office.label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-cyan" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 break-all transition hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-cyan" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-cyan" />
                {site.hours}
              </li>
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-brand-gradient px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Discuter sur WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="select-none overflow-hidden border-t border-white/10 pt-10">
          <p className="whitespace-nowrap font-display text-[17vw] font-semibold leading-[0.75] tracking-[-0.06em] text-white/[0.035]">
            Baobab Flight
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Baobab Flight — {site.tagline} Tous
            droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
