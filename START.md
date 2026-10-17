# Start a New Project

Create a project directory and initialize it with ES module support:

## Inititalize

1. Create project directory

```sh
mkdir my-gpui-app
cd my-gpui-app
npm init -y
npm pkg set type="module"
```

2. Install @fractaldesign/gpui-svelte and svelte@5.57.0:

```sh
npm install @fractaldesign/gpui-svelte svelte@5.57.0
```

3. Install the required build and TypeScript tooling:

```sh
npm install -D vite typescript @types/node
```

## Vite

GPUI applications compile into a native desktop executable that runs directly in Node/Bun (bypassing the browser DOM). 

4. Use the bundled gpuiSvelte plugin:

```ts
// vite.config.ts
import { defineConfig } from "vite"
import { gpuiSvelte } from "@fractaldesign/gpui-svelte/vite"

export default defineConfig({
  plugins: [gpuiSvelte()],
  build: {
    target: "node20",
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: "main",
    },
    rollupOptions: {
      external: [/^@fractaldesign\/gpui-svelte/],
    },
  },
})
```

5. Create a tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "types": ["svelte", "vite/client", "node"]
  },
  "include": ["src/**/*.ts", "src/**/*.svelte"]
}
```

6. Create App.svelte
GPUI uses native primitives (Column, Row, Text, Button, etc.) rather than HTML tags (<div>, <p>):

```svelte
<!-- src/App.svelte -->
<script lang="ts">
  import { Column, Row, Text, Button } from "@fractaldesign/gpui-svelte"

  let count = $state(0)
</script>

<Column
  style={{
    width: "100%",
    height: "100%",
    padding: 32,
    gap: 16,
    background: "#1e1e2e",
    color: "#cdd6f4",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Text style={{ fontSize: 28, fontWeight: 700 }}>
    GPUI + Svelte 5
  </Text>

  <Row style={{ gap: 12, alignItems: "center" }}>
    <Button
      style={{ padding: 12, background: "#89b4fa", borderRadius: 6 }}
      onClick={() => count--}
    >
      <Text style={{ color: "#11111b", fontWeight: 600 }}>-</Text>
    </Button>

    <Text style={{ fontSize: 22, minWidth: 40, textAlign: "center" }}>
      {count}
    </Text>

    <Button
      style={{ padding: 12, background: "#a6e3a1", borderRadius: 6 }}
      onClick={() => count++}
    >
      <Text style={{ color: "#11111b", fontWeight: 600 }}>+</Text>
    </Button>
  </Row>
</Column>
```

7. Create desktop entry:

```ts
// src/main.ts
import { render } from "@fractaldesign/gpui-svelte"
import App from "./App.svelte"

render(App, {
  title: "My GPUI App",
  width: 800,
  height: 600,
})
```

8. Add scripts to package.json
Add the build and run scripts to package.json:

```json
"scripts": {
  "build": "vite build",
  "start": "node dist/main.js"
}
```

9. Build and Run

```sh
# Build the native bundle
npm run build

# Run the native GPUI window
npm start
```