import { Link } from "@tanstack/react-router";

import { researchQueueFor } from "@/data/pets/species";
import type { BreedProfile, PetKind } from "@/domain/pets/types";

const labels: Record<PetKind, { title: string; eyebrow: string; description: string }> = {
  dog: { title: "Dogs", eyebrow: "PetsDefined / Dogs", description: "Breed profiles, training, behavior, nutrition, care, ownership, and practical tools for dog people." },
  cat: { title: "Cats", eyebrow: "PetsDefined / Cats", description: "Breed profiles, behavior, enrichment, nutrition, care, and ownership guidance for cats." },
  bird: { title: "Birds", eyebrow: "PetsDefined / Birds", description: "Species profiles, housing, nutrition, enrichment, handling, and responsible bird care." },
  fish: { title: "Fish", eyebrow: "PetsDefined / Fish", description: "Species profiles, aquarium setup, water quality, feeding, compatibility, and practical fishkeeping guides." },
  reptile: { title: "Reptiles", eyebrow: "PetsDefined / Reptiles", description: "Species profiles, habitat design, heat and lighting, nutrition, handling, and long-term care." },
  "small-pet": { title: "Small Pets", eyebrow: "PetsDefined / Small Pets", description: "Rabbits, guinea pigs, hamsters, ferrets, and other small companion animals." },
  horse: { title: "Horses", eyebrow: "PetsDefined / Horses", description: "Ownership basics, care, feeding, equipment, behavior, and practical horse guides." },
};

export function PetHub({ kind, breeds = [] }: { kind: PetKind; breeds?: BreedProfile[] }) {
  const copy = labels[kind];
  const breedPath = kind === "dog" ? "/dogs/breeds" : kind === "cat" ? "/cats/breeds" : null;
  const researchQueue = researchQueueFor(kind);

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
      <section className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,.6fr)] lg:items-end">
        <div>
          <p className="eyebrow text-primary">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{copy.description}</p>
        </div>
        <aside className="rounded-2xl border border-border bg-muted/30 p-6">
          <p className="text-sm font-semibold text-foreground">Built around ownership decisions</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">We separate verified facts, practical guidance, and individual variation instead of treating a breed or species label as a guarantee.</p>
        </aside>
      </section>

      {breedPath && (
        <section className="py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-primary">Start here</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">Breed guides</h2>
            </div>
            <Link to={breedPath} className="text-sm font-semibold text-primary hover:underline">View all breeds</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {breeds.slice(0, 6).map((breed) => (
              <Link key={breed.id} to={kind === "dog" ? "/dogs/breeds/$slug" : "/cats/breeds/$slug"} params={{ slug: breed.slug }} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex aspect-[8/5] items-center justify-center rounded-xl bg-muted text-center text-sm text-muted-foreground">
                  Verified photography queued
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{breed.sizeLabel} · {breed.breedGroup ?? "Companion"}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{breed.name}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{breed.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!breedPath && researchQueue.length > 0 && (
        <section className="py-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Launch research queue</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">Species profiles being built</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              These are research targets, not published care pages. A species does not become indexable until its sources, care fields, health considerations, and image rights pass the publication gate.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {researchQueue.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.status.replaceAll("-", " ")}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Research scope: {item.focusAreas.join(", ")}.
                </p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">Not yet publishable or indexable</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 border-t border-border py-10 md:grid-cols-3">
        {[
          ["Care", "Everyday routines, grooming, habitat, and preventative ownership basics."],
          ["Behavior & training", "Practical guidance built around humane, repeatable methods."],
          ["Products & tools", "Optional gear guidance and calculators without turning every article into a storefront."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-border p-6">
            <h2 className="font-display text-2xl text-foreground">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
