import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
import { breedsFor } from "@/data/pets/fixtures";

export const Route = createFileRoute("/cats/")({
  head: () => ({ meta: [{ title: "Cats | PetsDefined" }, { name: "description", content: "Cat breeds, behavior, nutrition, care, enrichment, and ownership guidance from PetsDefined." }] }),
  component: CatsHome,
});

function CatsHome() { return <PetHub kind="cat" breeds={breedsFor("cat")} />; }
