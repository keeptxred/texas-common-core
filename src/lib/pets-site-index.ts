import { breedFixtures } from "@/data/pets/fixtures";

const staticPaths = [
  "/",
  "/dogs",
  "/dogs/breeds",
  "/cats",
  "/cats/breeds",
  "/birds",
  "/fish",
  "/reptiles",
  "/small-pets",
  "/horses",
  "/compare",
  "/guides",
  "/tools",
  "/products",
  "/pet-names",
  "/about",
  "/editorial-policy",
  "/affiliate-disclosure",
  "/privacy",
] as const;

export function getPetsDefinedIndexablePaths(): string[] {
  const breedPaths = breedFixtures.map((breed) =>
    breed.petKind === "cat" ? `/cats/breeds/${breed.slug}` : `/dogs/breeds/${breed.slug}`,
  );

  return [...staticPaths, ...breedPaths];
}

export function buildPetsDefinedSitemap(domain: string): string {
  const urls = getPetsDefinedIndexablePaths()
    .map((path) => `  <url><loc>https://${domain}${path}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildPetsDefinedRobots(domain: string): string {
  return [`User-agent: *`, `Allow: /`, ``, `Sitemap: https://${domain}/sitemap.xml`, ``].join("\n");
}
