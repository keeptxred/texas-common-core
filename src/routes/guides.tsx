import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { activeBrand } from "@/brand/active";
import { useBrand } from "@/brand/context";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { petGuideIndex } from "@/data/pets/guideIndex";
import { buildMeta, canonicalLink } from "@/lib/seo";

const texasDescription =
  "Calculators, checklists and reference tables for living in Texas — property taxes, cost of living, road-trip planning and moving logistics.";
const petsDescription =
  "Practical pet-owner guides covering getting started, everyday care, training, behavior, nutrition, grooming, and travel.";

export const Route = createFileRoute("/guides")({
  head: () => {
    const description = activeBrand.identity.id === "petsdefined" ? petsDescription : texasDescription;
    return {
      meta: buildMeta(activeBrand, { title: "Guides & Tools", description }),
      links: [canonicalLink(activeBrand, "/guides")],
    };
  },
  loader: async ({ context }) => {
    if (activeBrand.identity.id === "petsdefined") return;
    await context.queryClient.ensureQueryData(guidesQuery());
  },
  component: GuidesPage,
});

function GuidesPage() {
  const brand = useBrand();
  if (brand.identity.id === "petsdefined") return <PetsGuidesPage />;
  return <TexasGuidesPage />;
}

function PetsGuidesPage() {
  const sections = [...new Set(petGuideIndex.map((guide) => guide.section))];

  return (
    <>
      <Container className="pb-8 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Guides</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">
          Practical pet guidance for the decisions owners actually make.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          PetsDefined guides are organized around real ownership tasks rather than search-keyword volume. Every guide must clear sourcing, depth, image-rights, and editorial-quality checks before it is marked publishable.
        </p>
      </Container>

      {sections.map((section, index) => {
        const guides = petGuideIndex.filter((guide) => guide.section === section);
        return (
          <Section key={section} tone={index % 2 === 1 ? "surface" : "default"}>
            <Container>
              <SectionHeader eyebrow="PetsDefined" title={section} />
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                  <article key={guide.slug} className="rounded-sm border border-border bg-background p-6">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">
                      <span>{guide.pet.replace("-", " ")}</span>
                      <span aria-hidden="true">·</span>
                      <span>{guide.status.replaceAll("-", " ")}</span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl">{guide.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
                    <p className="mt-5 text-xs font-medium text-primary">
                      Research and publication checks required before launch
                    </p>
                  </article>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}

function TexasGuidesPage() {
  const brand = useBrand();
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const topics = [...new Set(guides.map((guide) => guide.topic))];

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Guides &amp; Tools</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Practical Texas, worked out
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {texasDescription} {brand.copy.comingSoonBody}
        </p>
      </Container>

      {topics.map((topic, index) => (
        <Section key={topic} tone={index % 2 === 1 ? "surface" : "default"}>
          <Container>
            <SectionHeader eyebrow={topic} title={`${topic} tools`} />
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides
                .filter((guide) => guide.topic === topic)
                .map((guide) => (
                  <li key={guide.id}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
            </ul>
          </Container>
        </Section>
      ))}
    </>
  );
}
