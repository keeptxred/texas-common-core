import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
export const Route = createFileRoute("/reptiles")({ head: () => ({ meta: [{ title: "Reptiles | PetsDefined" }, { name: "description", content: "Reptile species profiles, habitat design, heat and lighting, nutrition, handling, and long-term care." }] }), component: () => <PetHub kind="reptile" /> });
