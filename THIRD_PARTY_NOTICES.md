# Third-party notices

## Upstream Package: countradooku/gpui-native

`@fractaldesign/gpui-svelte` is a modified fork and consolidation of [countradooku/gpui-native](https://github.com/countradooku/gpui-native) by countradooku and contributors, licensed under the Apache License 2.0.

### Modifications Made:
- Consolidated the monorepo packages (`packages/core`, `packages/runtime`, and `packages/svelte`) into a single standalone, self-contained package published as `@fractaldesign/gpui-svelte`.
- Removed Vue (`packages/vue`) and React (`packages/react`) adapters and all associated dependencies, examples, and scripts.
- Bundled the precompiled native N-API binary (`gpui-native.darwin-arm64.node`) with direct loading via `native.cjs`.
- Updated all module exports, Vite plugins, and runtime dependencies to resolve directly from `@fractaldesign/gpui-svelte`.
- Extended the same Apache License 2.0.

See `LICENSES/Apache-2.0.txt` for the full Apache-2.0 license text.

---

## GPUix native renderer

Portions of `crates/gpui-core` and the native renderer foundation are adapted from [remorses/gpuix](https://github.com/remorses/gpuix), commit `b8bbff4ef0dc00dc24c3d3f3ca47818e1be15c69`.

The upstream native package declares the Apache License 2.0.

---

## Comet

Parts of the native code, diff, Markdown, syntax highlighting, selectable text, theme, and input implementations are derived from [zeronsh/comet](https://github.com/zeronsh/comet), licensed under the MIT License.

See `LICENSES/Comet-MIT.txt` for the Comet license and copyright notice.

---

## GPUI Kit

GPUI Kit components are adapted from [longbridge/gpui-kit](https://github.com/longbridge/gpui-kit), licensed under the Apache License 2.0.

---

## Zed GPUI

The underlying graphics and windowing layer is built on GPUI from [Zed Industries](https://github.com/zed-industries/zed) (Apache License 2.0).
