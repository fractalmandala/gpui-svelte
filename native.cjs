/* First-party native loader for @fractaldesign/gpui-svelte */
const { existsSync } = require("node:fs")
const { join } = require("node:path")

function platformFilename() {
  const platform = process.platform
  const arch = process.arch
  if (platform === "linux") return `gpui-native.linux-${arch}-gnu.node`
  if (platform === "darwin") return `gpui-native.darwin-${arch}.node`
  if (platform === "win32") return `gpui-native.win32-${arch}-msvc.node`
  return null
}

function loadBinding() {
  const requested = process.env.GPUI_NATIVE_LIBRARY_PATH ?? process.env.GPUI_SVELTE_NATIVE_LIBRARY_PATH
  const filename = platformFilename()
  const candidates = [
    requested,
    filename && join(__dirname, filename),
    join(__dirname, "gpui-native.node"),
    join(__dirname, "index.darwin-arm64.node"),
    join(__dirname, `index.${process.platform}-${process.arch}.node`),
    filename && join(__dirname, "dist", filename),
  ].filter(Boolean)

  const errors = []
  for (const candidate of candidates) {
    if (!existsSync(candidate)) continue
    try {
      return require(candidate)
    } catch (error) {
      errors.push(error)
    }
  }

  const detail = errors.map((error) => `\n- ${error.message}`).join("")
  throw new Error(
    `Could not load the native GPUI addon for ${process.platform}/${process.arch}.${detail}`,
  )
}

module.exports = loadBinding()
