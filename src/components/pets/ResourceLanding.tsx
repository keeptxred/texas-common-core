import { Link } from "@tanstack/react-router";

export function ResourceLanding({ eyebrow, title, description, cards }: { eyebrow: string; title: string; description: string; cards: { title: string; body: string; to?: string }[] }) {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
      <header className="max-w-4xl">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight text-foreground sm:text-6xl">{title}</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      </header>
      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const content = <><h2 className="font-display text-2xl text-foreground">{card.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{card.body}</p></>;
          return card.to ? <Link key={card.title} to={card.to} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md">{content}</Link> : <article key={card.title} className="rounded-2xl border border-border bg-card p-6">{content}</article>;
        })}
      </section>
    </div>
  );
}
