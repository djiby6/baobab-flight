"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  Phone,
  Plane,
  Users,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { site, whatsappLink } from "@/lib/site";

type QuickBookingProps = {
  countryName: string;
  capital?: string;
  flightTime?: string;
  departureCity?: string;
};

const travelerOptions = ["1", "2", "3", "4", "5", "6", "7+"];
const priorityOptions = [
  "Au meilleur choix",
  "Vol direct",
  "Bagages inclus",
  "Horaires flexibles",
];

export function QuickBooking({
  countryName,
  capital,
  flightTime,
  departureCity = "Casablanca",
}: QuickBookingProps) {
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [priority, setPriority] = useState(priorityOptions[0]);
  const [project, setProject] = useState("");

  const href = useMemo(() => {
    const lines = [
      `Bonjour Baobab Flight, je souhaite un devis pour ${countryName}.`,
      capital ? `Vol ${departureCity} → ${capital}${flightTime ? ` · ${flightTime}` : ""}` : null,
      name.trim() ? `Nom : ${name.trim()}` : null,
      dates.trim() ? `Dates : ${dates.trim()}` : null,
      `Voyageurs : ${travelers}`,
      priority !== priorityOptions[0] ? `Priorité : ${priority}` : null,
      project.trim() ? `Projet : ${project.trim()}` : null,
      "Merci de me communiquer le tarif réel disponible pour ce projet.",
    ].filter(Boolean);

    return whatsappLink(lines.join("\n"));
  }, [capital, countryName, dates, departureCity, flightTime, name, priority, project, travelers]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-[28px] border border-white/20 bg-white p-6 text-night shadow-2xl shadow-night/30 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet">
            Réservation rapide
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
            Votre devis pour {countryName}
          </h3>
          <p className="mt-1.5 text-sm text-night/55">
            Tarif en temps réel sur demande · réponse en moins de 15 min.
          </p>
          {capital ? (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3 py-1.5 text-[11px] font-medium text-night/60">
              <Plane className="h-3.5 w-3.5 text-violet" />
              {departureCity} → {capital}
              {flightTime ? ` · ${flightTime}` : ""}
            </p>
          ) : null}
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C4A]">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-night/60">
            Votre nom
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex. Amina Diallo"
              autoComplete="name"
              className="mt-1.5 w-full rounded-xl border border-night/10 bg-cream px-3.5 py-2.5 text-sm font-normal text-night outline-none transition placeholder:text-night/30 focus:border-violet focus:ring-2 focus:ring-violet/20"
            />
          </label>
          <label className="block text-xs font-semibold text-night/60">
            Dates souhaitées
            <span className="relative mt-1.5 block">
              <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-night/35" />
              <input
                type="text"
                value={dates}
                onChange={(event) => setDates(event.target.value)}
                placeholder="Ex. 12 – 20 mars 2027"
                className="w-full rounded-xl border border-night/10 bg-cream py-2.5 pl-10 pr-3.5 text-sm font-normal text-night outline-none transition placeholder:text-night/30 focus:border-violet focus:ring-2 focus:ring-violet/20"
              />
            </span>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-night/60">
            Voyageurs
            <span className="relative mt-1.5 block">
              <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-night/35" />
              <select
                value={travelers}
                onChange={(event) => setTravelers(event.target.value)}
                className="w-full appearance-none rounded-xl border border-night/10 bg-cream py-2.5 pl-10 pr-9 text-sm font-normal text-night outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
              >
                {travelerOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} {option === "1" ? "voyageur" : "voyageurs"}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-night/35">
                ▾
              </span>
            </span>
          </label>
          <label className="block text-xs font-semibold text-night/60">
            Priorité
            <span className="relative mt-1.5 block">
              <Plane className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-night/35" />
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full appearance-none rounded-xl border border-night/10 bg-cream py-2.5 pl-10 pr-9 text-sm font-normal text-night outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-night/35">
                ▾
              </span>
            </span>
          </label>
        </div>

        <label className="block text-xs font-semibold text-night/60">
          Votre projet
          <textarea
            value={project}
            onChange={(event) => setProject(event.target.value)}
            rows={3}
            placeholder="Envie de plage, de safari, de villes... dites-nous tout."
            className="mt-1.5 w-full resize-none rounded-xl border border-night/10 bg-cream px-3.5 py-2.5 text-sm font-normal text-night outline-none transition placeholder:text-night/30 focus:border-violet focus:ring-2 focus:ring-violet/20"
          />
        </label>

        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition hover:brightness-110"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Envoyer sur WhatsApp
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-night/50">
        <a
          href={whatsappLink(
            `Bonjour Baobab Flight, je souhaite un devis pour ${countryName}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-[#128C4A] transition hover:text-[#0b6b38]"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Discuter directement
        </a>
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-1.5 transition hover:text-night"
        >
          <Phone className="h-3.5 w-3.5" />
          {site.phone}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-1.5 transition hover:text-night"
        >
          <Mail className="h-3.5 w-3.5" />
          {site.email}
        </a>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-night/40">
        Sans engagement · vos informations ne sont pas stockées sur le site.
      </p>
    </div>
  );
}
