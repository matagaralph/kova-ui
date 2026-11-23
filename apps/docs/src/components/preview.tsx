import { Check, ChevronRight, Copy } from "@kova-ui/icons"
import { type ComponentType, lazy, type ReactNode, Suspense, useState } from "react"

import { CopyButton } from "./copy-button.js"
import { ErrorBoundary, ErrorNotice } from "./error-boundary.js"

// Lazy, so a broken example only breaks its own preview
const modules = import.meta.glob<{ Example?: ComponentType }>("../examples/**/*.tsx")
const cache = new Map<string, ComponentType | null>()

// The production server loads every example up front, so prerendered pages have them in place of
// a fallback. In development they stay lazy, so edits to an example always show.
// One that fails to load stays lazy, and its preview shows the error.
if (import.meta.env.SSR && import.meta.env.PROD) {
  await Promise.allSettled(
    Object.entries(modules).map(async ([path, load]) => {
      const { Example } = await load()
      if (Example) cache.set(path.slice("../examples/".length, -".tsx".length), Example)
    }),
  )
}

function getExample(name: string) {
  if (cache.has(name)) return cache.get(name) ?? null
  const load = modules[`../examples/${name}.tsx`]
  const Example = load
    ? lazy(async () => {
        const module = await load()
        if (!module.Example) throw new Error(`src/examples/${name}.tsx doesn't export Example`)
        return { default: module.Example }
      })
    : null
  cache.set(name, Example)
  return Example
}

export type PreviewProps = {
  /** The example to show, `<slug>/<name>` for `src/examples/<slug>/<name>.tsx` */
  name: string
  /** The example's source, highlighted at build time */
  children?: ReactNode
  /** The example's source as text, for the page's Markdown */
  source?: string
}

/** Renders an example on Kova's surface, with its source behind a "Show code" toggle */
export function Preview({ name, children, source }: PreviewProps) {
  const Example = getExample(name)
  const [open, setOpen] = useState(false)

  return (
    <div className="docs-preview not-prose">
      <div className="docs-preview-canvas" data-example={name}>
        {Example ? (
          <ErrorBoundary
            fallback={(error) => <ErrorNotice title={`The ${name} example failed`} error={error} />}
          >
            <Suspense fallback={<span className="docs-preview-loading">Loading example…</span>}>
              <Example />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <ErrorNotice
            title="Example not found"
            error={new Error(`src/examples/${name}.tsx doesn't exist`)}
          />
        )}
      </div>
      <details
        className="docs-preview-source"
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary className="docs-preview-toggle">
          <ChevronRight aria-hidden />
          {open ? "Hide code" : "Show code"}
        </summary>
        <div className="docs-preview-code">
          {source !== undefined && (
            <CopyButton value={source} label="code" title="Copy code" className="docs-preview-copy">
              <Copy aria-hidden className="docs-preview-copy-idle" />
              <Check aria-hidden className="docs-preview-copy-done" />
            </CopyButton>
          )}
          {children}
        </div>
      </details>
    </div>
  )
}
