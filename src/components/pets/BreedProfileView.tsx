import type { BreedProfile } from "@/domain/pets/types";

function Score({ label, value }: { label: string; value?: number }) {
  if (!value) return null;
  return <div className="flex items-center justify-between gap-4 border-b border-border py-3 text-sm"><span className="text-muted-foreground">{label}</span><strong className="text-foreground">{value}/5</strong></div>;
}

export function BreedProfileView({ breed }: { breed: BreedProfile }) {
  return (
    <article className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)] lg:items-center">
        <div>
          <p className="eyebrow text-primary">PetsDefined / {breed.petKind === "dog" ? "Dog breed" : "Cat breed"}</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-foreground sm:text-6xl lg:text-7xl">{breed.name}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{breed.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {breed.temperament.map((trait) => <span key={trait} className="rounded-full bg-muted px-3 py-1.5 text-sm text-foreground">{trait}</span>)}
          </div>
        </div>
        <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm leading-6 text-muted-foreground">
          Hero photography is intentionally blocked until image rights are verified.
        </div>
      </header>

      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
        <div className="space-y-10">
          <section>
            <p className="eyebrow text-primary">At a glance</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Size", breed.sizeLabel], ["Weight", breed.weightRange], ["Height", breed.heightRange], ["Life expectancy", breed.lifeExpectancy], ["Coat", breed.coat], ["Origin", breed.origin],
              ].filter(([, value]) => value).map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p><p className="mt-2 text-base font-semibold text-foreground">{value}</p></div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border p-6">
              <h2 className="font-display text-2xl text-foreground">A good fit for</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">{breed.goodFitFor.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <h2 className="font-display text-2xl text-foreground">Reconsider if</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">{breed.reconsiderIf.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          </section>

          {[
            ["Training", breed.trainingOverview],
            ["Grooming", breed.groomingOverview],
            ["Feeding", breed.feedingOverview],
            ["Health considerations", breed.healthConsiderations],
            ["History", breed.history],
          ].filter(([, body]) => Array.isArray(body) && body.length).map(([title, body]) => (
            <section key={title as string}>
              <h2 className="font-display text-3xl text-foreground">{title}</h2>
              <div className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">{(body as string[]).map((p) => <p key={p}>{p}</p>)}</div>
            </section>
          ))}

          <section>
            <h2 className="font-display text-3xl text-foreground">Questions to ask a breeder or rescue</h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">{breed.breederOrRescueQuestions.map((q) => <li key={q}>• {q}</li>)}</ul>
          </section>

          <section>
            <h2 className="font-display text-3xl text-foreground">Frequently asked questions</h2>
            <div className="mt-5 divide-y divide-border rounded-2xl border border-border px-6">
              {breed.faq.map((item) => <div key={item.question} className="py-5"><h3 className="font-semibold text-foreground">{item.question}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p></div>)}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-muted/20 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-foreground">Ownership profile</h2>
          <div className="mt-3">
            <Score label="Energy" value={breed.energy} />
            <Score label="Trainability" value={breed.trainability} />
            <Score label="Children" value={breed.childCompatibility} />
            <Score label="Other dogs" value={breed.dogCompatibility} />
            <Score label="Cats" value={breed.catCompatibility} />
            <Score label="Apartment fit" value={breed.apartmentSuitability} />
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground">
            <p><strong className="text-foreground">Exercise:</strong> {breed.exercise}</p>
            <p><strong className="text-foreground">Grooming:</strong> {breed.grooming}</p>
            <p><strong className="text-foreground">Shedding:</strong> {breed.shedding}</p>
          </div>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">Breed-level tendencies are not guarantees. Individual temperament, health, training, environment, and history matter.</p>
        </aside>
      </section>
    </article>
  );
}
