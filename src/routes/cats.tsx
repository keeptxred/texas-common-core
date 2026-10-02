import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/cats")({ component: CatsLayout });
function CatsLayout() { return <Outlet />; }
