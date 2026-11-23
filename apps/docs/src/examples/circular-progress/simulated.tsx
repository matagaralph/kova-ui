import { Button, CircularProgress } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [upload, setUpload] = useState(0)
  const [done, setDone] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <CircularProgress
        key={upload}
        aria-label="Uploading recording"
        maxDuration={8000}
        done={done}
      />
      <Button size="sm" variant="outline" onClick={() => setDone(true)} disabled={done}>
        Finish upload
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setDone(false)
          setUpload(upload + 1)
        }}
      >
        Restart
      </Button>
    </div>
  )
}

export { Example }
