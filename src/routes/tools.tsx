import { createFileRoute } from "@tanstack/react-router";
import { ResourceLanding } from "@/components/pets/ResourceLanding";
export const Route = createFileRoute("/tools")({
  head: () => ({ meta: [{ title: "Pet Tools & Calculators | PetsDefined" }, { name: "description", content: "Practical pet calculators, checklists, selectors, and ownership planning tools." }] }),
  component: ToolsLanding,
});
function ToolsLanding() {
  return <ResourceLanding eyebrow="PetsDefined / Tools" title="Useful tools for pet owners" description="Calculators and checklists should answer a real ownership question, not exist just to create another indexable page." cards={[
    { title: "Dog age calculator", body: "Estimate life-stage equivalents without pretending every breed ages at the same rate." },
    { title: "Pet cost planner", body: "Plan recurring and one-time ownership costs by animal type and life stage." },
    { title: "Breed fit selector", body: "Filter by size, energy, grooming, trainability, household needs, and realistic constraints." },
  ]} />;
}
