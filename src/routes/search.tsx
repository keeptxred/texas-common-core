import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { activeBrand } from "@/brand/active";
import { useBrand } from "@/brand/context";
import { Container } from "@/components/layout/Container";
import { searchDocumentsQuery } from "@/data/queries";
import { breedFixtures } from "@/data/pets/fixtures";
import { petGuideIndex } from "@/data/pets/guideIndex";
import { search, type SearchHit } from "@/domain/search/engine";
import { buildMeta, canonicalLink } from "@/lib/seo";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      ...buildMeta(activeBrand, {
        title: "Search",
        description:
          activeBrand.identity.id === "petsdefined"
            ? "Search PetsDefined breeds, pet guides, care topics, and ownership resources."
            : "Search stories, destinations, guides, events and shop goods across Texas.",
      }),
      { name: "robots", content: "noindex" },
    ],
    links: [canonicalLink(activeBrand, "/search")],
  }),
  loader: async ({ context }) => {
    if (activeBrand.identity.id === "petsdefined") return;
    await context.queryClient.ensureQueryData(searchDocumentsQuery());
  },
  component: SearchPage,
});

function SearchPage() {
  const brand = useBrand();
  if (brand.identity.id === "petsdefined") return <PetsSearchPage />;
  return <TexasSearchPage />;
}

function SearchForm({
  query,
  label,
  placeholder,
}: {
  query: string;
  label: string;
  placeholder: string;
}) {
  const navigate = useNavigate({ from: "/search" });

  return (
    <form
      className="mt-8 flex max-w-xl gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const value = new FormData(event.currentTarget).get("q");
        void navigate({ search: { q: String(value ?? "") } });
      }}
    >
      <label htmlFor="q" className="sr-only">{label}</label>
      <input
        id="q"
        name="q"
        defaultValue={query}
        placeholder={placeholder}
        className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="shrink-0 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Search
      </button>
    </form>
  );
}

function PetsSearchPage() {
  const { q } = Route.useSearch();
  const query = (q ?? "").trim();
  const normalized = query.toLowerCase();

  const breedResults = normalized
    ? breedFixtures.filter((breed) =>
        [
          breed.name,
          breed.summary,
          breed.petKind,
          breed.breedGroup ?? "",
          ...breed.temperament,
          ...breed.aliases,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
    : [];

  const guideResults = normalized
    ? petGuideIndex.filter((guide) =>
        [guide.title, guide.summary, guide.section, guide.pet]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
    : [];

  const resultCount = breedResults.length + guideResults.length;

  return (
    <Container className="min-h-[60vh] py-16 sm:py-24">
      <p className="eyebrow text-primary">Search PetsDefined</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Find a breed or guide</h1>
      <SearchForm
        query={query}
        label="Search PetsDefined"
        placeholder="Golden Retriever, shedding, crate training…"
      />

      {query && (
        <p className="mt-6 text-sm text-muted-foreground">
          {resultCount} result{resultCount === 1 ? "" : "s"} for “{query}”
        </p>
      )}

      <ul className="mt-8 max-w-3xl">
        {breedResults.map((breed) => (
          <li key={breed.id} className="border-t border-border py-5">
            <p className="eyebrow text-primary">{breed.petKind} breed</p>
            <Link
              to={breed.petKind === "cat" ? "/cats/breeds/$slug" : "/dogs/breeds/$slug"}
              params={{ slug: breed.slug }}
              className="mt-1 block font-display text-xl"
            >
              {breed.name}
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{breed.summary}</p>
          </li>
        ))}

        {guideResults.map((guide) => (
          <li key={guide.slug} className="border-t border-border py-5">
            <p className="eyebrow text-primary">{guide.section}</p>
            <Link to="/guides" className="mt-1 block font-display text-xl">{guide.title}</Link>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
            <p className="mt-2 text-xs font-medium text-muted-foreground">Pre-publication guide index</p>
          </li>
        ))}
      </ul>

      {query && resultCount === 0 && (
        <div className="mt-10 max-w-2xl rounded-sm border border-border bg-surface p-6">
          <h2 className="font-display text-2xl">Nothing matched yet.</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            PetsDefined is still building its launch library. Try a breed name, pet type, training topic, grooming term, or browse the guides section.
          </p>
        </div>
      )}
    </Container>
  );
}

function TexasSearchPage() {
  const { q } = Route.useSearch();
  const { data: documents } = useSuspenseQuery(searchDocumentsQuery());
  const query = q ?? "";
  const results: SearchHit[] = query
    ? search(documents, { term: query, brandId: "texasdefined" })
    : [];

  return (
    <Container className="min-h-[60vh] py-16 sm:py-24">
      <p className="eyebrow text-primary">Search</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Find it</h1>
      <SearchForm
        query={query}
        label="Search TexasDefined"
        placeholder="Caddo Lake, brisket, property tax…"
      />

      {query && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </p>
      )}

      <ul className="mt-8 max-w-2xl">
        {results.map((result) => (
          <li key={result.document.id} className="border-t border-border py-5">
            <p className="eyebrow text-primary">{result.document.kind}</p>
            <Link to={result.document.href} className="mt-1 block font-display text-xl">
              {result.document.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{result.document.summary}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
