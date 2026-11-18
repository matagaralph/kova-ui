import { CopyButton } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <CopyButton copyValue="pnpm add kova-ui" color="secondary" variant="outline" size="sm">
        {({ copied }) => (copied ? "Copied" : "Copy command")}
      </CopyButton>
      <CopyButton
        copyValue="sk_live_51Hx…"
        color="secondary"
        variant="ghost"
        size="sm"
        uniform
        aria-label="Copy API key"
      />
    </div>
  )
}

export { Example }
