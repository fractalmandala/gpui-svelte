import { createNativeRenderer } from "./runtime/native-addon.js"

import { createGpuiRuntime } from "./runtime-core.js"
const runtime = createGpuiRuntime(createNativeRenderer)
export const { createWindow, render, resetRender } = runtime
export {
  startFrameLoop,
  type FrameLoop,
  type RenderOptions,
  type GpuiWindowRoot,
  type GpuiRoot,
} from "./runtime-core.js"
