# Changelog

## 0.1.0

Initial release of `@fractaldesign/gpui-svelte`.

This package is a modified distribution of [countradooku/gpui-native](https://github.com/countradooku/gpui-native) (v0.2.0), consolidated into a single self-contained Svelte 5 package.

### Key Changes from Upstream:
- **Single-Package Architecture:** Consolidated `@gpui-native/core`, `@gpui-native/runtime`, and `@gpui-native/svelte` into a single installable package `@fractaldesign/gpui-svelte`.
- **Framework Focus:** Removed Vue (`packages/vue`) and React (`packages/react`) adapters, streamlining the package exclusively for Svelte 5.
- **Precompiled Binary:** Bundles the native Rust N-API engine (`gpui-native.darwin-arm64.node`) and zero-overhead loader `native.cjs`.
- **Integrated Vite Plugin:** Embedded `gpuiSvelte` Vite plugin for seamless compilation of `.svelte` files and rune modules directly into native GPUI binaries.
- **GPUI Kit & WebGPU:** Includes all 86+ GPUI Kit components under `@fractaldesign/gpui-svelte/kit` and WebGPU canvas under `@fractaldesign/gpui-svelte/webgpu`.
- **License:** Extended under the same Apache-2.0 license.
