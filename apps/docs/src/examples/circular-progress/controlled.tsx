import { Button, CircularProgress } from "kova-ui/components"
import { useState } from "react"

const total = 5

function Example() {
  const [uploaded, setUploaded] = useState(1)

  return (
    <div className="flex items-center gap-4">
      <CircularProgress aria-label="Uploading recordings" value={uploaded} max={total} />
      <span className="text-sm text-secondary">
        {uploaded} of {total} recordings
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setUploaded(uploaded >= total ? 0 : uploaded + 1)}
      >
        {uploaded >= total ? "Reset" : "Upload next"}
      </Button>
    </div>
  )
}

export { Example }
