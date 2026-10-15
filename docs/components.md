# Native Components

For GPUI Kit native components, see [the Kit integration guide](gpui-kit.md).

`@fractaldesign/gpui-svelte` exports high-level native components that lower directly into GPUI's retained tree. GPUI owns layout, painting, input, text selection, scrolling, and motion.

> **Provenance:** `@fractaldesign/gpui-svelte` is a modified standalone distribution of [`countradooku/gpui-native`](https://github.com/countradooku/gpui-native), licensed under Apache 2.0.

---

## Component Catalog

| Component                    | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| `View`                       | Bare container with all GPUI styles and events       |
| `Text`                       | Native selectable, searchable text                   |
| `TextInput`                  | Single-line native editor with two-way `bind:value`  |
| `TextArea`                   | Multiline native editor with two-way `bind:value`   |
| `Image`                      | Raster image                                         |
| `Svg`                        | Vector SVG image                                     |
| `Canvas`                     | Retained drawing and GPU canvas                      |
| `Anchored`                   | GPUI positioned floating content                     |
| `Code`                       | Bare syntax-highlighted code                         |
| `Diff`                       | Native diff viewer                                   |
| `Markdown`                   | Native Markdown content                              |
| `VirtualList`                | Virtualized rows for high-volume data                |
| `MotionView` / `motion.View` | Container animated by GPUI                           |
| `Row`                        | Flex container, horizontal by default                |
| `Column`                     | Flex container, vertical by default                  |
| `ScrollView`                 | Scroll container, vertical by default                |
| `Button`                     | Unstyled action with pointer and keyboard activation |

Accompanying prop types: `ViewProps`, `TextProps`, `ImageProps`, `TextInputProps`, `TextAreaProps`, `ScrollViewProps`, `ButtonProps`, and `MotionViewProps`.

---

## Layout Behavior

- `View` has no added layout defaults.
- `Row` and `Column` configure `display: "flex"` and `flexDirection`.
- `ScrollView` uses flex defaults and scrolls vertically; `horizontal` switches both direction and scrolling axis. Supply a bounded height or width for the viewport.
- `style` overrides all layout defaults. Children stay directly in the host container with no extra wrappers or unstyled divs.
- Use `VirtualList` for large collections that should only render visible rows.

All native props remain available: flexbox styles, absolute positioning, pseudo-state styles (`:hover`, `:active`, `:focus`), event handlers, `highlight`, `motion`, and accessibility labels.

---

## Buttons

```svelte
<script lang="ts">
  import { Button, Row, Text } from "@fractaldesign/gpui-svelte"

  let count = $state(0)
</script>

<Row style={{ gap: 12, alignItems: "center" }}>
  <Text>{count}</Text>
  <Button style={{ padding: 12 }} onPress={() => count++}>
    <Text>Increment</Text>
  </Button>
  <Button disabled={count === 0} style={{ padding: 12 }} onPress={() => (count = 0)}>
    <Text>Reset</Text>
  </Button>
</Row>
```

A press callback (`onPress`) receives the original native `EventPayload`: pointer `click`, `keyDown` for Enter, or `keyUp` for Space. Space must start on this button; blur or disabling cancels it. Key repeats and modifier shortcuts do not activate.

Use `onClick`, `onKeyDown`, `onKeyUp`, and `onBlur` for raw events alongside `onPress`.

`disabled` suppresses press and click callbacks, disables autofocus, and sets `tabIndex: -1`. The button adds no fill, padding, border, or size by default, allowing full styling freedom.
