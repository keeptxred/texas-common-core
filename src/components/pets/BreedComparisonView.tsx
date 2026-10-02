import { Link } from "@tanstack/react-router";

import { petSources } from "@/data/pets/fixtures";
import type { BreedProfile, PetComparison } from "@/domain/pets/types";

function breedHref(breed: BreedProfile): "/dogs/breeds/$slug" | "/cats/breeds/$slug" {
  return breed.petKind === "cat" ? "/cats/breeds/$slug" : "/dogs/breeds/$slug";
}

export function BreedComparisonView({
  comparison,
  left,
  right,
}: {
  comparison: PetComparison;
  left: BreedProfile;
  right: BreedProfile;
}) {
  const sources = comparison.sourceIds
    .map((id) => petSources.find((source) => source.id === id))
    .filter((source): source is NonNullable<typeof source> => Boolean(source));

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
      <header className="max-w-5xl">
        <p className="eyebrow text-primary">PetsDefined / Compare</p>
        <h1 className="mt-3 font-display text-5xl leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {comparison.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          {comparison.summary}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
          These are breed-level tendencies and profile estimates, not predictions about an individual animal. Health, behavior, training, socialization, environment, age, and individual temperament can matter more than a breed label in daily life.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {[left, right].map((breed) => (
          <article key={breed.id} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex aspect-[8/5] items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-center text-sm text-muted-foreground">
              Verified photography queued
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {breed.sizeLabel} · {breed.breedGroup ?? "Companion"}
            </p>
            <h2 className="mt-2 font-display text-3xl">{breed.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{breed.summary}</p>
            <Link
              to={breedHref(breed)}
              params={{ slug: breed.slug }}
              className="mt-5 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Read the full {breed.name} profile →
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-12 overflow-hidden rounded-2xl border border-border">
        <div className="grid grid-cols-[minmax(120px,.8fr)_minmax(0,1fr)_minmax(0,1fr)] bg-surface px-4 py-4 text-sm font-semibold sm:px-6">
          <div>Ownership factor</div>
          <div>{left.name}</div>
          <div>{right.name}</div>
        </div>
        <div className="divide-y divide-border">
          {comparison.dimensions.map((dimension) => (
            <div key={dimension.label} className="grid grid-cols-[minmax(120px,.8fr)_minmax(0,1fr)_minmax(0,1fr)] gap-y-2 px-4 py-5 sm:px-6">
              <div className="pr-4 text-sm font-semibold text-foreground">{dimension.label}</div>
              <div className="pr-4 text-sm text-foreground">{dimension.left}</div>
              <div className="text-sm text-foreground">{dimension.right}</div>
              {dimension.notes && (
                <p className="col-span-3 mt-1 text-xs leading-5 text-muted-foreground">{dimension.notes}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        {[left, right].map((breed) => (
          <article key={`${breed.id}-fit`} className="rounded-2xl border border-border p-6">
            <h2 className="font-display text-3xl">Living with a {breed.name}</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">May fit households that…</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                  {breed.goodFitFor.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">May be a poor fit if…</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                  {breed.reconsiderIf.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <p className="eyebrow text-primary">Sources</p>
        <h2 className="mt-2 font-display text-3xl">Profile sources used in this comparison</h2>
        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          {sources.map((source) => (
            <li key={source.id}>
              <a href={source.url} rel="nofollow" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary">
                {source.label}
              </a>
              {source.publisher ? ` — ${source.publisher}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 border-t border-border pt-6">
        <Link to="/compare" className="text-sm font-semibold text-primary hover:underline">← Back to comparisons</Link>
      </div>
    </main>
  );
}
