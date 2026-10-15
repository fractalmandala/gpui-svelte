import { render } from "@fractaldesign/gpui-svelte"
import { installWebGPU } from "@fractaldesign/gpui-svelte/webgpu-native"

import App from "./App.svelte"
await installWebGPU()
render(App, { props: { gpu: navigator.gpu }, title: "Svelte WebGPU", width: 760, height: 560 })
