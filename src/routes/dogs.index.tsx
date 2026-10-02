import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
import { breedsFor } from "@/data/pets/fixtures";

export const Route = createFileRoute("/dogs/")({
  head: () => ({ meta: [{ title: "Dogs | PetsDefined" }, { name: "description", content: "Dog breeds, training, behavior, nutrition, care, ownership, and practical tools from PetsDefined." }] }),
  component: DogsHome,
});

function DogsHome() { return <PetHub kind="dog" breeds={breedsFor("dog")} />; }
