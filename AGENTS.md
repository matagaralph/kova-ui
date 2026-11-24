# Kova UI

Kova UI is what AmaShona, an open platform preserving the Shona language and culture, is built from: design tokens, a Tailwind 4 setup, and accessible React components. Every AmaShona product builds on it, so changes must be robust and work in many contexts.

## ui-sdk

Kova components are built on [ui-sdk](https://ui-sdk.dev/docs) (`@ui-sdk/react` and `@ui-sdk/core`).

- Before using ui-sdk, follow the ui-sdk skill (`.agents/skills/ui-sdk/SKILL.md`), and read `node_modules/@ui-sdk/react/docs/llms.txt`. Then read only the component pages you need, like `docs/components/select.md`.
- To build a new component, also search `node_modules/@ui-sdk/react/docs/core.md` by heading (it is large, don't read it whole), and read `rendering.md` next to it.
- The docs that ship in `node_modules` match the installed version. Prefer them to the website.

`node_modules/@ui-sdk/react` resolves from `packages/ui`.

## Repository

A pnpm workspace:

- `packages/ui` publishes `kova-ui`: tokens, styles, and components.
- `packages/icons` publishes `@kova-ui/icons`. `kova-ui` depends on it.
- `packages/markdown` publishes `@kova-ui/markdown`: `Markdown` and `CodeBlock`, with their parsing and highlighting dependencies. It peers on `kova-ui`.
- `apps/docs` is the documentation site (TanStack Start and Fumadocs). It is private.

The root is private and holds shared tooling: Vitest, Oxlint, Oxfmt, Stylelint, the PostCSS pipeline in `postcss/`, and the CSS build script.

Inside `packages/ui/src`:

- `components/` - one kebab-case folder per component, like `scroll-area/`, exported from `components/index.ts` (a test fails if a folder is missing)
- `hooks/` - React hooks
- `lib/` - helpers, including `cn` and `mergeClassName`
- `styles/` - global CSS, Tailwind setup, and tokens

## Dependencies

Keep them few. `kova-ui` depends on `@ui-sdk/react`, `@ui-sdk/core` and `@kova-ui/icons`, and nothing else at runtime. Don't add Base UI, Radix, `clsx`, date libraries or other UI packages. Tooling-only dependencies go in the root `package.json`, and heavy ones go in their own package, like `@kova-ui/markdown`.

## Components

Each Kova component wraps the ui-sdk component of the same name, part for part, and adds Kova's styles. `Switch` and `Field` are the reference:

```tsx
import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
} from "@ui-sdk/react/switch"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./switch.module.css"

export type SwitchProps = ComponentProps<typeof SwitchPrimitive>

export function Switch({ className, ...props }: SwitchProps) {
  return <SwitchPrimitive className={mergeClassName(s.Switch, className)} {...props} />
}

export type SwitchThumbProps = ComponentProps<typeof SwitchThumbPrimitive>

function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return <SwitchThumbPrimitive className={mergeClassName(s.SwitchThumb, className)} {...props} />
}

Switch.Thumb = SwitchThumb
```

- **Names.** Parts hang off their root, Primer style: `Select.Trigger`, `Select.Content`, `Select.Item`, `TabNav.Link`, never flat `SelectTrigger` exports. The member name is the ui-sdk part name minus the root (`SelectItemText` becomes `Select.ItemText`), and the composition follows ui-sdk's. Define each part as an unexported function named in full (`function SelectTrigger`), attach it at the bottom of the file, and export only the root and the prop types (`SelectTriggerProps`). Standalone components keep their own name (`ButtonLink`, `AvatarGroup`, `TableGroup`). Components ui-sdk doesn't have, like `Badge` or `EmptyState`, keep Kova names and follow the same shape.
- **Props.** A part takes the ui-sdk part's props, plus Kova's visual props (`color`, `variant`, `size`), which it writes as data attributes for the CSS. `className` may be a function of state: merge it with `mergeClassName`, never by string concatenation.
- **Exports.** A component file exports components and their prop types only. Re-export ui-sdk controllers and state types from the folder's `index.ts`.
- **Styles.** CSS Modules with Kova tokens, one class per part, named after it (`.SwitchThumb`). Style state from ui-sdk's attributes (`data-checked`, `data-open`, `data-highlighted`, `data-starting-style`, `data-ending-style`) and CSS variables (`--anchor-width`, `--available-height`, `--transform-origin`). Never import `@ui-sdk/core/web.css`. Write colors as `oklch()`, never hex, `rgb()` or `hsl()`.
- **Brand.** Checked, selected and filled states use the primary tokens (`--color-background-primary-solid`, `--color-text-primary-solid`) or a component token that falls back to `--kova-primary`, so a brand color reaches them. Focus rings use `--color-ring`. See `styles/variables-brand.css`.
- **Popups** render in the top layer. There are no Portal or Positioner parts.
- **Accessibility.** Name every control with its label part or `aria-label`. Don't hand-roll a `role=` that ui-sdk ships a component for.

File and folder names are kebab-case, like [vercel-labs/ui](https://github.com/vercel-labs/ui/tree/main/packages/react/src): `scroll-area/scroll-area.tsx`, `scroll-area.module.css`, `scroll-area.test.tsx` and `index.ts`, and `hooks/use-stable-callback.tsx` and `lib/merge-refs.ts` outside components. Component, hook and CSS class names stay as they are (`ScrollArea`, `useStableCallback`, `.ScrollAreaViewport`).

Relative imports include the `.js` extension (`./switch.js`), even for `.ts` and `.tsx` files. Consumers import components from `kova-ui/components`, icons from `@kova-ui/icons`, and `Markdown` and `CodeBlock` from `@kova-ui/markdown`. Use the same specifiers inside the repository; they resolve to source in development and tests.

Comments are rare: only for a browser quirk, an APG rule or a trade-off a reader would otherwise get wrong.

## Tests

Tests use Vitest through Vite+, with happy-dom and Testing Library. Import from `vite-plus/test`, and `{ userEvent }` from `@testing-library/user-event`. `test/setup-tests.ts` stubs the browser APIs ui-sdk popups need and turns on ui-sdk's strict mode.

Test what Kova adds and wires: names, keyboard paths through the composition, callbacks, Kova props and their data attributes. ui-sdk already tests its own behavior.

## Documentation

Every component has a page in `apps/docs/content/docs/components/<slug>.mdx` (transitions like Animate in `transitions/`), with live examples in `apps/docs/src/examples/<slug>/<name>.tsx`. Each example defines `function Example()` and exports it with `export { Example }`, and imports only from `kova-ui/components`, `@kova-ui/icons` and React. A page shows an example with `<Preview name="<slug>/<name>" />`. Pages follow the ui-sdk docs layout: intro and demo, Usage, one `##` section per example, API Reference (Markdown tables), Accessibility. There is no Installation section: the package is installed once, from the Installation page. Prop tables leave out `className` and `render`, which every part takes. Update the page whenever you change a component.

A page documents what Kova adds and links to ui-sdk for the rest. For a component that wraps ui-sdk:

- **Data attributes:** list only the attributes and CSS variables Kova writes (`data-variant`, `data-size`, `--tree-indent`), as an `| Attribute | Values | Description |` table. Link to the ui-sdk component's Data Attributes section for its state attributes (`data-open`, `data-highlighted`) and the CSS variables it sets (`--anchor-width`). Don't say how part names map: the Introduction page explains the pattern once (`Dialog.Content` is ui-sdk's `DialogContent`). Map names only where they don't follow it, like TabNav's parts on NavigationMenu.
- **Accessibility:** link to the ui-sdk component's Accessibility section for keyboard, focus and ARIA, instead of a key table. Keep Kova's own advice, like how to name the control or what a default button is called.
- Link to `https://ui-sdk.dev/docs/react/components/<name>#data-attributes` and `#accessibility`, as "See [data attributes](…)" and "See the [accessibility reference](…)". The docs introduce ui-sdk once, so don't repeat it or the component's name in these lines; name the ui-sdk component only when it differs, like TabNav's NavigationMenu. Components ui-sdk doesn't have, like `Badge`, document everything themselves.

## Commands

Run from the repository root, before every commit:

1. `pnpm run format:fix` - Oxfmt
2. `pnpm run lint` - Oxlint and Stylelint
3. `pnpm run types` - TypeScript
4. `pnpm run test` - Vitest

`pnpm run build` builds the packages (icons, then `kova-ui`, then markdown). `pnpm run docs:dev` and `pnpm run docs:build` run the docs site.
