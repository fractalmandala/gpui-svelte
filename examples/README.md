# @fractaldesign/gpui-svelte examples

These examples demonstrate **Svelte 5** desktop applications powered by the native GPUI engine. Svelte owns application state through runes (`$state`, `$derived`, `$effect`), while GPUI handles layout, text rendering, input, and hardware-accelerated painting.

## Available Examples

| Example                   | Source Directory                               | Demonstrates                                                                  |
| ------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `svelte-counter`          | `examples/svelte-counter`                      | Rune state/derived values, bound native editor, and Button                     |
| `svelte-showcase`         | `examples/svelte-showcase`                     | Select, Combobox, Tooltip, motion, rich text, search, canvas and virtual rows |
| `svelte-multiple-windows` | `examples/svelte-multiple-windows`             | Independent component roots, window creation, and cleanup                    |
| `svelte-webgpu`           | `examples/svelte-webgpu`                       | Reactive GPU-canvas ownership and a WebGPU scene                              |

## Running an Example

From the package root:

```bash
# Build the example
bun --filter @gpui-svelte/example-counter build

# Run the example
bun --filter @gpui-svelte/example-counter start
```

Substitute any example name (`@gpui-svelte/example-showcase`, `@gpui-svelte/example-multiple-windows`, `@gpui-svelte/example-webgpu`).

## Building Standalone Binaries

Each example includes a `build:binary` script that compiles the example into a standalone executable using Bun:

```bash
bun --filter @gpui-svelte/example-counter run build:binary
```

The resulting executable is generated in the example's `dist/` directory.
