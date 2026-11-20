"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Hotel,
  Luggage,
  MapPin,
  Minus,
  Plane,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { cn } from "@/lib/cn";
import {
  generateAvailableFlights,
  type AvailableFlight,
} from "@/lib/flight-availability";
import {
  flightRequestLink,
  matchesAirportOption,
  type FlightSelection,
  type FlightTripType,
} from "@/lib/flight-request";
import type { DepartureAirport, FlightConnection } from "@/data/flights";

const PAGE_SIZE = 24;
const CABIN_CLASSES = ["Économie", "Premium", "Affaires", "Première"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const FALLBACK_DEPARTURE: DepartureAirport = {
  code: "CMN",
  city: "Casablanca",
  airportName: "Mohammed V",
  label: "Casablanca — Maroc (CMN)",
  country: "Maroc",
  countrySlug: "maroc",
  continentSlug: "afrique",
  continentName: "Afrique",
  aliases: ["Casablanca", "Maroc", "CMN", "Mohammed V", "Mohammed V (CMN)"],
  rank: 0,
};

function quickLabel(airport: DepartureAirport): string {
  if (airport.code === "CMN") return "Mohammed V (CMN)";
  if (airport.code === "DSS") return "Dakar (DSS)";
  if (airport.code === "CDG") return "Paris (CDG/ORY)";
  return airport.label;
}

function shortLabel(airport: DepartureAirport): string {
  return `${airport.city} (${airport.code})`;
}

function toDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatShortDate(value: string): string {
  const date = toDate(value);
  if (!date) return "Ajouter une date";
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatLongDate(value: string): string {
  const date = toDate(value);
  if (!date) return "";
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function AirportCombobox({
  id,
  label,
  hint,
  placeholder,
  options,
  value,
  selectedCode,
  onChange,
  onSelect,
  quickOptions,
}: {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  options: DepartureAirport[];
  value: string;
  selectedCode?: string;
  onChange: (value: string) => void;
  onSelect: (airport: DepartureAirport) => void;
  quickOptions: DepartureAirport[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const filtered = useMemo(
    () => options.filter((option) => matchesAirportOption(option, value)),
    [options, value],
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-night/55"
        >
          {label}
        </label>
        <span className="text-[11px] text-night/40">{hint}</span>
      </div>
      <div ref={containerRef} className="relative mt-2">
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet" />
          <input
            id={id}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            value={value}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              onChange(event.target.value);
              setOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-night/10 bg-cream py-3.5 pl-11 pr-11 text-sm text-night outline-none transition placeholder:text-night/35 focus:border-violet focus:ring-2 focus:ring-violet/20"
          />
          <button
            type="button"
            aria-label={`Ouvrir la liste ${label}`}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-night/45 transition hover:bg-violet/10 hover:text-violet"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            />
          </button>
        </div>

        {open ? (
          <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-night/10 bg-white p-2 shadow-2xl">
            <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-night/40">
              {filtered.length} {filtered.length === 1 ? "résultat" : "résultats"} ·
              pays, capitales et aéroports
            </p>
            {filtered.length ? (
              filtered.map((option) => (
                <button
                  key={`${option.countrySlug}-${option.code}`}
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-violet/5"
                >
                  <span>
                    <span className="block text-sm font-semibold text-night">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-night/40">
                      {option.continentName} · {option.airportName}
                    </span>
                  </span>
                  {selectedCode === option.code ? (
                    <Check className="h-4 w-4 shrink-0 text-violet" />
                  ) : null}
                </button>
              ))
            ) : (
              <p className="px-3 py-4 text-sm text-night/45">Aucun résultat.</p>
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {quickOptions.map((option) => (
          <button
            key={`quick-${id}-${option.countrySlug}`}
            type="button"
            onClick={() => {
              onSelect(option);
              setOpen(false);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[11px] font-semibold transition",
              selectedCode === option.code
                ? "border-violet/40 bg-violet/10 text-violet"
                : "border-night/10 bg-cream text-night/55 hover:border-violet/30 hover:text-violet",
            )}
          >
            {quickLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

function FlightCalendar({
  tripType,
  departureDate,
  returnDate,
  onDepartureChange,
  onReturnChange,
}: {
  tripType: FlightTripType;
  departureDate: string;
  returnDate: string;
  onDepartureChange: (value: string) => void;
  onReturnChange: (value: string) => void;
}) {
  const today = startOfToday();
  const [activeField, setActiveField] = useState<
    "departure" | "return" | null
  >(null);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveField(null);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const departure = toDate(departureDate);
  const returnDay = toDate(returnDate);
  const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth() + 1,
    0,
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const canGoPrevious =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  function changeMonth(delta: number) {
    setViewMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + delta, 1),
    );
  }

  function selectDay(day: number) {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    if (date < today) return;
    const key = toKey(date);

    if (activeField === "return") {
      if (departureDate && key < departureDate) {
        onDepartureChange(key);
        return;
      }
      onReturnChange(key);
      setActiveField(null);
      return;
    }

    onDepartureChange(key);
    if (tripType === "round-trip") {
      if (returnDate && returnDate < key) onReturnChange("");
      setActiveField("return");
    } else {
      setActiveField(null);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          "grid gap-2",
          tripType === "round-trip" ? "sm:grid-cols-2" : "sm:grid-cols-1",
        )}
      >
        <button
          type="button"
          onClick={() => setActiveField("departure")}
          className={cn(
            "rounded-2xl border bg-cream px-4 py-3 text-left transition",
            activeField === "departure"
              ? "border-violet/40 ring-2 ring-violet/15"
              : "border-night/10 hover:border-violet/30",
          )}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-night/55">
            Départ
          </span>
          <span
            className={cn(
              "mt-1 flex items-center gap-2 text-sm font-medium",
              departureDate ? "text-night" : "text-night/35",
            )}
          >
            <CalendarDays className="h-4 w-4 text-violet" />
            {departureDate ? formatShortDate(departureDate) : "Ajouter une date"}
          </span>
        </button>
        {tripType === "round-trip" ? (
          <button
            type="button"
            onClick={() => setActiveField(departureDate ? "return" : "departure")}
            className={cn(
              "rounded-2xl border bg-cream px-4 py-3 text-left transition",
              activeField === "return"
                ? "border-violet/40 ring-2 ring-violet/15"
                : "border-night/10 hover:border-violet/30",
            )}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-night/55">
              Retour
            </span>
            <span
              className={cn(
                "mt-1 flex items-center gap-2 text-sm font-medium",
                returnDate ? "text-night" : "text-night/35",
              )}
            >
              <CalendarDays className="h-4 w-4 text-violet" />
              {returnDate ? formatShortDate(returnDate) : "Ajouter une date"}
            </span>
          </button>
        ) : null}
      </div>

      {activeField ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 w-full min-w-[19rem] rounded-2xl border border-night/10 bg-white p-4 shadow-2xl sm:w-auto sm:min-w-[21rem]">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Mois précédent"
              disabled={!canGoPrevious}
              onClick={() => changeMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-night/10 text-night transition hover:border-violet/40 hover:text-violet disabled:opacity-25"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="font-display text-base font-semibold text-night">
              {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
            </p>
            <button
              type="button"
              aria-label="Mois suivant"
              onClick={() => changeMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-night/10 text-night transition hover:border-violet/40 hover:text-violet"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-night/35"
              >
                {day}
              </span>
            ))}
            {Array.from({ length: offset }, (_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {days.map((day) => {
              const date = new Date(
                viewMonth.getFullYear(),
                viewMonth.getMonth(),
                day,
              );
              const key = toKey(date);
              const isPast = date < today;
              const isStart = key === departureDate;
              const isEnd = key === returnDate;
              const inRange =
                Boolean(departure && returnDay) &&
                date > departure! &&
                date < returnDay!;

              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`${day} ${MONTHS[viewMonth.getMonth()]}`}
                  disabled={isPast}
                  onClick={() => selectDay(day)}
                  className={cn(
                    "h-9 rounded-xl text-sm font-medium transition",
                    isPast && "cursor-not-allowed text-night/20",
                    !isPast && !isStart && !isEnd && !inRange && "text-night/70 hover:bg-violet/10 hover:text-violet",
                    inRange && "bg-violet/10 text-violet",
                    (isStart || isEnd) && "bg-violet text-white",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center text-[11px] text-night/40">
            {activeField === "return"
              ? "Choisissez la date de retour"
              : "Choisissez la date de départ"}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function OptionToggle({
  label,
  checked,
  onChange,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  icon: ReactNode;
}) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition",
        checked
          ? "border-violet/40 bg-violet/10 text-violet"
          : "border-night/10 bg-cream text-night/60 hover:border-night/20",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      {icon}
      {label}
      {checked ? <Check className="h-3 w-3" /> : null}
    </label>
  );
}

type FlightSearchProps = {
  connections: FlightConnection[];
  departures: DepartureAirport[];
  defaultDepartureCode?: string;
};

export function FlightSearch({
  connections,
  departures,
  defaultDepartureCode = "CMN",
}: FlightSearchProps) {
  const fallbackDeparture =
    departures.find((airport) => airport.code === defaultDepartureCode) ??
    departures[0] ??
    FALLBACK_DEPARTURE;
  const resolvedDefaultCode = fallbackDeparture.code;

  const [tripType, setTripType] = useState<FlightTripType>("round-trip");
  const [departureCode, setDepartureCode] = useState(resolvedDefaultCode);
  const [fromQuery, setFromQuery] = useState(quickLabel(fallbackDeparture));
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedDestination, setSelectedDestination] =
    useState<DepartureAirport | null>(null);
  const [continent, setContinent] = useState("all");
  const [baggage, setBaggage] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [nearbyAirports, setNearbyAirports] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Économie");
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const departure = useMemo(
    () =>
      departures.find((airport) => airport.code === departureCode) ??
      fallbackDeparture,
    [departureCode, departures, fallbackDeparture],
  );
  const isDefaultDeparture = departure.code === resolvedDefaultCode;

  const quickDepartureOptions = useMemo(
    () =>
      ["CMN", "DSS", "CDG"]
        .map((code) => departures.find((airport) => airport.code === code))
        .filter((airport): airport is DepartureAirport => Boolean(airport)),
    [departures],
  );

  const quickDestinationOptions = useMemo(
    () =>
      connections
        .slice(0, 6)
        .map((connection) =>
          departures.find(
            (airport) => airport.countrySlug === connection.countrySlug,
          ),
        )
        .filter((airport): airport is DepartureAirport => Boolean(airport)),
    [connections, departures],
  );

  const continents = useMemo(
    () =>
      Array.from(
        new Map(
          connections.map((connection) => [
            connection.continentSlug,
            connection.continentName,
          ]),
        ).entries(),
      ).sort((a, b) => a[1].localeCompare(b[1], "fr")),
    [connections],
  );

  const results = useMemo(() => {
    const needle = destinationQuery.trim().toLocaleLowerCase("fr");
    return connections.filter((connection) => {
      if (continent !== "all" && connection.continentSlug !== continent) {
        return false;
      }
      if (
        selectedDestination &&
        connection.countrySlug !== selectedDestination.countrySlug
      ) {
        return false;
      }
      if (directOnly && !connection.direct) return false;
      if (baggage && !connection.baggageIncluded) return false;
      if (!needle) return true;
      return [
        connection.countryName,
        connection.arrivalCity,
        connection.arrivalAirportCode ?? "",
        connection.continentName,
        connection.countrySlug,
      ].some((value) => value.toLocaleLowerCase("fr").includes(needle));
    });
  }, [
    baggage,
    connections,
    continent,
    destinationQuery,
    directOnly,
    selectedDestination,
  ]);

  const routeConnection = selectedDestination
    ? results.find((item) => item.countrySlug === selectedDestination.countrySlug) ?? null
    : destinationQuery.trim()
      ? results[0] ?? null
      : null;

  const arrivalCode =
    selectedDestination?.code ?? routeConnection?.arrivalAirportCode ?? "—";

  const availableFlights: AvailableFlight[] =
    routeConnection && departureDate
      ? generateAvailableFlights(
          routeConnection,
          departure.code,
          arrivalCode,
          { baggage },
        )
      : [];

  const activeFilters = [
    tripType === "one-way" ? "Aller simple" : "Aller-retour",
    `Départ : ${quickLabel(departure)}`,
    selectedDestination
      ? `Vers : ${quickLabel(selectedDestination)}`
      : destinationQuery
        ? `Vers : ${destinationQuery}`
        : null,
    `${travelers} Adulte${travelers > 1 ? "s" : ""}, ${cabinClass}`,
    departureDate ? `Départ le ${formatShortDate(departureDate)}` : null,
    tripType === "round-trip" && returnDate ? `Retour le ${formatShortDate(returnDate)}` : null,
    baggage ? "Bagages" : null,
    directOnly ? "Vols directs" : null,
    nearbyAirports ? "Aéroports à proximité" : null,
    accommodation ? "Hébergement" : null,
    continent !== "all"
      ? continents.find(([slug]) => slug === continent)?.[1] ?? continent
      : null,
  ].filter((value): value is string => Boolean(value));

  function resetVisible() {
    setVisible(PAGE_SIZE);
  }

  function selectDeparture(airport: DepartureAirport) {
    setDepartureCode(airport.code);
    setFromQuery(quickLabel(airport));
    resetVisible();
  }

  function updateFromQuery(value: string) {
    setFromQuery(value);
    const needle = value.trim().toLocaleLowerCase("fr");
    const exact = departures.find((airport) =>
      [airport.code, airport.city, airport.label, airport.airportName, quickLabel(airport)]
        .map((item) => item.toLocaleLowerCase("fr"))
        .includes(needle),
    );
    if (exact) {
      setDepartureCode(exact.code);
    } else {
      const matches = departures.filter((airport) =>
        matchesAirportOption(airport, value),
      );
      if (matches.length === 1) setDepartureCode(matches[0].code);
    }
    resetVisible();
  }

  function selectDestination(airport: DepartureAirport) {
    setSelectedDestination(airport);
    setDestinationQuery(airport.city);
    resetVisible();
  }

  function handleSearch() {
    document
      .getElementById("resultats")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function arrivalLabelFor(connection: FlightConnection): string {
    if (selectedDestination?.countrySlug === connection.countrySlug) {
      return selectedDestination.label;
    }
    return `${connection.arrivalCity} — ${connection.countryName} (${connection.arrivalAirportCode ?? ""})`.replace(
      /\s*\(\)$/,
      "",
    );
  }

  function requestInput(
    connection: FlightConnection,
    flight?: FlightSelection,
  ) {
    return {
      departureLabel: quickLabel(departure),
      arrivalCity: connection.arrivalCity,
      arrivalLabel: arrivalLabelFor(connection),
      countryName: connection.countryName,
      flightTime: connection.flightTime,
      tripType,
      baggage,
      directOnly,
      nearbyAirports,
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : undefined,
      travelers,
      cabinClass,
      accommodation,
      flight,
    };
  }

  function partnerUrlFor(connection: FlightConnection): string | null {
    const url = buildAffiliateUrl({
      provider: "kiwi",
      affiliateUrl: connection.affiliateUrl,
      destination: connection.arrivalCity,
      country: connection.countryName,
      origin: departure.city,
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : undefined,
      passengers: travelers,
      subId: [departure.code, connection.arrivalAirportCode ?? connection.countrySlug]
        .filter(Boolean)
        .join("-"),
    });
    return url === "/vols" ? null : url;
  }

  return (
    <div id="resultats" className="scroll-mt-24">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-night sm:text-4xl">
            Des millions de vols pas chers. Une simple recherche.
          </h2>
          <p className="mt-2 text-sm text-night/50">
            {connections.length} destinations, {departures.length} aéroports
            sélectionnables et une demande de devis en un clic.
          </p>
        </div>
        <div
          className="inline-flex shrink-0 rounded-full border border-night/10 bg-cream p-1"
          role="group"
          aria-label="Type de trajet"
        >
          {(
            [
              ["round-trip", "Aller-retour"],
              ["one-way", "Aller simple"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={tripType === value}
              onClick={() => {
                setTripType(value);
                if (value === "one-way") setReturnDate("");
                resetVisible();
              }}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition",
                tripType === value
                  ? "bg-night text-white shadow-sm"
                  : "text-night/55 hover:text-night",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-night/10 bg-white p-4 shadow-xl shadow-night/5 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <AirportCombobox
            id="flight-from"
            label="De"
            hint="Pays, capitale ou aéroport"
            placeholder="Saisissez votre ville de départ, ou sélectionnez l'une des options ci-dessous"
            options={departures}
            value={fromQuery}
            selectedCode={departure.code}
            onChange={updateFromQuery}
            onSelect={selectDeparture}
            quickOptions={quickDepartureOptions}
          />
          <AirportCombobox
            id="flight-to"
            label="Vers"
            hint="Pays, ville ou aéroport"
            placeholder="Saisissez votre destination ou choisissez parmi les options ci-dessous"
            options={departures}
            value={destinationQuery}
            selectedCode={selectedDestination?.code}
            onChange={(value) => {
              setSelectedDestination(null);
              setDestinationQuery(value);
              resetVisible();
            }}
            onSelect={selectDestination}
            quickOptions={quickDestinationOptions}
          />
        </div>

        <div
          className={cn(
            "mt-4 grid gap-3 sm:grid-cols-2",
            tripType === "round-trip" ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          <FlightCalendar
            tripType={tripType}
            departureDate={departureDate}
            returnDate={returnDate}
            onDepartureChange={(value) => {
              setDepartureDate(value);
              resetVisible();
            }}
            onReturnChange={(value) => {
              setReturnDate(value);
              resetVisible();
            }}
          />
          <div>
            <label
              htmlFor="flight-continent"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-night/55"
            >
              Continent
            </label>
            <div className="relative mt-2">
              <select
                id="flight-continent"
                value={continent}
                onChange={(event) => {
                  setContinent(event.target.value);
                  resetVisible();
                }}
                className="w-full appearance-none rounded-2xl border border-night/10 bg-cream py-3.5 pl-4 pr-10 text-sm font-medium text-night outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
              >
                <option value="all">Tous les continents</option>
                {continents.map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-night/35" />
            </div>
          </div>
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-night/55">
              Voyageurs et classe
            </span>
            <button
              type="button"
              onClick={() => setTravelersOpen((current) => !current)}
              className="mt-2 flex w-full items-center justify-between rounded-2xl border border-night/10 bg-cream py-3.5 pl-4 pr-4 text-sm font-medium text-night outline-none transition hover:border-violet/30 focus:border-violet focus:ring-2 focus:ring-violet/20"
            >
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-violet" />
                {travelers} Adulte{travelers > 1 ? "s" : ""}, {cabinClass}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-night/35 transition-transform",
                  travelersOpen && "rotate-180",
                )}
              />
            </button>
            {travelersOpen ? (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-night/10 bg-white p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-night">Adultes</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Retirer un adulte"
                      disabled={travelers <= 1}
                      onClick={() =>
                        setTravelers((current) => Math.max(1, current - 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-night/10 text-night transition hover:border-violet/40 hover:text-violet disabled:opacity-30"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center font-semibold text-night">
                      {travelers}
                    </span>
                    <button
                      type="button"
                      aria-label="Ajouter un adulte"
                      disabled={travelers >= 9}
                      onClick={() =>
                        setTravelers((current) => Math.min(9, current + 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-night/10 text-night transition hover:border-violet/40 hover:text-violet disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <label className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.14em] text-night/45">
                  Classe
                  <select
                    value={cabinClass}
                    onChange={(event) => setCabinClass(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-night/10 bg-cream px-3 py-2.5 text-sm font-medium text-night outline-none focus:border-violet"
                  >
                    {CABIN_CLASSES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => setTravelersOpen(false)}
                  className="mt-4 w-full rounded-xl bg-night py-2.5 text-xs font-semibold text-white transition hover:bg-violet"
                >
                  Terminé
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-night/5 pt-4">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-night/40">
            Options
          </span>
          <OptionToggle
            label="Bagages"
            checked={baggage}
            onChange={(value) => {
              setBaggage(value);
              resetVisible();
            }}
            icon={<Luggage className="h-3.5 w-3.5" />}
          />
          <OptionToggle
            label="Vols directs"
            checked={directOnly}
            onChange={(value) => {
              setDirectOnly(value);
              resetVisible();
            }}
            icon={<Plane className="h-3.5 w-3.5" />}
          />
          <OptionToggle
            label="Ajouter des aéroports à proximité"
            checked={nearbyAirports}
            onChange={(value) => {
              setNearbyAirports(value);
              resetVisible();
            }}
            icon={<MapPin className="h-3.5 w-3.5" />}
          />
          <OptionToggle
            label="Ajouter un hébergement"
            checked={accommodation}
            onChange={(value) => {
              setAccommodation(value);
              resetVisible();
            }}
            icon={<Hotel className="h-3.5 w-3.5" />}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-night px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-violet"
          >
            <Search className="h-3.5 w-3.5" />
            Rechercher
          </button>
        </div>

        {activeFilters.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-night/5 px-3 py-1 text-[11px] font-medium text-night/55"
              >
                {filter}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {routeConnection && departureDate ? (
        <section className="mt-8 rounded-3xl border border-violet/20 bg-white p-5 shadow-lg shadow-violet/5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet">
                Résultats instantanés
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold capitalize tracking-tight text-night sm:text-3xl">
                Vols disponibles le {formatLongDate(departureDate)}
              </h3>
              <p className="mt-1 text-sm text-night/50">
                {shortLabel(departure)} → {routeConnection.arrivalCity} (
                {arrivalCode}) · {routeConnection.countryName}
              </p>
            </div>
            <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
              {availableFlights.length} départs
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {availableFlights.map((flight) => (
              <article
                key={flight.id}
                className="flex h-full flex-col rounded-2xl border border-night/10 bg-cream p-4 transition hover:border-violet/30 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet">
                      {flight.slotLabel}
                    </p>
                    <p className="mt-1 text-xs font-medium text-night/45">
                      {flight.flightNumber}
                    </p>
                  </div>
                  <Plane className="h-4 w-4 text-violet" />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div>
                    <p className="font-display text-xl font-semibold text-night">
                      {flight.departureTime}
                    </p>
                    <p className="text-[11px] font-semibold text-night/45">
                      {flight.departureCode}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col items-center px-1">
                    <span className="h-px w-full bg-night/15" />
                    <span className="-my-2 rounded-full bg-white px-1.5 text-[10px] font-medium text-night/45">
                      {flight.durationLabel}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-semibold text-night">
                      {flight.arrivalTime}
                    </p>
                    <p className="text-[11px] font-semibold text-night/45">
                      {flight.arrivalCode}
                    </p>
                  </div>
                </div>
                <p className="mt-1 text-center text-[10px] text-night/35">
                  heures locales estimées
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]",
                      flight.direct
                        ? "bg-cyan/10 text-cyan"
                        : "bg-amber-500/10 text-amber-700",
                    )}
                  >
                    {flight.direct ? "Direct" : "Escale"}
                  </span>
                  <span className="rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-violet">
                    {flight.baggageIncluded ? "Bagages inclus" : "Bagage en option"}
                  </span>
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-night/40">
                    Meilleur tarif du jour
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold leading-snug text-night">
                    Tarif en temps réel sur demande
                  </p>
                  <p className="mt-0.5 text-[11px] text-night/45">
                    pour {travelers} Adulte{travelers > 1 ? "s" : ""}, {cabinClass}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={flightRequestLink(
                        requestInput(routeConnection, {
                          slotLabel: flight.slotLabel,
                          flightNumber: flight.flightNumber,
                          departureTime: flight.departureTime,
                          arrivalTime: flight.arrivalTime,
                        }),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#128C4A]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      Demander le tarif exact
                    </a>
                    {(() => {
                      const partnerUrl = partnerUrlFor(routeConnection);
                      return partnerUrl ? (
                        <a
                          href={partnerUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet transition hover:underline"
                        >
                          Voir l&apos;offre partenaire
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null;
                    })()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-night/40">
        Catalogue · {results.length}{" "}
        {results.length === 1 ? "liaison disponible" : "liaisons disponibles"} ·
        {shortLabel(departure)} ·{" "}
        {tripType === "one-way" ? "Aller simple" : "Aller-retour"}
      </p>

      {results.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-night/15 bg-white/60 px-6 py-14 text-center">
          <p className="font-display text-xl font-semibold text-night">
            Aucune liaison trouvée
          </p>
          <p className="mt-2 text-sm text-night/50">
            Essayez une autre destination, un autre continent ou moins d&apos;options.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, visible).map((connection) => {
            const requestHref = flightRequestLink(requestInput(connection));

            return (
              <article
                key={`${connection.continentSlug}-${connection.countrySlug}`}
                className="flex h-full flex-col rounded-3xl border border-night/10 bg-white p-5 shadow-lg shadow-night/5 transition hover:-translate-y-0.5 hover:border-violet/30 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet">
                      {connection.continentName}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-night">
                      <Link
                        href={connection.href}
                        className="transition hover:text-violet"
                      >
                        {connection.countryName}
                      </Link>
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet">
                    <Plane className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-night/60">
                  <Plane className="h-3.5 w-3.5 text-violet" />
                  Départ : {shortLabel(departure)} → {connection.arrivalCity}
                  {connection.arrivalAirportCode
                    ? ` (${connection.arrivalAirportCode})`
                    : ""}
                </p>
                <p className="mt-1 text-xs text-night/45">
                  Temps de vol{isDefaultDeparture ? "" : " indicatif"} :{" "}
                  {connection.flightTime}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {connection.direct ? (
                    <span className="rounded-full bg-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-cyan">
                      Direct
                    </span>
                  ) : null}
                  {connection.baggageIncluded ? (
                    <span className="rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-violet">
                      Bagage inclus
                    </span>
                  ) : null}
                </div>

                <div className="mt-auto pt-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-night/40">
                    Meilleur tarif du jour
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold leading-snug text-night">
                    Tarif en temps réel sur demande
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={requestHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#128C4A]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      Demander le tarif exact
                    </a>
                    <Link
                      href={connection.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-night/55 transition hover:text-violet"
                    >
                      Voir la destination
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    {(() => {
                      const partnerUrl = partnerUrlFor(connection);
                      return partnerUrl ? (
                        <a
                          href={partnerUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet transition hover:underline"
                        >
                          Voir l&apos;offre partenaire
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null;
                    })()}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {results.length > visible ? (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((current) => current + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-night/15 bg-white px-6 py-3 text-sm font-semibold text-night transition hover:border-violet/40 hover:text-violet"
          >
            Afficher plus de liaisons
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
