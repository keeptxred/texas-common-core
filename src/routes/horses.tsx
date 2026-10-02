import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
export const Route = createFileRoute("/horses")({ head: () => ({ meta: [{ title: "Horses | PetsDefined" }, { name: "description", content: "Horse ownership basics, care, feeding, equipment, behavior, and practical guides." }] }), component: () => <PetHub kind="horse" /> });
