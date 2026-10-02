import type { PetKind, SpeciesProfile } from "@/domain/pets/types";

export type SpeciesResearchItem = {
  slug: string;
  name: string;
  petKind: Extract<PetKind, "bird" | "fish" | "reptile" | "small-pet">;
  focusAreas: string[];
  status: "research-queued" | "source-review" | "profile-draft";
};

/**
 * Launch research queue only. These records intentionally contain no care claims.
 * A name in this list does not make a species page publishable or indexable.
 */
export const speciesResearchQueue: SpeciesResearchItem[] = [
  { slug: "cockatiel", name: "Cockatiel", petKind: "bird", focusAreas: ["housing", "diet", "social needs", "enrichment", "lifespan", "health"], status: "research-queued" },
  { slug: "budgerigar", name: "Budgerigar (Budgie)", petKind: "bird", focusAreas: ["housing", "diet", "social needs", "enrichment", "handling", "health"], status: "research-queued" },
  { slug: "african-grey-parrot", name: "African Grey Parrot", petKind: "bird", focusAreas: ["housing", "diet", "social needs", "enrichment", "behavior", "long-term commitment"], status: "research-queued" },
  { slug: "betta", name: "Betta", petKind: "fish", focusAreas: ["tank size", "temperature", "water quality", "diet", "compatibility", "health"], status: "research-queued" },
  { slug: "goldfish", name: "Goldfish", petKind: "fish", focusAreas: ["tank planning", "filtration", "water quality", "diet", "adult size", "lifespan"], status: "research-queued" },
  { slug: "guppy", name: "Guppy", petKind: "fish", focusAreas: ["tank setup", "water quality", "diet", "social grouping", "breeding", "health"], status: "research-queued" },
  { slug: "bearded-dragon", name: "Bearded Dragon", petKind: "reptile", focusAreas: ["enclosure", "heat", "UVB", "diet", "handling", "health"], status: "research-queued" },
  { slug: "leopard-gecko", name: "Leopard Gecko", petKind: "reptile", focusAreas: ["enclosure", "heat", "lighting", "diet", "substrate", "health"], status: "research-queued" },
  { slug: "ball-python", name: "Ball Python", petKind: "reptile", focusAreas: ["enclosure", "heat", "humidity", "feeding", "handling", "health"], status: "research-queued" },
  { slug: "rabbit", name: "Rabbit", petKind: "small-pet", focusAreas: ["housing", "diet", "social needs", "enrichment", "handling", "health"], status: "research-queued" },
  { slug: "guinea-pig", name: "Guinea Pig", petKind: "small-pet", focusAreas: ["housing", "diet", "social needs", "enrichment", "handling", "health"], status: "research-queued" },
  { slug: "hamster", name: "Hamster", petKind: "small-pet", focusAreas: ["housing", "bedding", "diet", "enrichment", "handling", "activity cycle"], status: "research-queued" },
  { slug: "ferret", name: "Ferret", petKind: "small-pet", focusAreas: ["housing", "diet", "enrichment", "handling", "legal considerations", "health"], status: "research-queued" },
];

/**
 * Only fully researched records belong here. An empty array is intentional at
 * this stage: the route/template can be built before any species page clears
 * the publication gate.
 */
export const speciesFixtures: SpeciesProfile[] = [];

export function speciesBySlug(slug: string): SpeciesProfile | undefined {
  return speciesFixtures.find((species) => species.slug === slug);
}

export function researchQueueFor(kind: PetKind): SpeciesResearchItem[] {
  return speciesResearchQueue.filter((item) => item.petKind === kind);
}
