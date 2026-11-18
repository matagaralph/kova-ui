import { LoadingIndicator } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-6">
      <LoadingIndicator size={24} className="[--indicator-rotate-duration:0.5s]" />
      <LoadingIndicator size={24} />
      <LoadingIndicator size={24} className="[--indicator-rotate-duration:3s]" />
    </div>
  )
}

export { Example }
