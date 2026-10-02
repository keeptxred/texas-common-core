import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Standard TanStack Start/Vite configuration for the shared Defined platform.
 * No Lovable runtime or build wrapper is required.
 *
 * Deployment providers can select a Nitro preset through normal Nitro
 * configuration/environment when the final hosting target is chosen.
 */
export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro(),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
