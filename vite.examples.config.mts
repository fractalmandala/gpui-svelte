import { defineConfig } from "vite"

import { gpuiSvelte } from "./dist/vite.js"

export default defineConfig({
  plugins: [gpuiSvelte()],
  build: {
    target: "node20",
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    minify: "oxc",
    lib: { entry: "src/main.ts", formats: ["es"], fileName: "main" },
    rollupOptions: { external: [/^@fractaldesign\/gpui-svelte/] },
  },
})
