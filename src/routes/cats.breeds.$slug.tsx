import { createFileRoute, notFound } from "@tanstack/react-router";
import { BreedProfileView } from "@/components/pets/BreedProfileView";
import { breedBySlug } from "@/data/pets/fixtures";

export const Route = createFileRoute("/cats/breeds/$slug")({
  loader: ({ params }) => {
    const breed = breedBySlug(params.slug);
    if (!breed || breed.petKind !== "cat") throw notFound();
    return breed;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData.name} | PetsDefined` }, { name: "description", content: loaderData.summary }] }),
  component: CatBreedProfile,
});

function CatBreedProfile() {
  const breed = Route.useLoaderData();
  return <BreedProfileView breed={breed} />;
}
