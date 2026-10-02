import { breedFixtures } from "@/data/pets/fixtures";
import type { BreedProfile, CareLevel, PetComparison, Rating5 } from "@/domain/pets/types";

export type BreedComparisonDefinition = {
  slug: string;
  leftSlug: string;
  rightSlug: string;
  summary: string;
};

export const breedComparisonDefinitions: BreedComparisonDefinition[] = [
  {
    slug: "golden-retriever-vs-labrador-retriever",
    leftSlug: "golden-retriever",
    rightSlug: "labrador-retriever",
    summary:
      "Golden Retrievers and Labrador Retrievers are both social sporting breeds, but coat care, energy patterns, training style, and household fit can feel different in day-to-day ownership.",
  },
  {
    slug: "maine-coon-vs-ragdoll",
    leftSlug: "maine-coon",
    rightSlug: "ragdoll",
    summary:
      "Maine Coons and Ragdolls are both large companion cats, but coat care, activity, social tendencies, and practical home setup can differ.",
  },
];

function findBreed(slug: string): BreedProfile | undefined {
  return breedFixtures.find((breed) => breed.slug === slug);
}

function careLabel(value: CareLevel): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function ratingLabel(value: Rating5 | undefined): string {
  return value ? `${value}/5` : "Not yet rated";
}

function text(value: string | undefined): string {
  return value?.trim() || "Not yet documented";
}

export function getBreedComparison(slug: string): {
  comparison: PetComparison;
  left: BreedProfile;
  right: BreedProfile;
} | undefined {
  const definition = breedComparisonDefinitions.find((item) => item.slug === slug);
  if (!definition) return undefined;

  const left = findBreed(definition.leftSlug);
  const right = findBreed(definition.rightSlug);
  if (!left || !right) return undefined;

  const sourceIds = [...new Set([...left.sourceIds, ...right.sourceIds])];

  const comparison: PetComparison = {
    id: `comparison-${definition.slug}`,
    brandId: "petsdefined",
    slug: definition.slug,
    title: `${left.name} vs ${right.name}`,
    leftSlug: left.slug,
    rightSlug: right.slug,
    summary: definition.summary,
    sourceIds,
    dimensions: [
      { label: "Size", left: left.sizeLabel, right: right.sizeLabel },
      { label: "Weight", left: text(left.weightRange), right: text(right.weightRange) },
      { label: "Life expectancy", left: text(left.lifeExpectancy), right: text(right.lifeExpectancy) },
      { label: "Exercise needs", left: careLabel(left.exercise), right: careLabel(right.exercise) },
      { label: "Grooming needs", left: careLabel(left.grooming), right: careLabel(right.grooming) },
      { label: "Shedding", left: careLabel(left.shedding), right: careLabel(right.shedding) },
      { label: "Energy", left: ratingLabel(left.energy), right: ratingLabel(right.energy) },
      { label: "Trainability", left: ratingLabel(left.trainability), right: ratingLabel(right.trainability) },
      { label: "Children", left: ratingLabel(left.childCompatibility), right: ratingLabel(right.childCompatibility), notes: "A breed tendency is not a guarantee of behavior. Individual temperament, supervision, training, and the child's behavior all matter." },
      { label: "Other dogs", left: ratingLabel(left.dogCompatibility), right: ratingLabel(right.dogCompatibility) },
      { label: "Cats", left: ratingLabel(left.catCompatibility), right: ratingLabel(right.catCompatibility) },
      { label: "Apartment fit", left: ratingLabel(left.apartmentSuitability), right: ratingLabel(right.apartmentSuitability), notes: "Housing fit depends on exercise, noise, training, routine, and local rules as well as size." },
    ],
  };

  return { comparison, left, right };
}
