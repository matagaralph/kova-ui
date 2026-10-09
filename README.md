# Kova UI

Kova UI is the lightweight, accessible design system for Amashona, giving every Amashona product a consistent, high-quality look and feel. It provides Tailwind-integrated design tokens, a curated React component library, and utilities that keep every product looking and behaving the same.

## Features

- **Design tokens** for colors, typography, spacing, sizing, shadows, surfaces, and more.
- **Tailwind 4 integration** pre-configured with Kova UI's design tokens.
- **Accessible components**, built on Base UI primitives with consistent styling.
- **Utilities** for dark mode, responsive layouts, and more.
- **Minimal boilerplate** — import styles, wrap with a provider, start building.

## Prerequisites

Kova UI requires **React 18 or 19** and **Tailwind 4**.

- React: https://react.dev/learn/installation
- Tailwind 4: https://tailwindcss.com/docs/installation

## Installation

### 1. Install the package

```bash
bun add kova-ui
```

### 2. Setup styles

Add the foundation styles and Tailwind layers to the top of your global stylesheet (e.g. `main.css`):

```css
@import "tailwindcss";
@import "kova-ui/css";
/* Required for Tailwind to find class references in Kova UI components. */
@source "../node_modules/kova-ui";

/* The rest of your application CSS */
```

Then import your stylesheet _before_ rendering any components:

```tsx
// Must be imported first to ensure Tailwind layers and style foundations are defined before any potential component styles
import "./main.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 3. Configure router (optional)

`<KovaProvider>` helps define your default router link component, used in components like `<TextLink>` and `<ButtonLink>`.

This provider is optional - router links can also be [passed directly to components](https://matagaralph.github.io/kova-ui/?path=/docs/components-textlink--docs#component-level) via the `as` prop.

```tsx
// Must be imported first to ensure Tailwind layers and style foundations are defined before component styles
import "./main.css"

import { KovaProvider } from "kova-ui/components"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Link } from "react-router"
import { App } from "./App"

declare global {
  interface KovaConfig {
    LinkComponent: typeof Link
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KovaProvider linkComponent={Link}>
      <App />
    </KovaProvider>
  </StrictMode>,
)
```

### Importing

Import components from `kova-ui/components` and icons from `kova-ui/icons`:

```tsx
import { Badge, Button } from "kova-ui/components"
import { Calendar, Check } from "kova-ui/icons"
```

Your bundler only includes the components and icons you use. Each component also has its own path, like `kova-ui/components/Button`, which still works, but prefer the two above.

In Next.js, add the package to `optimizePackageImports` so development builds only compile what you import:

```js
// next.config.js
export default {
  experimental: {
    optimizePackageImports: ["kova-ui"],
  },
}
```

### Start building

Your project is now ready to use Kova UI!

Here's an example of a simple reservation card, using Tailwind classes and components.

```tsx
import { Badge, Button } from "kova-ui/components"
import { Calendar, Invoice, Maps, Members, Phone } from "kova-ui/icons"

export function ReservationCard() {
  return (
    <div className="max-w-sm w-full rounded-2xl border border-default bg-surface p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-secondary">Reservation</p>
          <h2 className="mt-1 heading-lg">La Luna Bistro</h2>
        </div>
        <Badge color="success">Confirmed</Badge>
      </div>
      <div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Calendar className="size-4" />
            Date
          </dt>
          <dd className="text-right">Apr 12 · 7:30 PM</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Members className="size-4" />
            Guests
          </dt>
          <dd className="text-right">Party of 2</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Invoice className="size-4" />
            Reference
          </dt>
          <dd className="text-right uppercase">4F9Q2K</dd>
        </dl>
      </div>
      <div className="sm:grid-cols-2 mt-4 grid gap-3 border-t border-subtle pt-4">
        <Button variant="soft" color="secondary" block>
          <Phone />
          Call
        </Button>
        <Button color="primary" block>
          <Maps />
          Directions
        </Button>
      </div>
    </div>
  )
}
```

## License

[MIT](LICENSE) © Mataga Ralph
