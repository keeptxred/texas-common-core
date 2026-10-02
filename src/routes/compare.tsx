import { createFileRoute } from "@tanstack/react-router";
import { ResourceLanding } from "@/components/pets/ResourceLanding";
export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare Pets & Breeds | PetsDefined" }, { name: "description", content: "Side-by-side pet and breed comparisons focused on ownership fit, care, temperament, cost, and daily life." }] }),
  component: CompareLanding,
});
function CompareLanding() {
  return <ResourceLanding eyebrow="PetsDefined / Compare" title="Compare before you commit" description="Side-by-side comparisons focus on the differences that actually change daily ownership." cards={[
    { title: "Golden Retriever vs Labrador Retriever", body: "Energy, grooming, temperament, trainability, size, and household fit." },
    { title: "Maine Coon vs Ragdoll", body: "Size, coat care, activity, social style, and home setup." },
    { title: "Dog breed comparisons", body: "A growing library of practical breed-to-breed comparisons." },
  ]} />;
}
