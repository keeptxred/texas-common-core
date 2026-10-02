import { createFileRoute } from "@tanstack/react-router";
import { BreedDirectory } from "@/components/pets/BreedDirectory";
import { breedsFor } from "@/data/pets/fixtures";

export const Route = createFileRoute("/dogs/breeds/")({
  head: () => ({ meta: [{ title: "Dog Breeds | PetsDefined" }, { name: "description", content: "Browse practical, sourced dog breed profiles with temperament, care, exercise, grooming, health, and ownership fit guidance." }] }),
  component: DogBreeds,
});

function DogBreeds() {
  return <BreedDirectory kind="dog" title="Dog breeds" description="Compare dog breeds by size, energy, trainability, grooming, temperament, and the realities of living with them." breeds={breedsFor("dog")} />;
}
