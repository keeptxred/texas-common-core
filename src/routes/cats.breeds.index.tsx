import { createFileRoute } from "@tanstack/react-router";
import { BreedDirectory } from "@/components/pets/BreedDirectory";
import { breedsFor } from "@/data/pets/fixtures";

export const Route = createFileRoute("/cats/breeds/")({
  head: () => ({ meta: [{ title: "Cat Breeds | PetsDefined" }, { name: "description", content: "Browse practical, sourced cat breed profiles with temperament, grooming, health, activity, and ownership fit guidance." }] }),
  component: CatBreeds,
});

function CatBreeds() {
  return <BreedDirectory kind="cat" title="Cat breeds" description="Compare cat breeds by size, energy, grooming, temperament, and the realities of living with them." breeds={breedsFor("cat")} />;
}
