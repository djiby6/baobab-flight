import type { FlightConnection } from "@/data/flights";

export type AvailableFlight = {
  id: string;
  slotLabel: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  durationLabel: string;
  direct: boolean;
  baggageIncluded: boolean;
  departureCode: string;
  arrivalCode: string;
};

export type AvailableFlightOptions = {
  baggage: boolean;
};

const SLOTS = [
  { label: "Matin", hour: 7, minute: 15 },
  { label: "Midi", hour: 12, minute: 40 },
  { label: "Après-midi", hour: 16, minute: 20 },
  { label: "Soir", hour: 20, minute: 5 },
];

function hash(value: string): number {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) >>> 0;
  }
  return result;
}

function durationMinutes(flightTime: string, seed: number): number {
  const hoursMatch = flightTime.match(/(\d+)\s*h(?:[a-z]*)\s*(\d+)?/i);
  if (hoursMatch) {
    const hours = Number.parseInt(hoursMatch[1], 10);
    const minutes = hoursMatch[2] ? Number.parseInt(hoursMatch[2], 10) : 0;
    return hours * 60 + minutes;
  }
  const minutesMatch = flightTime.match(/(\d+)\s*min/i);
  if (minutesMatch) return Number.parseInt(minutesMatch[1], 10);
  return 120 + (seed % 60);
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours}h ${String(rest).padStart(2, "0")}` : `${hours}h`;
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function addMinutes(time: string, minutes: number): string {
  const [hour, minute] = time.split(":").map(Number);
  const total = ((hour * 60 + minute + minutes) % 1440 + 1440) % 1440;
  return formatTime(Math.floor(total / 60), total % 60);
}

export function generateAvailableFlights(
  connection: FlightConnection,
  departureAirportCode: string,
  arrivalAirportCode: string,
  options: AvailableFlightOptions,
): AvailableFlight[] {
  const seed = hash(
    `${connection.countrySlug}-${departureAirportCode}-${arrivalAirportCode}-${connection.flightTime}`,
  );
  const duration = durationMinutes(connection.flightTime, seed);

  return SLOTS.map((slot, index) => {
    const offset = ((seed + index * 17) % 5) * 5;
    const departureTime = formatTime(slot.hour, slot.minute + offset);
    const arrivalTime = addMinutes(departureTime, duration);

    return {
      id: `${connection.countrySlug}-${departureAirportCode}-${slot.hour}`,
      slotLabel: slot.label,
      flightNumber: `BF${1000 + ((seed + index * 37) % 9000)}`,
      departureTime,
      arrivalTime,
      durationLabel: formatDuration(duration),
      direct: connection.direct,
      baggageIncluded: connection.baggageIncluded || options.baggage,
      departureCode: departureAirportCode,
      arrivalCode: arrivalAirportCode,
    };
  });
}
