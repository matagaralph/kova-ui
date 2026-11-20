import { ArrowRight } from "@kova-ui/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { HomeLayout } from "fumadocs-ui/layouts/home"
import { Button, CopyButton, LayerCard } from "kova-ui/components"

import { baseOptions } from "../lib/layout.shared.js"
import { absoluteUrl, siteName, withBase } from "../lib/shared.js"

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: `${siteName} – The interface of AmaShona` }],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
})

const FEATURES = [
  {
    title: "Design tokens",
    description:
      "Color, type, spacing, radius, shadow and motion as CSS variables, in light and dark.",
    splat: "foundations/design-tokens",
  },
  {
    title: "Accessible components",
    description: "Keyboard support, focus management and ARIA come built in, in every component.",
    splat: "components",
  },
  {
    title: "Tailwind 4",
    description:
      "A theme built from the same tokens, so utilities and components never drift apart.",
    splat: "installation",
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
        <section>
          <h1 className="max-w-3xl sm:text-5xl text-4xl font-semibold tracking-tight text-balance">
            The interface of a language worth keeping.
          </h1>
          <p className="max-w-2xl mt-5 text-lg text-pretty text-secondary">
            AmaShona is an open platform preserving the Shona language, culture and knowledge for
            future generations. Kova UI is what it's built from: design tokens, a Tailwind 4 setup
            and accessible React components, so every word, proverb and song reads the same on every
            page.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              color="primary"
              size="lg"
              render={<Link to="/docs/$" params={{ _splat: "installation" }} />}
            >
              Get started
            </Button>
            <Button
              color="secondary"
              variant="outline"
              size="lg"
              render={<Link to="/docs/$" params={{ _splat: "components" }} />}
            >
              Browse components
            </Button>
            <Button
              color="secondary"
              variant="ghost"
              size="lg"
              render={<a href={withBase("/llms.txt")} />}
            >
              llms.txt
            </Button>
          </div>
          <div className="mt-8 flex w-fit items-center gap-2 rounded-lg py-1.5 ps-4 pe-1.5 shadow-hairline">
            <code className="font-mono text-sm">pnpm add kova-ui</code>
            <CopyButton
              copyValue="pnpm add kova-ui"
              aria-label="Copy the install command"
              color="secondary"
              variant="ghost"
              size="sm"
              uniform
            />
          </div>
        </section>

        <section className="lg:grid-cols-2 mt-24 grid items-start gap-10" aria-labelledby="why">
          <div>
            <h2 id="why" className="text-2xl font-semibold tracking-tight text-balance">
              Knowledge that lives in conversations
            </h2>
            <p className="mt-4 text-pretty text-secondary">
              Much of the Shona language lives in conversations, songs, books, families and
              communities. Some of it is hard to find online, some depends on context, and some
              loses its meaning when translated word for word.
            </p>
            <p className="mt-4 text-pretty text-secondary">
              AmaShona is building a structured, searchable, community-supported reference for
              words, meanings, translations, idioms, proverbs, riddles and songs, so that knowledge
              stays within reach. Kova gives every part of it the same look and the same accessible
              behavior.
            </p>
          </div>

          <div className="flex flex-col gap-4" aria-label="Built with Kova">
            <LayerCard>
              <LayerCard.Secondary>Tsumo · Proverb</LayerCard.Secondary>
              <LayerCard.Primary>
                <p className="m-0 text-lg font-semibold text-pretty">
                  Chara chimwe hachitswanyi inda.
                </p>
                <p className="m-0 text-secondary">One thumb can't crush a louse.</p>
                <p className="m-0 text-sm text-secondary">Some things can only be done together.</p>
              </LayerCard.Primary>
            </LayerCard>
            <LayerCard>
              <LayerCard.Secondary>Duramazwi · Dictionary</LayerCard.Secondary>
              <LayerCard.Primary>
                <p className="m-0 text-lg font-semibold">rudo</p>
                <p className="m-0 text-secondary">love</p>
              </LayerCard.Primary>
            </LayerCard>
          </div>
        </section>

        <section className="mt-24" aria-labelledby="inside">
          <h2 id="inside" className="text-2xl font-semibold tracking-tight">
            What's inside
          </h2>
          <ul className="docs-cards mt-6 list-none p-0">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex">
                <LayerCard render={<Link to="/docs/$" params={{ _splat: feature.splat }} />}>
                  <LayerCard.Secondary>
                    {feature.title}
                    <ArrowRight aria-hidden="true" className="docs-card-arrow" />
                  </LayerCard.Secondary>
                  <LayerCard.Primary>{feature.description}</LayerCard.Primary>
                </LayerCard>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </HomeLayout>
  )
}
