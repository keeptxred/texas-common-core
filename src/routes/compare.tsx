import { createFileRoute } from "@tanstack/react-router";

import { ResourceLanding } from "@/components/pets/ResourceLanding";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Pets & Breeds | PetsDefined" },
      { name: "description", content: "Side-by-side pet and breed comparisons focused on ownership fit, care, temperament, cost, and daily life." },
    ],
  }),
  component: CompareLanding,
});

function CompareLanding() {
  return (
    <ResourceLanding
      eyebrow="PetsDefined / Compare"
      title="Compare before you commit"
      description="Side-by-side comparisons focus on differences that can change daily ownership. Breed tendencies are context, not guarantees about an individual animal."
      cards={[
        {
          title: "Golden Retriever vs Labrador Retriever",
          body: "Compare size, coat care, shedding, energy, exercise, trainability, household compatibility, and practical ownership fit.",
          to: "/compare/golden-retriever-vs-labrador-retriever",
        },
        {
          title: "Maine Coon vs Ragdoll",
          body: "Compare size, coat care, activity, social tendencies, household compatibility, and practical ownership fit.",
          to: "/compare/maine-coon-vs-ragdoll",
        },
        {
          title: "More comparisons",
          body: "The comparison library grows only when both underlying profiles have enough sourced information to support a useful side-by-side view.",
        },
      ]}
    />
  );
}
