export type PetGuideIndexItem = {
  slug: string;
  title: string;
  summary: string;
  section: "Getting Started" | "Care" | "Training & Behavior" | "Nutrition" | "Grooming" | "Travel";
  pet: "dogs" | "cats" | "all-pets";
  status: "planned" | "in-development" | "ready-for-research";
};

export const petGuideIndex: PetGuideIndexItem[] = [
  {
    slug: "choosing-the-right-dog-for-your-household",
    title: "Choosing the Right Dog for Your Household",
    summary: "A decision framework built around exercise, size, grooming, noise, training, children, other pets, and time at home.",
    section: "Getting Started",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "first-week-with-a-new-dog",
    title: "The First Week With a New Dog",
    summary: "Set up routines, safe spaces, feeding, bathroom breaks, introductions, sleep, and early training without overwhelming a new dog.",
    section: "Getting Started",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "first-week-with-a-new-cat",
    title: "The First Week With a New Cat",
    summary: "A practical plan for safe-room setup, litter, feeding, hiding, introductions, enrichment, and gradual access to the home.",
    section: "Getting Started",
    pet: "cats",
    status: "ready-for-research",
  },
  {
    slug: "how-much-exercise-does-my-dog-need",
    title: "How Much Exercise Does My Dog Need?",
    summary: "How age, breed tendencies, fitness, weather, medical limitations, and behavior affect a realistic daily exercise plan.",
    section: "Care",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "indoor-enrichment-for-cats",
    title: "Indoor Enrichment for Cats",
    summary: "Use vertical space, hunting games, scratching options, play routines, resting areas, and rotation to build a better indoor environment.",
    section: "Care",
    pet: "cats",
    status: "ready-for-research",
  },
  {
    slug: "crate-training-without-rushing-it",
    title: "Crate Training Without Rushing It",
    summary: "Build positive crate associations gradually and recognize when duration, confinement, or expectations are moving too fast.",
    section: "Training & Behavior",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "reading-dog-body-language",
    title: "Reading Dog Body Language",
    summary: "A practical introduction to posture, facial tension, tail carriage, displacement behaviors, distance-seeking, and signs of escalating stress.",
    section: "Training & Behavior",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "cat-body-language-basics",
    title: "Cat Body Language Basics",
    summary: "Understand ears, tail, eyes, posture, vocalization, proximity, and common signals that a cat needs more distance or control.",
    section: "Training & Behavior",
    pet: "cats",
    status: "ready-for-research",
  },
  {
    slug: "reading-a-pet-food-label",
    title: "How to Read a Pet Food Label",
    summary: "A plain-language guide to nutritional adequacy statements, life stage, ingredients, feeding directions, calories, and marketing claims.",
    section: "Nutrition",
    pet: "all-pets",
    status: "ready-for-research",
  },
  {
    slug: "dog-body-condition-score",
    title: "Understanding a Dog's Body Condition",
    summary: "What owners can look for at home and why weight alone does not tell the whole story about healthy body condition.",
    section: "Nutrition",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "brushing-a-double-coated-dog",
    title: "Brushing a Double-Coated Dog",
    summary: "Tools, technique, frequency, seasonal shedding, mat prevention, and why shaving is usually not a shortcut for coat care.",
    section: "Grooming",
    pet: "dogs",
    status: "ready-for-research",
  },
  {
    slug: "traveling-with-pets-by-car",
    title: "Traveling With Pets by Car",
    summary: "Plan restraint, acclimation, breaks, temperature safety, identification, supplies, overnight stops, and destination rules before leaving home.",
    section: "Travel",
    pet: "all-pets",
    status: "ready-for-research",
  },
];
