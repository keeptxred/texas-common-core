import { createFileRoute } from "@tanstack/react-router";

import { activeBrand } from "@/brand/active";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "How PetsDefined researches, reviews, sources, updates, and publishes pet information.";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: buildMeta(activeBrand, { title: "Editorial Policy", description }),
    links: [canonicalLink(activeBrand, "/editorial-policy")],
  }),
  component: EditorialPolicyPage,
});

const sections = [
  {
    title: "Usefulness comes first",
    body: "We publish pages to answer a real owner or prospective-owner question, not simply because a keyword can generate a page. Breed and species profiles must contain meaningful ownership context rather than directory-style facts alone.",
  },
  {
    title: "Source requirements",
    body: "Factual claims should be supported by credible sources appropriate to the topic. Primary organizations, veterinary or academic references, recognized breed or species organizations, government sources, and other authoritative materials are preferred where available. Publication gates require source coverage before a page is treated as complete.",
  },
  {
    title: "Health and safety information",
    body: "PetsDefined provides general educational information and does not replace a veterinarian or other qualified professional. Pages involving health, nutrition, toxicity, medication, or safety require especially careful sourcing and clear limits on what general guidance can establish.",
  },
  {
    title: "Ownership fit",
    body: "Breed and species pages should discuss both strengths and practical drawbacks. We avoid presenting popularity as suitability and include reasons a household may want to reconsider a particular animal.",
  },
  {
    title: "Images and rights",
    body: "Animal pages should use clear, relevant imagery. Every publishable image should have a known source and verified usage rights or a documented license. Unverified imagery remains blocked from publication.",
  },
  {
    title: "Updates and corrections",
    body: "Material changes should update the page's modified date only when substantive content changes. Corrections should replace inaccurate information rather than preserve it for freshness signals. Time-sensitive claims should be reviewed on a schedule appropriate to the subject.",
  },
  {
    title: "Commerce independence",
    body: "Affiliate relationships may support the site, but they do not determine whether a topic is covered or whether a product is described positively. Commerce modules are optional and should not be required to complete an editorial page.",
  },
];

function EditorialPolicyPage() {
  return (
    <Container className="max-w-4xl py-16 sm:py-24">
      <p className="eyebrow text-primary">Standards</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Editorial Policy</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="border-t border-border pt-6">
            <h2 className="font-display text-3xl">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
