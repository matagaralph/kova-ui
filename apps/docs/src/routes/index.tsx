import { createFileRoute, Link } from "@tanstack/react-router"
import { HomeLayout } from "fumadocs-ui/layouts/home"

import { baseOptions } from "../lib/layout.shared.js"
import { absoluteUrl, siteDescription, siteName, withBase } from "../lib/shared.js"

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: `${siteName} – The design system for Amashona` }],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
})

const FEATURES = [
  {
    title: "Design tokens",
    description:
      "Colors, type, spacing, radii, shadows and motion as CSS variables, in light and dark.",
    splat: "foundations/design-tokens",
  },
  {
    title: "Tailwind 4",
    description:
      "A Tailwind theme built from the same tokens, with Kova's utilities and breakpoints.",
    splat: "installation",
  },
  {
    title: "Accessible components",
    description:
      "Built on ui-sdk, with keyboard support, focus management and ARIA handled for you.",
    splat: "components",
  },
  {
    title: "Your brand",
    description: "Set a few --kova-* variables and every component follows your colors.",
    splat: "theming",
  },
]

function Home() {
  const layout = baseOptions()

  return (
    <HomeLayout
      {...layout}
      links={[
        { text: "Documentation", url: "/docs" },
        { text: "Components", url: "/docs/components" },
        ...(layout.links ?? []),
      ]}
    >
      <div
        id="nd-page"
        className="max-w-5xl sm:py-28 mx-auto flex w-full flex-1 flex-col px-6 py-20"
      >
        <p className="text-fd-muted-foreground mb-4 font-mono text-xs tracking-wide uppercase">
          Design system for Amashona
        </p>
        <h1 className="max-w-3xl sm:text-5xl text-4xl font-semibold tracking-tight text-balance">
          {siteName}
        </h1>
        <p className="max-w-2xl text-fd-muted-foreground mt-5 text-lg text-pretty">
          {siteDescription}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/docs/$"
            params={{ _splat: "installation" }}
            className="docs-button docs-button-primary"
          >
            Get started
          </Link>
          <Link to="/docs/$" params={{ _splat: "components" }} className="docs-button">
            Browse components
          </Link>
          <a href={withBase("/llms.txt")} className="docs-button docs-button-ghost">
            llms.txt
          </a>
        </div>
        <pre className="bg-fd-card mt-10 w-fit rounded-lg border px-4 py-3 font-mono text-sm">
          <code>pnpm add kova-ui</code>
        </pre>
        <ul className="bg-fd-border sm:grid-cols-2 mt-16 grid gap-px overflow-hidden rounded-xl border">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="bg-fd-background">
              <Link
                to="/docs/$"
                params={{ _splat: feature.splat }}
                className="hover:bg-fd-accent/40 block h-full p-6 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2"
              >
                <h2 className="font-medium">{feature.title}</h2>
                <p className="text-fd-muted-foreground mt-2 text-sm">{feature.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </HomeLayout>
  )
}
