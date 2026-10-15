# @fractaldesign/gpui-svelte

GPU-accelerated native desktop UI runtime for **Svelte 5** built on [Zed's GPUI](https://gpui.rs/) and [GPUI Kit](https://github.com/longbridge/gpui-kit).

This is a single, self-contained package consolidating the native Rust N-API engine, the GPUI runtime, the Svelte 5 native compiler, and 86+ typed components into a single npm-publishable package: **`@fractaldesign/gpui-svelte`**.

[Github](https://github.com/fractalmandala/gpui-svelte) | [NPM]( https://www.npmjs.com/package/@fractaldesign/gpui-svelte)

> **Note on Upstream & Provenance:**  
> This package is a modified distribution of [`countradooku/gpui-native`](https://github.com/countradooku/gpui-native) by countradooku and contributors, which itself incorporates parts of [remorses/gpuix](https://github.com/remorses/gpuix), [zeronsh/comet](https://github.com/zeronsh/comet), [longbridge/gpui-kit](https://github.com/longbridge/gpui-kit), and [Zed GPUI](https://github.com/zed-industries/zed).  
> **Modifications:**  
> - Consolidated the monorepo architecture (`@gpui-native/core`, `@gpui-native/runtime`, and `@gpui-native/svelte`) into a single standalone `@fractaldesign/gpui-svelte` package.  
> - Removed Vue and React adapters to keep the package lightweight and focused entirely on Svelte 5.  
> - Bundled the native N-API release binary (`gpui-native.darwin-arm64.node`) with an integrated loader (`native.cjs`).  
> - Extended under the same **Apache-2.0** license.

---

## Features

- **Svelte 5 Runes & Reactivity:** Write native desktop apps using standard `$state()`, `$derived()`, `$effect()`, and Svelte 5 component syntax.
- **Single Self-Contained Package:** Bundles the native Rust N-API binding (`gpui-native.darwin-arm64.node`), the runtime reconciliation layer, and the Svelte adapter without requiring any external `@gpui-native/*` dependencies.
- **GPUI Kit Primitives & Controls:** 86 typed native components out of the box (Buttons, Menus, Dialogs, Inputs, Tooltips, Virtual Lists, Tables, Charts, etc.).
- **Retained GPU Canvas & WebGPU:** Direct WebGPU support with hardware acceleration.
- **Vite Plugin Included:** Plug-and-play Vite plugin (`gpuiSvelte`) with zero-config compilation for native GPUI targets.

---

## Installation

```bash
# Using bun
bun add @fractaldesign/gpui-svelte svelte@5.57.0

# Using npm
npm install @fractaldesign/gpui-svelte svelte@5.57.0
```

---

## Quick Start

### 1. Configure Vite (`vite.config.ts`)

```ts
import { defineConfig } from "vite"
import { gpuiSvelte } from "@fractaldesign/gpui-svelte/vite"

export default defineConfig({
  plugins: [gpuiSvelte()],
  build: {
    target: "esnext",
    rollupOptions: {
      external: ["@fractaldesign/gpui-svelte", "@fractaldesign/gpui-svelte/engine"],
    },
  },
})
```

### 2. Create your Svelte Component (`src/App.svelte`)

```svelte
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

### 3. Entry Point (`src/main.ts`)

```ts
import { render } from "@fractaldesign/gpui-svelte"
import App from "./App.svelte"

render(App, {
  title: "My Native GPUI App",
  bounds: { width: 640, height: 480 },
})
```

---

## Subpath Exports

The package provides clean subpath exports:

- `@fractaldesign/gpui-svelte`: Core components (`Column`, `Row`, `Text`, `Button`, `TextInput`, `render`, `useWindowSize`, etc.)
- `@fractaldesign/gpui-svelte/kit`: GPUI Kit native components
- `@fractaldesign/gpui-svelte/vite`: Vite build plugin (`gpuiSvelte`)
- `@fractaldesign/gpui-svelte/webgpu`: WebGPU canvas integrations
- `@fractaldesign/gpui-svelte/engine`: Svelte AST runtime engine
- `@fractaldesign/gpui-svelte/testing`: Headless & mock test renderer

---

## Building & Publishing to NPM

To publish this package to npm under the `@fractaldesign` scope:

```bash
# 1. Build the native Rust addon & compile Svelte runtime
bun run build

# 2. Preview the publish tarball
npm pack --dry-run

# 3. Publish to npm
npm publish --access public
```

---

## License

Apache-2.0
