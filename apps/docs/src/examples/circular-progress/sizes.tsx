import { CircularProgress } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-6">
      <CircularProgress aria-label="Small" value={40} size={16} strokeWidth={3} />
      <CircularProgress aria-label="Default" value={40} />
      <CircularProgress aria-label="Large" value={40} size={48} strokeWidth={1} />
    </div>
  )
}

export { Example }
