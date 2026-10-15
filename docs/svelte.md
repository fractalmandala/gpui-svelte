# Svelte 5 with GPUI

For GPUI Kit native components, see [the Kit integration guide](gpui-kit.md).

`@fractaldesign/gpui-svelte` provides a native desktop UI runtime for Svelte 5 built on Zed's GPUI. Write `.svelte` components using `$state`, `$derived`, `$effect`, `$props`, `$bindable`, snippets, keyed `{#each}`, `{#if}`, and `{#await}`. The package uses Svelte **5.57.0**, pinned exactly because its compiled output and internal client runtime must agree.

> **Provenance:** `@fractaldesign/gpui-svelte` is a modified standalone consolidation of [`countradooku/gpui-native`](https://github.com/countradooku/gpui-native), licensed under Apache 2.0.

---

## Run an Example

From a checkout with Bun and the repository's Rust toolchain installed:

```sh
bun install
bun run build:native
bun run build:svelte
bun --filter @gpui-svelte/example-counter build
bun --filter @gpui-svelte/example-counter start
```

Other included examples are `svelte-showcase`, `svelte-multiple-windows`, and `svelte-webgpu`. Each supports `build`, `start`, and `build:binary`.

---

## Components and Runes

```svelte
<script lang="ts">
  import { Button, Column, Text, TextInput } from "@fractaldesign/gpui-svelte"
  let name = $state("Svelte")
  let count = $state(0)
  const message = $derived(`Hello ${name}: ${count}`)
</script>

<Column style={{ padding: 24, gap: 12 }}>
  <TextInput bind:value={name} placeholder="Your name" />
  <Text>{message}</Text>
  <Button onPress={() => count++} style={{ padding: 12 }}>Increment</Button>
</Column>
```

```ts
// src/main.ts
import { render } from "@fractaldesign/gpui-svelte"
import App from "./App.svelte"

render(App, { title: "Svelte + GPUI", width: 800, height: 600 })
```

Use the included Vite compiler plugin:

```ts
// vite.config.ts
import { defineConfig } from "vite"
import { gpuiSvelte } from "@fractaldesign/gpui-svelte/vite"

export default defineConfig({
  plugins: [gpuiSvelte()],
  build: {
    target: "node20",
    lib: { entry: "src/main.ts", formats: ["es"], fileName: "main" },
    rollupOptions: { external: [/^@fractaldesign\/gpui-svelte/] },
  },
})
```

The plugin compiles `.svelte` components and `.svelte.ts` / `.svelte.js` rune modules. It redirects `svelte`, `svelte/store`, and `svelte/reactivity` imports to the isolated native client runtime. Use `svelte-check` for strict component type-checking.

Core native components include: `View`, `Text`, `Row`, `Column`, `ScrollView`, `Button`, `Image`, `Svg`, `TextInput`, `TextArea`, `Code`, `Diff`, `Markdown`, `Canvas`, `VirtualList`, `Anchored`, and `MotionView` / `motion.View`. See [the component guide](components.md) for details. Styles, pseudo-state styles, events, accessibility, highlighting, and motion remain native props. `Code` is bare; applications supply padding, border and fill.

Named components accept camel-case callbacks such as `onPress`, `onClick`, and `onChange`. Primitives also accept Svelte's lowercase spelling (`onpress`, `onclick`, `onchange`). Callbacks receive the native `EventPayload`, not a DOM Event. Native input uses `bind:value`; `onChange` additionally observes the event. Deep changes to `$state` style objects are tracked and removed properties reset the native state.

Raw native tags such as `<div>`, `<text>`, `<code>`, `<input>` and `<virtual-list>` are also compiled to these primitives. Named components provide the strongest editor typing. This is a native GPUI target: HTML elements outside the native catalog, CSS stylesheets/directives, DOM actions, `{@html}`, and browser special elements are not applicable. Use native `style`, `MotionView`, window APIs, and `Canvas` for those operations. DOM-dependent Svelte libraries, SSR, and browser hydration are not supported.

---

## Refs, Effects, and Windows

```svelte
<script lang="ts">
  import { TextInput, useElementRef, useGpuiWindow } from "@fractaldesign/gpui-svelte"
  const input = useElementRef()
  const window = useGpuiWindow()
  $effect(() => {
    if (input.current) window.focus(input.current)
  })
</script>
<TextInput bind:ref={input.current} />
```

A native ref exposes `id`. It is cleared on removal. `bind:this` returns the primitive's exported native handle as well. Use native window operations to focus, scroll or inspect bounds; a ref is not a browser DOM element.

`useWindowSize()` and `useWindowInsets()` return objects with reactive fields. Read their fields inside markup, derived expressions or effects rather than copying them into nonreactive locals.

`useGpuiWindow()`, `useGpuiTimeline()`, `useGpuiAudioFrames()`, and `useWindowEvent("windowKeyDown", callback)` expose GPUI engine capabilities. Window subscriptions compose with `render`'s `onKeyDown` / `onKeyUp` callbacks and are removed when their Svelte component is destroyed.

`createWindow(App, { props, ...windowOptions })` creates an independent native window and component lifecycle. `root.render(App, { props })` updates the existing component's props and preserves its rune state; changing the component remounts it. `root.unmount()` removes content, and `root.close()` stops the event loop and closes the window. `render()` reuses one persistent window; `resetRender()` closes it.

---

## Headless Controls

Select, Combobox, Tooltip and FloatingLayer are Svelte components that reuse native focus, floating layout and events. They are unstyled and accept ordinary host props.

```svelte
<script lang="ts">
  import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  } from "@fractaldesign/gpui-svelte"
  let language = $state("rust")
  let open = $state(false)
</script>
<Select bind:value={language} bind:open>
  <SelectTrigger><SelectValue placeholder="Language" /></SelectTrigger>
  <SelectContent style={{ padding: 8, background: "#1e293b" }}>
    <SelectItem value="rust" textValue="Rust">Rust</SelectItem>
    <SelectItem value="typescript" textValue="TypeScript">TypeScript</SelectItem>
  </SelectContent>
</Select>
```

Select supports initial value/open defaults, disabled options, arrow/Home/End navigation, Enter/Space selection, Escape/Tab dismissal, buffered typeahead, and active-option scrolling. Supply `textValue` for the display label and searchable text when children contain custom markup.

Combobox adds `bind:inputValue`, `multiple`, filtering, optional `items`, `itemToStringValue`, and `autoHighlight`. Set `filter={null}` for externally filtered data. A custom filter receives `(value, query, itemToString)`. `ComboboxList` accepts an `item(value, index)` snippet for its filtered items, or ordinary children. Items accept a `style(state)` callback and a `content(state)` snippet exposing `selected`, `highlighted`, and `disabled`.

Trigger components accept a `child(hostProps)` snippet to place their behavior on your own native primitive without an extra wrapper. Spread the supplied props onto that primitive and preserve its `ref` binding when composing Select or Combobox triggers. TooltipProvider configures initial and repeat-hover delays; Tooltip supports bound open state, focus/hover activation, dismissal and timer cleanup.

---

## Text Search and GPU Canvas

`useTextSearch(() => ({ query }))` returns reactive `props`, `total`, `active`, and navigation methods. Spread `search.props` onto the searchable container. The matcher, selection and highlight rendering are processed natively, including virtual-list offsets.

`useGPUCanvas(() => ({ width, height, presentation }))` returns a reactive `current` canvas. Resizing preserves its identity; component destruction releases its resources. Read `current` in an effect to start a drawing producer and return that producer's cleanup function. Use `<Canvas source={canvas.current.id} />` when it exists. See `examples/svelte-webgpu` and [the WebGPU guide](webgpu.md) for device ownership and platform capabilities. Native WebGPU setup is available from `@fractaldesign/gpui-svelte/webgpu`.

---

## Testing

Import `mountGpui` or `createTestRoot` from `@fractaldesign/gpui-svelte/testing`. Compile test fixtures through `gpuiSvelte()`:

```ts
const root = mountGpui(App)
root.findByTestId("increment").click()
await root.flush()
expect(root.findByText("1")).toBeDefined()
root.unmount()
```

`mountGpui` uses the deterministic memory backend. `createTestRoot` uses GPUI's GPU test renderer on macOS and Windows. Automation lives in the `@fractaldesign/gpui-svelte/automation` subpath.
