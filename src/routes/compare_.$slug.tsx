import { createFileRoute, notFound } from "@tanstack/react-router";

import { petsDefinedBrand } from "@/brand/petsdefined";
import { BreedComparisonView } from "@/components/pets/BreedComparisonView";
import { getBreedComparison } from "@/data/pets/comparisons";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const result = getBreedComparison(params.slug);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: buildMeta(petsDefinedBrand, {
      title: loaderData.comparison.title,
      description: loaderData.comparison.summary,
    }),
    links: [canonicalLink(petsDefinedBrand, `/compare/${loaderData.comparison.slug}`)],
  }),
  component: ComparisonPage,
});

function ComparisonPage() {
  const { comparison, left, right } = Route.useLoaderData();
  return <BreedComparisonView comparison={comparison} left={left} right={right} />;
}
