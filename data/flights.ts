import {
  continents,
  type Continent,
  type Country,
} from "@/data/destinations";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { flightRequestLink } from "@/lib/flight-request";

export type AirportOption = {
  code: string;
  city: string;
  airportName: string;
  label: string;
  country: string;
  countrySlug: string;
  continentSlug: string;
  continentName: string;
  aliases: string[];
  rank: number;
};

export type DepartureAirport = AirportOption;

const airportCodesBySlug: Record<string, string> = {
  algerie: "ALG", angola: "LAD", benin: "COO", botswana: "GBE",
  "burkina-faso": "OUA", burundi: "BJM", cameroun: "YAO", "cap-vert": "RAI",
  comores: "HAH", "cote-d-ivoire": "ABJ", djibouti: "JIB", erythree: "ASM",
  eswatini: "MTS", ethiopie: "ADD", gabon: "LBV", gambie: "BJL",
  ghana: "ACC", guinee: "CKY", "guinee-equatoriale": "SSG",
  "guinee-bissau": "OXB", lesotho: "MSU", liberia: "ROB", libye: "TIP",
  madagascar: "TNR", malawi: "LLW", mali: "BKO", maurice: "MRU",
  mauritanie: "NKC", mozambique: "MPM", namibie: "WDH", niger: "NIM",
  nigeria: "ABV", ouganda: "EBB", "republique-centrafricaine": "BGF",
  "republique-democratique-du-congo": "FIH", "republique-du-congo": "BZV",
  rwanda: "KGL", "sao-tome-et-principe": "SAL", seychelles: "SEZ",
  "sierra-leone": "FNA", somalie: "MGQ", soudan: "KRT",
  "soudan-du-sud": "JUB", tanzanie: "DAR", tchad: "NDJ", togo: "LFW",
  tunisie: "TUN", zambie: "LUN", zimbabwe: "HRE",
  maroc: "CMN", senegal: "DSS", egypte: "CAI", kenya: "NBO",
  "afrique-du-sud": "JNB",

  albanie: "TIA", allemagne: "BER", andorre: "TLS", autriche: "VIE",
  belgique: "BRU", bielorussie: "MSQ", "bosnie-herzegovine": "SJJ",
  bulgarie: "SOF", chypre: "LCA", croatie: "ZAG", danemark: "CPH",
  estonie: "TLL", finlande: "HEL", hongrie: "BUD", irlande: "DUB",
  islande: "KEF", lettonie: "RIX", liechtenstein: "ZRH", lituanie: "VNO",
  luxembourg: "LUX", "macedoine-du-nord": "SKP", malte: "MLA",
  moldavie: "RMO", monaco: "NCE", montenegro: "TGD", norvege: "OSL",
  "pays-bas": "AMS", pologne: "WAW", roumanie: "OTP", "royaume-uni": "LHR",
  russie: "SVO", "saint-marin": "BLQ", serbie: "BEG", slovaquie: "BTS",
  slovenie: "LJU", suede: "ARN", suisse: "BRN", tchequie: "PRG",
  ukraine: "KBP", vatican: "CIA",
  france: "CDG", espagne: "MAD", italie: "FCO", grece: "ATH",
  portugal: "LIS", turquie: "ESB",

  "antigua-et-barbuda": "ANU", argentine: "EZE", bahamas: "NAS",
  barbade: "BGI", belize: "BZE", bolivie: "LPB", chili: "SCL",
  colombie: "BOG", "costa-rica": "SJO", cuba: "HAV", dominique: "DOM",
  equateur: "UIO", grenade: "GND", guatemala: "GUA", guyana: "GEO",
  haiti: "PAP", honduras: "TGU", jamaique: "KIN", nicaragua: "MGA",
  panama: "PTY", paraguay: "ASU", "republique-dominicaine": "SDQ",
  "saint-christophe-et-nieves": "RLB",
  "saint-vincent-et-les-grenadines": "SVD", "sainte-lucie": "SLU",
  salvador: "SAL", surinam: "PBM", "trinite-et-tobago": "POS",
  uruguay: "MVD", venezuela: "CCS",
  "etats-unis": "IAD", canada: "YOW", mexique: "MEX", bresil: "BSB",
  perou: "LIM",

  afghanistan: "KBL", "arabie-saoudite": "RUH", armenie: "EVN",
  azerbaidjan: "GYD", bahrein: "BAH", bangladesh: "DAC", bhoutan: "PBH",
  birmanie: "NYT", brunei: "BWN", cambodge: "KTI", chine: "PEK",
  "coree-du-nord": "FNJ", "coree-du-sud": "ICN", georgie: "TBS",
  inde: "DEL", irak: "BGW", iran: "THR", israel: "TLV", jordanie: "AMM",
  kazakhstan: "NQZ", kirghizistan: "FRU", koweit: "KWI", laos: "VTE",
  liban: "BEY", malaisie: "KUL", mongolie: "ULN", nepal: "KTM",
  oman: "MCT", ouzbekistan: "TAS", pakistan: "ISB", philippines: "MNL",
  qatar: "DOH", singapour: "SIN", "sri-lanka": "CMB", syrie: "DAM",
  tadjikistan: "TJU", "timor-oriental": "DIL", turkmenistan: "ASB",
  yemen: "SAA",
  "emirats-arabes-unis": "AUH", thailande: "BKK", japon: "NRT",
  indonesie: "CGK", vietnam: "HAN", maldives: "MLE",

  "iles-marshall": "MAJ", "iles-salomon": "HIR", kiribati: "TRW",
  micronesie: "PNI", nauru: "INU", palaos: "ROR",
  "papouasie-nouvelle-guinee": "POM", samoa: "APW", tonga: "TBU",
  tuvalu: "FUN", vanuatu: "VLI",
  australie: "CAN", "nouvelle-zelande": "WLG",
  "polynesie-francaise": "PPT", fidji: "SUV",
};

