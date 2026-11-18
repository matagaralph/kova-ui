import { LoadingIndicator } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-6">
      <span className="text-sm">
        <LoadingIndicator />
      </span>
      <LoadingIndicator size={24} />
      <LoadingIndicator size={32} strokeWidth={3} />
      <LoadingIndicator size={40} strokeWidth={4} />
    </div>
  )
}

export { Example }
