import { createFileRoute } from "@tanstack/react-router";

import { ResourceLanding } from "@/components/pets/ResourceLanding";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Pet Tools & Calculators | PetsDefined" },
      { name: "description", content: "Practical pet calculators, checklists, selectors, and ownership planning tools." },
    ],
  }),
  component: ToolsLanding,
});

function ToolsLanding() {
  return (
    <ResourceLanding
      eyebrow="PetsDefined / Tools"
      title="Useful tools for pet owners"
      description="Calculators and checklists should answer a real ownership question, not exist just to create another indexable page. Tools that depend on uncertain assumptions explain those assumptions instead of presenting estimates as facts."
      cards={[
        {
          title: "Pet cost planner",
          body: "Build a monthly, annual, first-year, and five-year ownership budget from your own food, care, insurance, grooming, supplies, and setup assumptions.",
          to: "/tools/pet-cost-planner",
        },
        {
          title: "Dog age calculator",
          body: "Planned: estimate life-stage equivalents without pretending every breed ages at the same rate. This stays unpublished until the model and sourcing are strong enough.",
        },
        {
          title: "Breed fit selector",
          body: "Planned: filter by size, energy, grooming, trainability, household needs, and realistic constraints. Results will explain tradeoffs rather than produce a simplistic 'best breed' verdict.",
        },
      ]}
    />
  );
}
