import type { MetadataRoute } from "next";
import { continents } from "@/data/destinations";
import { legalLinks, siteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/destinations",
  "/vols",
  ...legalLinks.map((link) => link.href),
];

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: (path === "/" ? "daily" : "weekly") as
      | "daily"
      | "weekly",
    priority: path === "/" ? 1 : path === "/destinations" || path === "/vols" ? 0.9 : 0.5,
  }));

  const continentEntries = continents.map((continent) => ({
    url: `${siteUrl}/destinations/${continent.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const countryEntries = continents.flatMap((continent) =>
    continent.countries.map((country) => ({
      url: `${siteUrl}/destinations/${continent.slug}/${country.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...continentEntries, ...countryEntries];
}
