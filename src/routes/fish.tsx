import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
export const Route = createFileRoute("/fish")({ head: () => ({ meta: [{ title: "Fish | PetsDefined" }, { name: "description", content: "Fish species profiles, aquarium setup, water quality, feeding, compatibility, and practical fishkeeping guides." }] }), component: () => <PetHub kind="fish" /> });
