import { CircularProgress } from "kova-ui/components"

function Example() {
  return (
    <CircularProgress
      aria-label="Syncing bookmarks"
      value={70}
      trackColor="var(--alpha-15)"
      trackActiveColor="var(--color-text)"
    />
  )
}

export { Example }
