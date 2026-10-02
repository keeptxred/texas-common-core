import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/cats/breeds")({ component: CatBreedsLayout });
function CatBreedsLayout() { return <Outlet />; }
