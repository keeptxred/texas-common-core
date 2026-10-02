import { createFileRoute } from "@tanstack/react-router";
import { PetHub } from "@/components/pets/PetHub";
export const Route = createFileRoute("/small-pets")({ head: () => ({ meta: [{ title: "Small Pets | PetsDefined" }, { name: "description", content: "Rabbits, guinea pigs, hamsters, ferrets, and other small companion animals." }] }), component: () => <PetHub kind="small-pet" /> });
