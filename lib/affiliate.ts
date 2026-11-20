export const TRAVELPAYOUTS_MARKER =
  process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "603880";

export const AFFILIATE_BASE_URL =
  process.env.NEXT_PUBLIC_AFFILIATE_BASE_URL?.trim() || "";

export const hasExternalAffiliateBase = AFFILIATE_BASE_URL.length > 0;

export type AffiliateTripType = "round-trip" | "one-way";

export type BuildAffiliateUrlParams = {
  /**
   * URL partenaire explicite (fiche pays, offre, deeplink officiel, etc.).
   * Point d'extension prioritaire, prêt à recevoir l'URL officielle une
   * fois la revue Travelpayouts terminée.
   */
  affiliateUrl?: string;
  destination?: string;
  country?: string;
  iataCode?: string;
  originIataCode?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  adults?: number;
  tripType?: AffiliateTripType;
};

function isAbsoluteUrl(value: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
}

function setIfPresent(
  url: URL,
  key: string,
  value: string | number | undefined,
) {
  if (value === undefined || value === null || value === "") return;
  url.searchParams.set(key, String(value));
}

/**
 * Construit une URL de réservation/partenaire réutilisable.
 *
 * - Utilise le marker Travelpayouts ({@link TRAVELPAYOUTS_MARKER}, 603880 par défaut).
 * - Priorité à `affiliateUrl` explicite, puis à `NEXT_PUBLIC_AFFILIATE_BASE_URL`.
 * - Fallback sûr vers `/vols` si aucune URL partenaire externe n'est configurée.
 */
export function buildAffiliateUrl(
  params: BuildAffiliateUrlParams = {},
): string {
  const explicit = params.affiliateUrl?.trim();
  const base = explicit || AFFILIATE_BASE_URL || "/vols";
  const passengers = params.passengers ?? params.adults;

  let url: URL;
  let relative = false;

  if (isAbsoluteUrl(base)) {
    url = new URL(base);
  } else {
    relative = base.startsWith("/");
    url = new URL(base, "https://baobabflight.local");
  }

  setIfPresent(url, "marker", TRAVELPAYOUTS_MARKER);
  setIfPresent(url, "destination", params.destination ?? params.country);
  setIfPresent(url, "country", params.country);
  setIfPresent(url, "iata", params.iataCode);
  setIfPresent(url, "origin_iata", params.originIataCode);
  setIfPresent(url, "departure_date", params.departureDate);
  setIfPresent(url, "return_date", params.returnDate);
  setIfPresent(url, "passengers", passengers);
  setIfPresent(url, "trip_type", params.tripType);

  if (isAbsoluteUrl(base)) {
    return url.toString();
  }

  if (relative) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
