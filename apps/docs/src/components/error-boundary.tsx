import { Component, type ErrorInfo, type ReactNode } from "react"

type ErrorBoundaryProps = {
  /** Shown instead of the children once they throw */
  fallback: (error: Error) => ReactNode
  children: ReactNode
}

/** Keeps a broken example or widget from taking the rest of the page down with it */
export class ErrorBoundary extends Component<ErrorBoundaryProps, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error : new Error(String(error)) }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // oxlint-disable-next-line no-console
    console.error(error, info.componentStack)
  }

  render() {
    return this.state.error ? this.props.fallback(this.state.error) : this.props.children
  }
}

export function ErrorNotice({ title, error }: { title: string; error: Error }) {
  return (
    <div
      role="alert"
      className="border-fd-border max-w-full rounded-lg border border-dashed px-4 py-3 text-sm"
    >
      <p className="text-fd-foreground font-medium">{title}</p>
      <p className="text-fd-muted-foreground mt-1 font-mono text-xs break-words">{error.message}</p>
    </div>
  )
}
