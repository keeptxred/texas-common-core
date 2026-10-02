import { createFileRoute, notFound } from "@tanstack/react-router";
import { BreedProfileView } from "@/components/pets/BreedProfileView";
import { breedBySlug } from "@/data/pets/fixtures";

export const Route = createFileRoute("/dogs/breeds/$slug")({
  loader: ({ params }) => {
    const breed = breedBySlug(params.slug);
    if (!breed || breed.petKind !== "dog") throw notFound();
    return breed;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.name} | PetsDefined` },
      { name: "description", content: loaderData.summary },
    ],
  }),
  component: DogBreedProfile,
});

function DogBreedProfile() {
  const breed = Route.useLoaderData();
  return <BreedProfileView breed={breed} />;
}
