import { type ComponentType, lazy, Suspense } from "react"

import { ErrorBoundary, ErrorNotice } from "./error-boundary.js"

/**
 * Loads a docs widget on demand, behind an error boundary. Widgets built with Kova components
 * import `kova-ui/components`, so a broken component can't break every page.
 *
 * On the production server, `ready` loads the widget up front, so prerendered pages have it in
 * place of a fallback.
 */
export function lazyWidget<P extends object>(
  title: string,
  load: () => Promise<{ default: ComponentType<P> }>,
) {
  let Loaded: ComponentType<P> | null = null
  const Lazy = lazy(load)

  function LazyWidget(props: P) {
    const Widget = Loaded ?? Lazy
    return (
      <div className="not-prose my-6">
        <ErrorBoundary
          fallback={(error) => <ErrorNotice title={`${title} failed`} error={error} />}
        >
          <Suspense fallback={<p className="text-fd-muted-foreground text-sm">Loading…</p>}>
            <Widget {...props} />
          </Suspense>
        </ErrorBoundary>
      </div>
    )
  }

  LazyWidget.ready =
    import.meta.env.SSR && import.meta.env.PROD
      ? load().then(
          (module) => {
            Loaded = module.default
          },
          () => {},
        )
      : Promise.resolve()

  return LazyWidget
}