const cityBySlug: Record<string, string> = {
  maroc: "Casablanca",
  senegal: "Dakar",
  france: "Paris",
  "afrique-du-sud": "Johannesburg",
  "etats-unis": "Washington D.C.",
  "emirats-arabes-unis": "Abu Dhabi",
};

const airportNameBySlug: Record<string, string> = {
  maroc: "Mohammed V",
  senegal: "Blaise Diagne",
  france: "Charles de Gaulle / Orly",
};

const hubCodes = new Set([
  "CMN", "DSS", "CDG", "IAD", "LHR", "DXB", "AUH", "PEK", "NRT",
  "SIN", "FCO", "MAD", "BKK", "JNB", "CAI", "DOH", "IST", "ESB",
]);

function capitalCity(country: Country): string {
  return (
    cityBySlug[country.slug] ||
    country.capital?.split(/[,&]/)[0]?.trim() ||
    country.name
  );
}

function rankFor(code: string): number {
  if (code === "CMN") return 0;
  if (code === "DSS" || code === "CDG") return 1;
  if (hubCodes.has(code)) return 2;
  return 3;
}

function buildAirportOption(
  country: Country,
  continent: Continent,
): DepartureAirport {
  const city = capitalCity(country);
  const code = airportCodesBySlug[country.slug] || country.slug.slice(0, 3).toUpperCase();
  const airportName = airportNameBySlug[country.slug] || `${city} Airport`;
  const highlights = (country.tagline || "")
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  return {
    code,
    city,
    airportName,
    label: `${city} — ${country.name} (${code})`,
    country: country.name,
    countrySlug: country.slug,
    continentSlug: continent.slug,
    continentName: continent.name,
    aliases: [
      country.name,
      city,
      code,
      airportName,
      `${airportName} (${code})`,
      ...highlights,
    ].filter(Boolean),
    rank: rankFor(code),
  };
}

export const airportOptions: AirportOption[] = continents
  .flatMap((continent) =>
    continent.countries.map((country) => buildAirportOption(country, continent)),
  )
  .sort(
    (a, b) =>
      a.rank - b.rank ||
      a.city.localeCompare(b.city, "fr") ||
      a.country.localeCompare(b.country, "fr"),
  );

export const departureAirports = airportOptions;
export const destinationAirports = airportOptions;

export const defaultDeparture =
  airportOptions.find((airport) => airport.code === "CMN") ?? airportOptions[0];
