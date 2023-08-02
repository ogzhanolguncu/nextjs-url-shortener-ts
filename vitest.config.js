import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    alias: true,
    environment: "jsdom",
    setupFiles: ["./global-vitest.setup.ts"],
  },
  plugins: [tsconfigPaths(), react()],
});
