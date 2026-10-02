import { Link } from "@tanstack/react-router";
import type { BreedProfile } from "@/domain/pets/types";

export function BreedDirectory({ title, description, breeds, kind }: { title: string; description: string; breeds: BreedProfile[]; kind: "dog" | "cat" }) {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
      <header className="max-w-4xl">
        <p className="eyebrow text-primary">PetsDefined / Breeds</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-foreground sm:text-6xl">{title}</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {breeds.map((breed) => (
          <Link key={breed.id} to={kind === "dog" ? "/dogs/breeds/$slug" : "/cats/breeds/$slug"} params={{ slug: breed.slug }} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex aspect-[8/5] items-center justify-center rounded-xl bg-muted px-4 text-center text-sm text-muted-foreground">Verified breed photography will appear here before publication</div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{breed.sizeLabel}{breed.breedGroup ? ` · ${breed.breedGroup}` : ""}</p>
            <h2 className="mt-2 font-display text-2xl text-foreground">{breed.name}</h2>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{breed.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1">Energy {breed.energy}/5</span>
              <span className="rounded-full bg-muted px-3 py-1">Trainability {breed.trainability}/5</span>
              <span className="rounded-full bg-muted px-3 py-1">Grooming: {breed.grooming}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
