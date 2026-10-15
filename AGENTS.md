# @fractaldesign/gpui-svelte contributor guide

## Architecture

- Keep the Svelte adapter thin. Svelte owns component state, runes (`$state`, `$derived`, `$effect`), and reconciliation; GPUI owns layout, input, text shaping, painting, focus, scrolling, and windows.
- `crates/gpui-core` compiles to the native N-API addon (`gpui-native.<platform>.node`), loaded through `native.cjs`.
- All mutation waves go through `applyBatch`. Decode and validate a batch before mutating the retained tree, and keep style/custom-prop values raw until the outer JSON serialization.
- Search the pinned Zed/GPUI revision before adding a platform workaround. Prefer an existing GPUI API or a small upstreamable GPUI change over a second renderer-specific implementation.

## Native text and components

- Route selectable and searchable text through the shared text run, selection, and highlight pipeline. A native component must not invent a separate text painter or matcher.
- Layout-affecting code/diff/markdown numbers belong in theme metrics, not Rust constants. A theme prop change must be enough to tune them.
- `<code>` is a bare primitive. The app owns its fill, border, radius, padding, and any language header.
- Custom-element adapters own their retained state and must reset removed props, release state when an id changes type, and report supported props/events.

## Verification

Run the checks relevant to a change, and run the full set before handoff:

```bash
bun run build:native
bun run build:svelte
bun run scripts/native-smoke.mts
bun --filter @gpui-svelte/example-counter build
```
