import { render } from "@fractaldesign/gpui-svelte"

import App from "./App.svelte"
if (!navigator.gpu) throw new Error("WebGPU is unavailable in this browser")
render(App, { props: { gpu: navigator.gpu }, title: "Svelte WebGPU", width: 760, height: 560 })
