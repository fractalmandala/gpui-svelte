# Architecture of @fractaldesign/gpui-svelte

`@fractaldesign/gpui-svelte` provides a unified, single-package architecture combining Zed's GPUI Rust engine, an N-API native addon, and an isolated Svelte 5 client runtime.

> **Provenance:** `@fractaldesign/gpui-svelte` is a modified standalone consolidation of [`countradooku/gpui-native`](https://github.com/countradooku/gpui-native) by countradooku and contributors (Apache License 2.0). Upstream monorepo packages (`@gpui-native/core`, `@gpui-native/runtime`, `@gpui-native/svelte`) and other framework adapters (Vue/React) were consolidated into this single Svelte 5 package.

---

## High-Level Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Svelte 5 Application                 │
│         (Runes: $state, $derived, $effect, etc.)       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│      @fractaldesign/gpui-svelte Compiler & Runtime     │
│  - Vite plugin (gpuiSvelte) transforms .svelte to AST  │
│  - Pinned Svelte 5.57.0 client runtime                 │
│  - Retained mutation batching (wrapWithBatching)       │
└───────────────────────────┬────────────────────────────┘
                            │ applyBatch / events
┌───────────────────────────▼────────────────────────────┐
│                 N-API Native Loader                    │
│             (native.cjs -> gpui-native.*.node)         │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│             Rust Core (crates/gpui-core)               │
│  - Layout (Taffy flexbox/grid)                         │
│  - Text shaping, selection, IME, Syntect syntax        │
│  - Retained GPUI element tree                          │
│  - GPUI Kit native controls (86 components)            │
│  - WebGPU surface leasing & presentation               │
│  - Windowing & Metal/Vulkan/DirectX painting (GPUI)    │
└────────────────────────────────────────────────────────┘
```

---

## Directory Structure

| Path                 | Purpose                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| `crates/gpui-core`   | Rust N-API engine: retained tree, batch validation, GPUI Kit, and native windowing  |
| `native.cjs`         | Zero-dependency CJS loader resolving the precompiled platform `.node` binary       |
| `src/`               | Svelte adapter components, runes, headless controls, hooks, and Vite plugin         |
| `src/runtime/`       | TypeScript runtime layer: batching, events, automation, styles, and WebGPU bridges  |
| `dist/`              | Compiled ESM modules, TypeScript declarations, and bundled engine runtime           |
| `examples/`          | Complete Svelte 5 example applications                                              |
| `vendor/gpui-kit`    | Vendored GPUI Kit component definitions and assets                                  |

---

## The Mutation & Batching Pipeline

1. **Svelte Runes & Effects:** When state changes in `$state`, Svelte's reactive graph triggers effects that update native node properties or tree hierarchy.
2. **Batch Queue:** All DOM-like operations (`createElement`, `setText`, `setStyle`, `appendChild`, etc.) are queued in a microtask batch via `wrapWithBatching()`.
3. **Single IPC Transfer:** The batch is serialized and transferred to Rust via a single `applyBatch()` call per microtask.
4. **Rust Tree Mutation:** `crates/gpui-core` decodes the batch, updates the retained tree, triggers layout passes, and paints frames on GPUI's hardware-accelerated surface.
5. **Event Dispatch:** Pointer, keyboard, scroll, and window resize events flow from GPUI back through N-API callbacks and are dispatched to the appropriate Svelte handlers.
