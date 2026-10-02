import type { BrandId } from "@/brand/types";

export type PetKind = "dog" | "cat" | "bird" | "fish" | "reptile" | "small-pet" | "horse";
export type CareLevel = "low" | "moderate" | "high";
export type Rating5 = 1 | 2 | 3 | 4 | 5;

export interface PetImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
  license?: string;
  rightsVerified: boolean;
  focalPoint?: { x: number; y: number };
}

export interface PetSource {
  id: string;
  label: string;
  url: string;
  publisher?: string;
  accessedAt?: string;
  primary?: boolean;
}

export interface PetEntityBase {
  id: string;
  brandId: BrandId;
  slug: string;
  name: string;
  summary: string;
  petKind: PetKind;
  hero: PetImage;
  gallery: PetImage[];
  sourceIds: string[];
  publishedAt?: string;
  updatedAt?: string;
}

export interface BreedProfile extends PetEntityBase {
  entityType: "breed";
  aliases: string[];
  breedGroup?: string;
  origin?: string;
  sizeLabel: string;
  heightRange?: string;
  weightRange?: string;
  lifeExpectancy?: string;
  coat?: string;
  colors: string[];
  shedding: CareLevel;
  grooming: CareLevel;
  exercise: CareLevel;
  energy: Rating5;
  trainability: Rating5;
  childCompatibility?: Rating5;
  dogCompatibility?: Rating5;
  catCompatibility?: Rating5;
  apartmentSuitability?: Rating5;
  climateNotes?: string;
  temperament: string[];
  ownershipCostNotes?: string;
  history: string[];
  goodFitFor: string[];
  reconsiderIf: string[];
  feedingOverview?: string[];
  trainingOverview?: string[];
  groomingOverview?: string[];
  healthConsiderations: string[];
  breederOrRescueQuestions: string[];
  faq: { question: string; answer: string }[];
  relatedBreedSlugs: string[];
  comparisonSlugs: string[];
}

export interface SpeciesProfile extends PetEntityBase {
  entityType: "species";
  scientificName?: string;
  adultSize?: string;
  lifeExpectancy?: string;
  habitatRequirements: string[];
  dietOverview: string[];
  socialNeeds: string[];
  handlingNotes: string[];
  beginnerSuitability?: Rating5;
  careLevel: CareLevel;
  legalOrPermitNotes?: string[];
  healthConsiderations: string[];
  faq: { question: string; answer: string }[];
  relatedSpeciesSlugs: string[];
}

export type PetContentTopic =
  | "care"
  | "training"
  | "behavior"
  | "nutrition"
  | "grooming"
  | "ownership"
  | "adoption"
  | "travel"
  | "products"
  | "names";

export interface PetGuide extends PetEntityBase {
  entityType: "guide";
  topic: PetContentTopic;
  audience?: string;
  body: { heading: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export interface PetComparison {
  id: string;
  brandId: BrandId;
  slug: string;
  title: string;
  leftSlug: string;
  rightSlug: string;
  summary: string;
  dimensions: { label: string; left: string; right: string; notes?: string }[];
  sourceIds: string[];
  publishedAt?: string;
  updatedAt?: string;
}

export interface AffiliateLink {
  id: string;
  brandId: BrandId;
  merchant: string;
  label: string;
  href: string;
  disclosureRequired: true;
  rel: "sponsored nofollow";
}
