import type { BreedProfile, PetGuide, SpeciesProfile } from "./types";

export interface PublicationGateResult {
  publishable: boolean;
  errors: string[];
  warnings: string[];
}

const awkwardTitlePatterns = [
  /understanding .* and what makes/i,
  /everything you need to know about/i,
  /complete guide to understanding/i,
];

function baseChecks(title: string, summary: string, heroAlt: string, sourceCount: number, galleryCount: number) {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (title.trim().length < 3) errors.push("Title is missing or too short.");
  if (title.length > 72) warnings.push("Title is longer than 72 characters.");
  if (awkwardTitlePatterns.some((pattern) => pattern.test(title))) {
    errors.push("Title matches a blocked awkward/generated-heading pattern.");
  }
  if (summary.trim().length < 100) errors.push("Summary is too thin.");
  if (!heroAlt.trim()) errors.push("Hero image must have descriptive alt text.");
  if (sourceCount < 2) errors.push("At least two sources are required.");
  if (galleryCount < 2) warnings.push("Add at least two supporting images when good licensed imagery is available.");

  return { errors, warnings };
}

export function validateBreedForPublication(breed: BreedProfile): PublicationGateResult {
  const { errors, warnings } = baseChecks(
    breed.name,
    breed.summary,
    breed.hero.alt,
    breed.sourceIds.length,
    breed.gallery.length,
  );

  if (!breed.hero.rightsVerified) errors.push("Hero-image usage rights have not been verified.");
  if (!breed.lifeExpectancy) errors.push("Life expectancy is required for breed profiles.");
  if (!breed.weightRange) errors.push("Weight range is required for breed profiles.");
  if (breed.temperament.length < 3) errors.push("Breed temperament needs at least three concrete traits.");
  if (breed.healthConsiderations.length < 2) errors.push("Breed health considerations are too thin.");
  if (breed.goodFitFor.length < 2 || breed.reconsiderIf.length < 2) {
    errors.push("Breed pages must explain both who the breed fits and who should reconsider it.");
  }
  if (breed.faq.length < 3) warnings.push("Breed pages should normally include at least three useful FAQs.");

  return { publishable: errors.length === 0, errors, warnings };
}

export function validateSpeciesForPublication(species: SpeciesProfile): PublicationGateResult {
  const { errors, warnings } = baseChecks(
    species.name,
    species.summary,
    species.hero.alt,
    species.sourceIds.length,
    species.gallery.length,
  );

  if (!species.hero.rightsVerified) errors.push("Hero-image usage rights have not been verified.");
  if (species.habitatRequirements.length < 2) errors.push("Habitat requirements are too thin.");
  if (species.dietOverview.length < 2) errors.push("Diet guidance is too thin.");
  if (species.healthConsiderations.length < 2) errors.push("Health considerations are too thin.");

  return { publishable: errors.length === 0, errors, warnings };
}

export function validateGuideForPublication(guide: PetGuide): PublicationGateResult {
  const { errors, warnings } = baseChecks(
    guide.name,
    guide.summary,
    guide.hero.alt,
    guide.sourceIds.length,
    guide.gallery.length,
  );

  if (!guide.hero.rightsVerified) errors.push("Hero-image usage rights have not been verified.");
  if (guide.body.length < 3) errors.push("Guide needs at least three substantive sections.");

  const paragraphCount = guide.body.reduce((count, section) => count + section.paragraphs.length, 0);
  if (paragraphCount < 6) errors.push("Guide body is too thin for publication.");
  if (guide.faq.length < 2) warnings.push("Consider adding useful FAQs if they answer real search intent.");

  return { publishable: errors.length === 0, errors, warnings };
}
