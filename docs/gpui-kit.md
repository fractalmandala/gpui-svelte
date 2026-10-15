# GPUI Kit for Svelte 5

`@fractaldesign/gpui-svelte` embeds GPUI Kit 0.6.1 directly into the native GPUI engine. 86 styled native components run behind Svelte 5 with full two-way rune bindings (`bind:value`, `bind:checked`, `bind:open`).

> **Provenance:** `@fractaldesign/gpui-svelte` is a modified standalone consolidation of [`countradooku/gpui-native`](https://github.com/countradooku/gpui-native), licensed under Apache 2.0. Upstream GPUI Kit components are adapted from [`longbridge/gpui-kit`](https://github.com/longbridge/gpui-kit).

---

## Import Entry Point

Import all Kit components and their TypeScript prop types from:

```ts
import {
  Button,
  Checkbox,
  Input,
  Dialog,
  Select,
  Slider,
  Theme,
  DataTable,
  // ...
} from "@fractaldesign/gpui-svelte/kit"
```

---

## Svelte 5 Bindings & Usage

```svelte
<script lang="ts">
  import { Checkbox, Input, Dialog, Slider, Theme } from "@fractaldesign/gpui-svelte/kit"

  let enabled = $state(true)
  let name = $state("Ada")
  let range = $state<[number, number]>([20, 80])
  let open = $state(false)
</script>

<Theme mode="light">
  <Input bind:value={name} placeholder="Name" />
  <Checkbox bind:checked={enabled} label="Enabled" />
  <Slider bind:value={range} min={0} max={100} />

  <Dialog bind:open title="Preferences">
    <Input bind:value={name} />
  </Dialog>
</Theme>
```

- `onValueChange` receives decoded native values.
- `onChange` receives the native event payload with its `value` field.
- Calendar dates use ISO `YYYY-MM-DD` strings; range selection uses a 2-element tuple `[start, end]`.
- NumberInput uses a string so intermediate editing states (such as `-`) remain representable.

---

## Ownership and Composition

- Kit owns native interaction state: caret and undo history, popup focus, table navigation, dock layout, and scroll position.
- Svelte owns application data, reactivity, and reconciliation.
- Unmounting a host releases its entities and subscriptions.
- Compound components:
  - **Tabs:** One child per tab; only the selected tab's child is displayed.
  - **Accordion, DescriptionList, Form:** One child per item.
  - **Dialog, Sheet, Popover, HoverCard, Notification:** Children render in the native overlay.
  - **Dock:** One child per panel entry in `panels`, with stable panel `id` values.
  - **Resizable:** One child per panel; `sizes` corresponds to child order.
  - **Settings:** One child per settings item in page/group/item order.

---

## Complete Component Catalog (86 Components)

| Component          | Native Tag              | Component          | Native Tag              |
| ------------------ | ----------------------- | ------------------ | ----------------------- |
| `Accordion`        | `kit-accordion`         | `Input`            | `kit-input`             |
| `Alert`            | `kit-alert`             | `Kbd`              | `kit-kbd`               |
| `AreaChart`        | `kit-area-chart`        | `Label`            | `kit-label`             |
| `Attachment`       | `kit-attachment`        | `LineChart`        | `kit-line-chart`        |
| `AttachmentGroup`  | `kit-attachment-group`  | `Link`             | `kit-link`              |
| `Avatar`           | `kit-avatar`            | `List`             | `kit-list`              |
| `Badge`            | `kit-badge`             | `Marker`           | `kit-marker`            |
| `BarChart`         | `kit-bar-chart`         | `Message`          | `kit-message`           |
| `Breadcrumb`       | `kit-breadcrumb`        | `MessageContent`   | `kit-message-content`   |
| `Bubble`           | `kit-bubble`            | `MessageFooter`    | `kit-message-footer`    |
| `BubbleGroup`      | `kit-bubble-group`      | `MessageGroup`     | `kit-message-group`     |
| `Button`           | `kit-button`            | `MessageHeader`    | `kit-message-header`    |
| `Calendar`         | `kit-calendar`          | `MessageScroller`  | `kit-message-scroller`  |
| `CandlestickChart` | `kit-candlestick-chart` | `Notification`     | `kit-notification`      |
| `Carousel`         | `kit-carousel`          | `NumberInput`      | `kit-number-input`      |
| `Checkbox`         | `kit-checkbox`          | `OtpInput`         | `kit-otp-input`         |
| `Clipboard`        | `kit-clipboard`         | `Pagination`       | `kit-pagination`        |
| `Collapsible`      | `kit-collapsible`       | `PieChart`         | `kit-pie-chart`         |
| `ColorPicker`      | `kit-color-picker`      | `Popover`          | `kit-popover`           |
| `Combobox`         | `kit-combobox`          | `Progress`         | `kit-progress`          |
| `Command`          | `kit-command`           | `ProgressCircle`   | `kit-progress-circle`   |
| `ContextMenu`      | `kit-context-menu`      | `RadarChart`       | `kit-radar-chart`       |
| `DataTable`        | `kit-data-table`        | `Radio`            | `kit-radio`             |
| `DatePicker`       | `kit-date-picker`       | `RadioGroup`       | `kit-radio-group`       |
| `DescriptionList`  | `kit-description-list`  | `Rating`           | `kit-rating`            |
| `Dialog`           | `kit-dialog`            | `Resizable`        | `kit-resizable`         |
| `Dock`             | `kit-dock`              | `SankeyChart`      | `kit-sankey-chart`      |
| `DropdownMenu`     | `kit-dropdown-menu`     | `Select`           | `kit-select`            |
| `Editor`           | `kit-editor`            | `Separator`        | `kit-separator`         |
| `Empty`            | `kit-empty`             | `Settings`         | `kit-settings`          |
| `Field`            | `kit-field`             | `Sheet`            | `kit-sheet`             |
| `Form`             | `kit-form`              | `ShimmerText`      | `kit-shimmer-text`      |
| `GroupBox`         | `kit-group-box`         | `Sidebar`          | `kit-sidebar`           |
| `HoverCard`        | `kit-hover-card`        | `SidebarFooter`    | `kit-sidebar-footer`    |
| `Icon`             | `kit-icon`              | `SidebarHeader`    | `kit-sidebar-header`    |
| `SidebarToggle`    | `kit-sidebar-toggle`    | `Theme`            | `kit-theme`             |
| `Skeleton`         | `kit-skeleton`          | `TitleBar`         | `kit-title-bar`         |
| `Slider`           | `kit-slider`            | `Toggle`           | `kit-toggle`            |
| `Spinner`          | `kit-spinner`           | `Tooltip`          | `kit-tooltip`           |
| `StatusBar`        | `kit-status-bar`        | `Tree`             | `kit-tree`              |
| `Stepper`          | `kit-stepper`           | `WindowBorder`     | `kit-window-border`     |
| `Switch`           | `kit-switch`            | `Textarea`         | `kit-textarea`          |
| `Tabs`             | `kit-tabs`              | `Tag`              | `kit-tag`               |