export const defaultDepartureCode = defaultDeparture.code;
export const departureCity = "Casablanca";
export const departureAirportCode = defaultDeparture.code;
export const departureLabel = "Mohammed V (CMN)";

export function getQuickDepartureLabel(airport: DepartureAirport): string {
  if (airport.code === "CMN") return "Mohammed V (CMN)";
  if (airport.code === "DSS") return "Dakar (DSS)";
  if (airport.code === "CDG") return "Paris (CDG/ORY)";
  return airport.label;
}

export const quickDepartures = departureAirports
  .filter((airport) => ["CMN", "DSS", "CDG"].includes(airport.code))
  .sort((a, b) => a.rank - b.rank);

/**
 * Point d'extension pour les URLs partenaires officielles (deeplinks,
 * offres validées, etc.). Renseigner ici l'URL reçue après revue
 * Travelpayouts ; la logique de construction (marker, fallback) est
 * centralisée dans `lib/affiliate.ts`.
 */
export const flightAffiliateUrls: Record<string, string> = {};
export const indirectFlightSlugs: Record<string, boolean> = {};
export const baggageExcludedSlugs: Record<string, boolean> = {};

const FALLBACK_FLIGHT_TIME = "durée communiquée sur demande";

export type FlightConnection = {
  countrySlug: string;
  countryName: string;
  continentSlug: string;
  continentName: string;
  departureCity: string;
  departureAirportCode: string;
  arrivalCity: string;
  arrivalAirportCode?: string;
  flightTime: string;
  direct: boolean;
  baggageIncluded: boolean;
  href: string;
  whatsappHref: string;
  /** URL partenaire explicite à utiliser avec `buildAffiliateUrl` (si disponible). */
  affiliateUrl?: string;
};

export function getDepartureAirport(code: string | undefined): DepartureAirport {
  return departureAirports.find((airport) => airport.code === code) ?? defaultDeparture;
}

export function getDepartureLabel(code: string | undefined): string {
  return getQuickDepartureLabel(getDepartureAirport(code));
}

export function getAirportByCountrySlug(slug: string): DepartureAirport | undefined {
  return airportOptions.find((airport) => airport.countrySlug === slug);
}

export function getFlightConnection(
  country: Country,
  continent: Continent,
): FlightConnection {
  const arrivalCity = capitalCity(country);
  const flightTime = country.flightTime?.trim() || FALLBACK_FLIGHT_TIME;
  const explicitAffiliateUrl = flightAffiliateUrls[country.slug];
  const arrivalAirportCode = airportCodesBySlug[country.slug];

  const connection: FlightConnection = {
    countrySlug: country.slug,
    countryName: country.name,
    continentSlug: continent.slug,
    continentName: continent.name,
    departureCity,
    departureAirportCode,
    arrivalCity,
    arrivalAirportCode,
    flightTime,
    direct: !indirectFlightSlugs[country.slug],
    baggageIncluded: !baggageExcludedSlugs[country.slug],
    href: `/destinations/${continent.slug}/${country.slug}`,
    whatsappHref: "",
    ...(explicitAffiliateUrl
      ? {
          affiliateUrl: buildAffiliateUrl({
            affiliateUrl: explicitAffiliateUrl,
            destination: arrivalCity,
            country: country.name,
            iataCode: arrivalAirportCode,
            originIataCode: departureAirportCode,
          }),
        }
      : {}),
  };

  return {
    ...connection,
    whatsappHref: flightRequestLink({
      departureLabel,
      arrivalCity,
      countryName: country.name,
      flightTime,
    }),
  };
}

export function getFlightConnections(): FlightConnection[] {
  return continents
    .flatMap((continent) =>
      continent.countries.map((country) => getFlightConnection(country, continent)),
    )
    .sort((a, b) => a.countryName.localeCompare(b.countryName, "fr"));
}

export function getFeaturedFlightConnections(limit = 12): FlightConnection[] {
  return continents
    .flatMap((continent) =>
      continent.countries
        .filter((country) => country.featured)
        .map((country) => getFlightConnection(country, continent)),
    )
    .slice(0, limit);
}
