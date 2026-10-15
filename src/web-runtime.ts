import { createWebNativeRenderer } from "./runtime/web-native.js"

import { createGpuiRuntime } from "./runtime-core.js"
const runtime = createGpuiRuntime(createWebNativeRenderer)
export const { createWindow, render, resetRender } = runtime
export {
  startFrameLoop,
  type FrameLoop,
  type RenderOptions,
  type GpuiWindowRoot,
  type GpuiRoot,
} from "./runtime-core.js"
