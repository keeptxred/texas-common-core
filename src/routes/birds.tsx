import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
export const Route = createFileRoute("/birds")({ head: () => ({ meta: [{ title: "Birds | PetsDefined" }, { name: "description", content: "Bird species profiles, housing, nutrition, enrichment, handling, and responsible bird care." }] }), component: () => <PetHub kind="bird" /> });
