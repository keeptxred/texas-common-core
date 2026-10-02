import { Link } from "@tanstack/react-router";

import { petSources } from "@/data/pets/fixtures";
import type { SpeciesProfile } from "@/domain/pets/types";
import { validateSpeciesForPublication } from "@/domain/pets/publicationGate";

const kindBackLinks: Record<SpeciesProfile["petKind"], string> = {
  dog: "/dogs",
  cat: "/cats",
  bird: "/birds",
  fish: "/fish",
  reptile: "/reptiles",
  "small-pet": "/small-pets",
  horse: "/horses",
};

export function SpeciesProfileView({ species }: { species: SpeciesProfile }) {
  const gate = validateSpeciesForPublication(species);
  const sources = species.sourceIds
    .map((id) => petSources.find((source) => source.id === id))
    .filter((source): source is NonNullable<typeof source> => Boolean(source));

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
      {!gate.publishable && (
        <div className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm leading-6 text-foreground">
          <strong>Pre-publication profile.</strong> This page template is visible in development, but this record has not cleared PetsDefined's publication gate and must not be included in the production sitemap.
        </div>
      )}

      <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
        <div>
          <p className="eyebrow text-primary">PetsDefined / {species.petKind.replace("-", " ")}</p>
          <h1 className="mt-3 font-display text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">{species.name}</h1>
          {species.scientificName && <p className="mt-3 text-sm italic text-muted-foreground">{species.scientificName}</p>}
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{species.summary}</p>
        </div>
        <div className="flex aspect-[8/5] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 px-6 text-center text-sm text-muted-foreground">
          {species.hero.rightsVerified ? species.hero.alt : "Verified species photography required before publication"}
        </div>
      </header>

      <section className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Adult size" value={species.adultSize ?? "Not yet documented"} />
        <Fact label="Life expectancy" value={species.lifeExpectancy ?? "Not yet documented"} />
        <Fact label="Care level" value={species.careLevel} />
        <Fact label="Beginner suitability" value={species.beginnerSuitability ? `${species.beginnerSuitability}/5` : "Not yet rated"} />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <InfoCard title="Habitat requirements" items={species.habitatRequirements} />
        <InfoCard title="Diet overview" items={species.dietOverview} />
        <InfoCard title="Social needs" items={species.socialNeeds} />
        <InfoCard title="Handling notes" items={species.handlingNotes} />
        <InfoCard title="Health considerations" items={species.healthConsiderations} />
        {species.legalOrPermitNotes && species.legalOrPermitNotes.length > 0 && (
          <InfoCard title="Legal or permit notes" items={species.legalOrPermitNotes} />
        )}
      </section>

      {species.faq.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <p className="eyebrow text-primary">FAQ</p>
          <h2 className="mt-2 font-display text-3xl">Common ownership questions</h2>
          <div className="mt-6 divide-y divide-border">
            {species.faq.map((item) => (
              <div key={item.question} className="py-5">
                <h3 className="font-semibold text-foreground">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-border pt-8">
        <p className="eyebrow text-primary">Sources</p>
        <h2 className="mt-2 font-display text-3xl">Research sources</h2>
        {sources.length > 0 ? (
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
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Source review is still required.</p>
        )}
      </section>

      <div className="mt-10 border-t border-border pt-6">
        <Link to={kindBackLinks[species.petKind]} className="text-sm font-semibold text-primary hover:underline">
          ← Back to {species.petKind.replace("-", " ")} guides
        </Link>
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold capitalize text-foreground">{value}</p>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-border p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      {items.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
          {items.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Research required before publication.</p>
      )}
    </article>
  );
}
