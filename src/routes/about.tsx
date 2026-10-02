import { createFileRoute } from "@tanstack/react-router";

import { activeBrand } from "@/brand/active";
import { useBrand } from "@/brand/context";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const texasDescription =
  "TexasDefined is a lifestyle publication about what makes Texas Texas — the places, food, history, homes and makers worth knowing.";
const petsDescription =
  "PetsDefined is an independent pet-information publication focused on useful, sourced breed, species, care, training, nutrition, and ownership guidance.";

export const Route = createFileRoute("/about")({
  head: () => {
    const description = activeBrand.identity.id === "petsdefined" ? petsDescription : texasDescription;
    return {
      meta: buildMeta(activeBrand, { title: `About ${activeBrand.identity.name}`, description }),
      links: [canonicalLink(activeBrand, "/about")],
    };
  },
  component: AboutPage,
});

const texasPrinciples = [
  {
    title: "We go there",
    body: "Every destination we publish is one someone on the masthead has stood in. Coordinates, seasons and entry notes come from the trip, not the brochure.",
  },
  {
    title: "Not a political publication",
    body: "Elections, legislation and government belong elsewhere. TexasDefined is about living here — the lakes, the brisket, the porch in September.",
  },
  {
    title: "Makers named",
    body: "Anything in the shop has a person behind it. We name the maker, the town and why the thing lasts.",
  },
  {
    title: "Useful over clever",
    body: "Guides and calculators exist to answer real questions: what the taxes run, what the drive costs, what survives August.",
  },
];

const petPrinciples = [
  {
    title: "Useful before exhaustive",
    body: "A shorter page that answers an owner's real question is better than a long page padded to target keywords. We build around decisions, care tasks, and ownership fit.",
  },
  {
    title: "Sources matter",
    body: "Breed, species, nutrition, training, and health-related claims must be traceable to credible sources. Publication gates require source coverage before a page can be considered finished.",
  },
  {
    title: "Fit goes both ways",
    body: "Breed and species pages explain who may be a good fit and who should reconsider. Popularity is not treated as evidence that an animal is right for every household.",
  },
  {
    title: "Images are evidence too",
    body: "Animal pages should show the animal clearly, but only with photography whose source and usage rights have been verified. Missing rights means the image remains unpublished.",
  },
];

function AboutPage() {
  const brand = useBrand();
  const isPetsDefined = brand.identity.id === "petsdefined";
  const principles = isPetsDefined ? petPrinciples : texasPrinciples;
  const description = isPetsDefined ? petsDescription : texasDescription;

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          {isPetsDefined ? "Understand the pets you love." : "What defines Texas?"}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
          {isPetsDefined
            ? " The editorial test is simple: does this help someone make a better-informed decision for an animal in their care?"
            : " It's the question behind every story we run — and the only editorial test a piece has to pass."}
        </p>
      </Container>

      <Section>
        <Container>
          <SectionHeader eyebrow="How we work" title="Four rules" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.title} className="border-t border-border pt-5">
                <h2 className="font-display text-2xl">{principle.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {isPetsDefined && (
        <Section tone="surface">
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <p className="eyebrow text-primary">Editorial boundary</p>
                <h2 className="mt-3 font-display text-3xl">PetsDefined and TexasDefined do different jobs.</h2>
              </div>
              <div className="lg:col-span-2">
                <p className="leading-relaxed text-muted-foreground">
                  General breed, species, care, training, behavior, nutrition, grooming, product, comparison, and pet-ownership content belongs on PetsDefined. Pet content whose answer fundamentally depends on Texas — such as Texas parks, beaches, laws, heat, travel, adoption processes, and destinations — remains on TexasDefined. The sites may cross-link, but they should not duplicate the same primary search intent.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {brand.features.newsletter && (
        <Section tone={isPetsDefined ? "default" : "surface"}>
          <Container className="max-w-2xl">
            <SectionHeader
              eyebrow="Stay in touch"
              title={brand.copy.newsletterHeading}
              description={brand.copy.newsletterBody}
              align="center"
            />
            <div className="mt-8">
              <NewsletterSignup />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
