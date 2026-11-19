import { whatsappLink } from "@/lib/site";

export type FlightTripType = "round-trip" | "one-way";

export type FlightSelection = {
  slotLabel: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
};

export type FlightRequestInput = {
  departureLabel: string;
  arrivalCity: string;
  arrivalLabel?: string;
  countryName: string;
  flightTime: string;
  tripType?: FlightTripType;
  baggage?: boolean;
  directOnly?: boolean;
  nearbyAirports?: boolean;
  departureDate?: string;
  returnDate?: string;
  travelers?: number;
  cabinClass?: string;
  accommodation?: boolean;
  flight?: FlightSelection;
};

type AirportLike = {
  code: string;
  city: string;
  airportName: string;
  label: string;
  aliases?: string[];
};

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("fr");
}

export function matchesAirportOption(airport: AirportLike, value: string): boolean {
  const needle = normalize(value);
  if (!needle) return true;
  const values = [
    airport.code,
    airport.city,
    airport.airportName,
    airport.label,
    ...(airport.aliases ?? []),
  ];
  return values.some((item) => normalize(item).includes(needle));
}

export function matchesDepartureAirport(
  airport: AirportLike,
  value: string,
  includeNearby: boolean,
): boolean {
  const needle = normalize(value);
  if (!needle) return true;
  if (matchesAirportOption(airport, needle)) return true;
  if (!includeNearby) return false;
  return (airport.aliases ?? []).some((item) => normalize(item).includes(needle));
}

function formatDate(value: string | undefined): string {
  if (!value) return "à définir";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export function flightRequestMessage(input: FlightRequestInput): string {
  const tripLabel = input.tripType === "one-way" ? "aller simple" : "aller-retour";
  const travelers = input.travelers ?? 1;
  const cabinClass = input.cabinClass ?? "Économie";
  const lines = [
    `Bonjour Baobab Flight, je souhaite un ${tripLabel} ${input.departureLabel} → ${input.arrivalLabel || `${input.arrivalCity} (${input.countryName})`}.`,
    `Départ : ${formatDate(input.departureDate)}.`,
    input.tripType === "one-way"
      ? "Retour : aucun (aller simple)."
      : `Retour : ${formatDate(input.returnDate)}.`,
    input.flight
      ? `Créneau souhaité : ${input.flight.slotLabel} · vol ${input.flight.flightNumber} · ${input.flight.departureTime} → ${input.flight.arrivalTime} (heures locales estimées).`
      : null,
    `Voyageurs : ${travelers} Adulte${travelers > 1 ? "s" : ""}, ${cabinClass}.`,
    `Bagages souhaités : ${input.baggage ? "oui" : "non"}.`,
    `Vols directs uniquement : ${input.directOnly ? "oui" : "peu importe"}.`,
    `Aéroports à proximité acceptés : ${input.nearbyAirports ? "oui" : "non"}.`,
    `Hébergement souhaité : ${input.accommodation ? "oui" : "non"}.`,
    `Temps de vol estimé : ${input.flightTime}.`,
    "Merci de me communiquer le tarif réel disponible pour cette liaison, cette date, ce créneau et ces options.",
  ];
  return lines.filter(Boolean).join("\n");
}

export function flightRequestLink(input: FlightRequestInput): string {
  return whatsappLink(flightRequestMessage(input));
}
