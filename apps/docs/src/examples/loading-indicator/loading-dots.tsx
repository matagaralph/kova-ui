import { LoadingDots } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-4">
      <LoadingDots role="status" aria-label="Tendai is typing" />
      <LoadingDots className="text-secondary" />
    </div>
  )
}

export { Example }
