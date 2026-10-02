import type { BrandConfig } from "./types";

export const petsDefinedBrand: BrandConfig = {
  identity: {
    id: "petsdefined",
    name: "PetsDefined",
    wordmark: "Pets Defined",
    monogram: "PD",
    tagline: "Understand the pets you love.",
    domain: "petsdefined.com",
    locale: "en-US",
    social: [],
  },
  seo: {
    titleTemplate: "%s | PetsDefined",
    defaultTitle: "PetsDefined — Better Guides for Better Pet Care",
    defaultDescription:
      "Practical, well-sourced guides to dog and cat breeds, birds, fish, reptiles, small pets, training, care, products, comparisons, and pet ownership.",
    organizationType: "Organization",
  },
  copy: {
    newsletterEyebrow: "The PetsDefined Weekly",
    newsletterHeading: "Useful pet guidance, without the fluff",
    newsletterBody:
      "Practical care guides, breed knowledge, product explainers, and new tools for pet owners.",
    newsletterCta: "Subscribe",
    newsletterPlaceholder: "you@example.com",
    newsletterSuccess: "You're on the list.",
    readMore: "Read the guide",
    viewAll: "View all",
    searchPlaceholder: "Search breeds, species, care guides, and tools",
    searchEmpty: "Nothing matched that search. Try a breed, species, or care topic.",
    emptyState: "Nothing here yet.",
    comingSoon: "Coming soon",
    comingSoonBody: "This resource is being built and will publish only when it meets our quality checks.",
    shopCta: "See recommended gear",
    shopTheStoryHeading: "Recommended gear",
    relatedHeading: "Related guides",
    footerNote: "Independent pet guidance built for usefulness, clarity, and responsible ownership.",
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
  },
  features: {
    shop: true,
    events: false,
    guides: true,
    realEstate: false,
    newsletter: true,
    search: true,
    accounts: false,
  },
  nav: [
    {
      label: "Dogs",
      to: "/dogs",
      children: [
        { label: "Dog Breeds", to: "/dogs/breeds" },
        { label: "Training", to: "/dogs/training" },
        { label: "Care", to: "/dogs/care" },
        { label: "Nutrition", to: "/dogs/nutrition" },
      ],
    },
    {
      label: "Cats",
      to: "/cats",
      children: [
        { label: "Cat Breeds", to: "/cats/breeds" },
        { label: "Behavior", to: "/cats/behavior" },
        { label: "Care", to: "/cats/care" },
        { label: "Nutrition", to: "/cats/nutrition" },
      ],
    },
    {
      label: "Other Pets",
      to: "/pets",
      children: [
        { label: "Birds", to: "/birds" },
        { label: "Fish", to: "/fish" },
        { label: "Reptiles", to: "/reptiles" },
        { label: "Small Pets", to: "/small-pets" },
        { label: "Horses", to: "/horses" },
      ],
    },
    { label: "Compare", to: "/compare" },
    { label: "Guides", to: "/guides" },
    { label: "Tools", to: "/tools" },
    { label: "Products", to: "/products" },
    { label: "Pet Names", to: "/pet-names" },
    { label: "About", to: "/about" },
  ],
  footer: [
    {
      title: "Pets",
      items: [
        { label: "Dogs", to: "/dogs" },
        { label: "Cats", to: "/cats" },
        { label: "Birds", to: "/birds" },
        { label: "Fish", to: "/fish" },
        { label: "Reptiles", to: "/reptiles" },
      ],
    },
    {
      title: "Learn",
      items: [
        { label: "Guides", to: "/guides" },
        { label: "Compare", to: "/compare" },
        { label: "Tools", to: "/tools" },
        { label: "Pet Names", to: "/pet-names" },
      ],
    },
    {
      title: "More",
      items: [
        { label: "Products", to: "/products" },
        { label: "About", to: "/about" },
        { label: "Search", to: "/search" },
      ],
    },
  ],
  legal: [
    { label: "Editorial Policy", to: "/editorial-policy" },
    { label: "Affiliate Disclosure", to: "/affiliate-disclosure" },
    { label: "Privacy", to: "/privacy" },
  ],
};
