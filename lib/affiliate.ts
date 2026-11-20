export const TRAVELPAYOUTS_MARKER =
  process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "603880";

export const KIWI_AFFILIATE_URL =
  process.env.NEXT_PUBLIC_KIWI_AFFILIATE_URL?.trim() ||
  "https://kiwi.tpx.gr/5fiNmZvF";

export const TIQETS_AFFILIATE_URL =
  process.env.NEXT_PUBLIC_TIQETS_AFFILIATE_URL?.trim() ||
  "https://tiqets.tpx.gr/KFvBJhRi";

export const TRIP_AFFILIATE_URL =
  process.env.NEXT_PUBLIC_TRIP_AFFILIATE_URL?.trim() || "";

export type AffiliateProvider = "kiwi" | "tiqets" | "trip" | "auto";

export type BuildAffiliateUrlParams = {
  provider?: AffiliateProvider;
  destination?: string;
  country?: string;
  origin?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  affiliateUrl?: string;
  subId?: string;
};

function withSubId(url: string, subId?: string): string {
  if (!subId) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sub_id=${encodeURIComponent(subId)}`;
}

function providerUrl(provider?: AffiliateProvider): string | undefined {
  switch (provider) {
    case "tiqets":
      return TIQETS_AFFILIATE_URL || undefined;
    case "kiwi":
    case "auto":
      return KIWI_AFFILIATE_URL || undefined;
    case "trip":
      return TRIP_AFFILIATE_URL || undefined;
    default:
      return undefined;
  }
}

/**
 * Construit une URL de réservation/partenaire réutilisable.
 *
 * Repli : `affiliateUrl` explicite > lien partenaire spécifique configuré
 * (selon `provider`) > `/vols`.
 * Si un `subId` est fourni et qu'un lien partenaire (explicite ou configuré)
 * est utilisé, `sub_id` est ajouté sans inventer d'autres paramètres deep-link.
 */
export function buildAffiliateUrl(
  params: BuildAffiliateUrlParams = {},
): string {
  const explicit = params.affiliateUrl?.trim();
  if (explicit) {
    return withSubId(explicit, params.subId);
  }

  const configured = providerUrl(params.provider)?.trim();
  if (configured) {
    return withSubId(configured, params.subId);
  }

  return "/vols";
}
