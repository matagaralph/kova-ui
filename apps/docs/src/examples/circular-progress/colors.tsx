import { CircularProgress } from "kova-ui/components"

function Example() {
  return (
    <CircularProgress
      aria-label="Syncing"
      value={70}
      trackColor="var(--alpha-15)"
      trackActiveColor="var(--gray-1000)"
    />
  )
}

export { Example }
