import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { petsDefinedBrand } from "@/brand/petsdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Estimate monthly, annual, and five-year pet ownership costs using your own food, care, insurance, grooming, supplies, and one-time expense assumptions.";

export const Route = createFileRoute("/tools/pet-cost-planner")({
  head: () => ({
    meta: buildMeta(petsDefinedBrand, { title: "Pet Cost Planner", description }),
    links: [canonicalLink(petsDefinedBrand, "/tools/pet-cost-planner")],
  }),
  component: PetCostPlanner,
});

type Costs = {
  food: number;
  routineCare: number;
  insurance: number;
  grooming: number;
  supplies: number;
  otherMonthly: number;
  annualExtra: number;
  setup: number;
};

const initialCosts: Costs = {
  food: 60,
  routineCare: 25,
  insurance: 0,
  grooming: 0,
  supplies: 20,
  otherMonthly: 0,
  annualExtra: 300,
  setup: 250,
};

const monthlyFields: { key: keyof Costs; label: string; help: string }[] = [
  { key: "food", label: "Food per month", help: "Food, treats, and routine feeding supplies." },
  { key: "routineCare", label: "Routine care reserve per month", help: "A monthly reserve for routine veterinary and preventive care." },
  { key: "insurance", label: "Insurance per month", help: "Enter 0 if you do not plan to carry pet insurance." },
  { key: "grooming", label: "Grooming per month", help: "Professional grooming or a monthly average of at-home grooming costs." },
  { key: "supplies", label: "Supplies per month", help: "Litter, waste bags, bedding, toys, enrichment, filters, substrate, or similar recurring items." },
  { key: "otherMonthly", label: "Other recurring costs", help: "Training, boarding reserve, medications, walkers, daycare, or another recurring category." },
];

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function PetCostPlanner() {
  const [costs, setCosts] = useState<Costs>(initialCosts);

  const totals = useMemo(() => {
    const monthly = monthlyFields.reduce((sum, field) => sum + Math.max(0, costs[field.key]), 0);
    const annual = monthly * 12 + Math.max(0, costs.annualExtra);
    const fiveYear = annual * 5 + Math.max(0, costs.setup);
    const firstYear = annual + Math.max(0, costs.setup);
    return { monthly, annual, firstYear, fiveYear };
  }, [costs]);

  const update = (key: keyof Costs, raw: string) => {
    const value = Number(raw);
    setCosts((current) => ({ ...current, [key]: Number.isFinite(value) ? Math.max(0, value) : 0 }));
  };

  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-4xl">
        <p className="eyebrow text-primary">PetsDefined / Tools</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Pet Cost Planner</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is a budgeting tool, not a claim about what a particular pet will cost. Replace every starting number with your own estimates before using the result for planning.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-3xl">Your assumptions</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {monthlyFields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-sm font-semibold text-foreground">{field.label}</span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">{field.help}</span>
                <div className="mt-2 flex items-center rounded-md border border-input bg-background focus-within:border-primary">
                  <span className="pl-3 text-muted-foreground">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={costs[field.key]}
                    onChange={(event) => update(field.key, event.target.value)}
                    className="w-full bg-transparent px-2 py-3 text-sm outline-none"
                  />
                </div>
              </label>
            ))}

            <label className="block">
              <span className="text-sm font-semibold text-foreground">Extra annual costs</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">Licensing, annual equipment replacement, boarding reserve, routine testing, or another yearly expense.</span>
              <div className="mt-2 flex items-center rounded-md border border-input bg-background focus-within:border-primary">
                <span className="pl-3 text-muted-foreground">$</span>
                <input type="number" min="0" step="1" value={costs.annualExtra} onChange={(event) => update("annualExtra", event.target.value)} className="w-full bg-transparent px-2 py-3 text-sm outline-none" />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground">One-time setup</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">Adoption or purchase costs, enclosure, crate, carrier, initial equipment, deposits, or similar startup expenses.</span>
              <div className="mt-2 flex items-center rounded-md border border-input bg-background focus-within:border-primary">
                <span className="pl-3 text-muted-foreground">$</span>
                <input type="number" min="0" step="1" value={costs.setup} onChange={(event) => update("setup", event.target.value)} className="w-full bg-transparent px-2 py-3 text-sm outline-none" />
              </div>
            </label>
          </div>
        </section>

        <aside className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:sticky lg:top-8">
          <p className="eyebrow text-primary">Estimated budget</p>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-sm text-muted-foreground">Recurring monthly</dt>
              <dd className="mt-1 font-display text-4xl">{money(totals.monthly)}</dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="text-sm text-muted-foreground">Recurring annual</dt>
              <dd className="mt-1 font-display text-3xl">{money(totals.annual)}</dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="text-sm text-muted-foreground">First year including setup</dt>
              <dd className="mt-1 font-display text-3xl">{money(totals.firstYear)}</dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="text-sm text-muted-foreground">Five years including setup</dt>
              <dd className="mt-1 font-display text-3xl">{money(totals.fiveYear)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            Emergency care and major unexpected expenses are not automatically included. Add a reserve in “other recurring costs” or “extra annual costs” if you want them represented.
          </p>
        </aside>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <Link to="/tools" className="text-sm font-semibold text-primary hover:underline">← Back to all tools</Link>
      </div>
    </Container>
  );
}
