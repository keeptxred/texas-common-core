import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { Container } from "@/components/layout/Container";
import { breedFixtures } from "@/data/pets/fixtures";

const petSections = [
  { label: "Dogs", href: "/dogs", description: "Breeds, training, care, nutrition, behavior, and life with dogs." },
  { label: "Cats", href: "/cats", description: "Breed profiles, behavior, enrichment, nutrition, grooming, and care." },
  { label: "Birds", href: "/birds", description: "Companion bird species, housing, enrichment, diet, and responsible ownership." },
  { label: "Fish", href: "/fish", description: "Aquarium species, tank planning, water quality, feeding, and habitat guidance." },
  { label: "Reptiles", href: "/reptiles", description: "Species profiles, enclosure setup, heating, lighting, diet, and handling." },
  { label: "Small Pets", href: "/small-pets", description: "Rabbits, guinea pigs, hamsters, and other small companion animals." },
  { label: "Horses", href: "/horses", description: "Horse ownership, care, feeding, grooming, equipment, and practical guides." },
] as const;

const utilityLinks = [
  { label: "Compare breeds", href: "/compare", description: "Put size, temperament, exercise, grooming, and ownership needs side by side." },
  { label: "Guides", href: "/guides", description: "Practical answers for training, feeding, grooming, adoption, travel, and everyday care." },
  { label: "Tools", href: "/tools", description: "Calculators and decision aids built around real pet-owner questions." },
  { label: "Pet names", href: "/pet-names", description: "Useful name collections organized by pet, style, and personality." },
] as const;

export function PetsHome() {
  const brand = useBrand();
  const featuredBreeds = breedFixtures.slice(0, 5);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow text-primary">{brand.identity.tagline}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[.98] sm:text-6xl lg:text-7xl">
              Better pet decisions start with better information.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Breed and species profiles, practical care guides, comparisons, tools, and product explainers built to help owners understand what a pet actually needs before and after it comes home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dogs/breeds" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                Explore dog breeds
              </Link>
              <Link to="/cats/breeds" className="rounded-sm border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground">
                Explore cat breeds
              </Link>
            </div>
          </div>

          <div className="rounded-sm border border-border bg-background p-6 sm:p-8">
            <p className="eyebrow text-primary">Built differently</p>
            <h2 className="mt-3 font-display text-3xl">No thin pet directory pages.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Profiles are designed around ownership fit: temperament, exercise, grooming, health considerations, home compatibility, costs, training, and the reasons a pet may not be the right fit.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Photography is published only after source and usage rights are verified. Placeholder imagery stays visibly unpublished rather than being treated as finished content.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Explore pets</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Start with the animal you live with — or are thinking about bringing home.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {petSections.map((section) => (
              <Link key={section.href} to={section.href} className="group border-t border-border pt-5">
                <h3 className="font-display text-2xl transition-colors group-hover:text-primary">{section.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-primary">Breed library</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Profiles built around real ownership.</h2>
            </div>
            <Link to="/dogs/breeds" className="text-sm font-semibold text-primary">View dog breeds →</Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {featuredBreeds.map((breed) => (
              <Link
                key={breed.id}
                to={breed.petKind === "cat" ? "/cats/breeds/$slug" : "/dogs/breeds/$slug"}
                params={{ slug: breed.slug }}
                className="group rounded-sm border border-border bg-background p-5"
              >
                <div className="aspect-[4/3] rounded-sm border border-dashed border-border bg-muted/40" aria-hidden="true" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">{breed.petKind}</p>
                <h3 className="mt-1 font-display text-xl transition-colors group-hover:text-primary">{breed.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{breed.sizeLabel} · {breed.lifeExpectancy ?? "Life expectancy pending verification"}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-primary">Choose with context</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Useful before adoption. Useful years later.</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                PetsDefined is being built as an ownership resource, not just a breed encyclopedia. The goal is to connect discovery, preparation, training, care, products, and long-term ownership in one place.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {utilityLinks.map((item) => (
                <Link key={item.href} to={item.href} className="rounded-sm border border-border p-6 transition-colors hover:bg-surface">
                  <h3 className="font-display text-2xl">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {brand.features.newsletter && (
        <section className="bg-ink text-ink-foreground">
          <Container className="py-14 text-center sm:py-20">
            <p className="eyebrow text-ink-foreground/70">{brand.copy.newsletterEyebrow}</p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{brand.copy.newsletterHeading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-foreground/75">{brand.copy.newsletterBody}</p>
          </Container>
        </section>
      )}
    </>
  );
}
