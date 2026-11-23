import { LoadingIndicator } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-2 text-danger" role="status">
      <LoadingIndicator />
      Deleting recording…
    </div>
  )
}

export { Example }
