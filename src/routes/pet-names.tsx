import { createFileRoute } from "@tanstack/react-router";
import { ResourceLanding } from "@/components/pets/ResourceLanding";
export const Route = createFileRoute("/pet-names")({
  head: () => ({ meta: [{ title: "Pet Names | PetsDefined" }, { name: "description", content: "Pet name ideas organized by animal, personality, appearance, theme, and practical naming considerations." }] }),
  component: PetNamesLanding,
});
function PetNamesLanding() {
  return <ResourceLanding eyebrow="PetsDefined / Names" title="Pet names with a little more thought" description="Name collections will be curated around useful themes instead of thousands of thin generated list pages." cards={[
    { title: "Dog names", body: "Names by style, personality, size, color, breed history, and sound." },
    { title: "Cat names", body: "Names by personality, coat, mythology, literature, and everyday usability." },
    { title: "Bird, fish & reptile names", body: "Species-aware ideas that avoid repeating the same generic list across every animal." },
  ]} />;
}
