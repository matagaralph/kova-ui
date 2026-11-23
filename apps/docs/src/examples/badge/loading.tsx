import { Badge, LoadingIndicator } from "kova-ui/components"

function Example() {
  return (
    <Badge size="lg" className="gap-1.5">
      <LoadingIndicator />
      In review
    </Badge>
  )
}

export { Example }
