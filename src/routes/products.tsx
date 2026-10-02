import { createFileRoute } from "@tanstack/react-router";
import { ResourceLanding } from "@/components/pets/ResourceLanding";
export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Pet Products & Gear | PetsDefined" }, { name: "description", content: "Practical pet product guides organized around use cases, fit, safety, and ownership needs." }] }),
  component: ProductsLanding,
});
function ProductsLanding() {
  return <ResourceLanding eyebrow="PetsDefined / Products" title="Gear that solves a real problem" description="Product coverage stays modular and clearly disclosed so informational pages do not become disguised shopping pages." cards={[
    { title: "Crates & carriers", body: "Fit, materials, travel use, sizing, and practical buying criteria." },
    { title: "Beds & furniture", body: "Support, durability, washability, size, and household fit." },
    { title: "Grooming & care", body: "Brushes, combs, nail tools, habitat care, and routine equipment by pet type." },
    { title: "Aquarium & habitat gear", body: "Filters, heaters, lighting, enclosures, substrates, and setup essentials." },
    { title: "Training gear", body: "Reward tools, long lines, harnesses, enrichment, and management equipment." },
    { title: "Travel gear", body: "Carriers, restraints, hydration, protection, and trip planning equipment." },
  ]} />;
}
