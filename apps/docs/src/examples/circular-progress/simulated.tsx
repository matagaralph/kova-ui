import { Button, CircularProgress } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [upload, setUpload] = useState(0)
  const [done, setDone] = useState(false)

  return (
    <div className="flex items-center gap-4">
      <CircularProgress key={upload} aria-label="Uploading photos" maxDuration={8000} done={done} />
      <Button
        size="sm"
        variant="outline"
        color="secondary"
        onClick={() => setDone(true)}
        disabled={done}
      >
        Finish upload
      </Button>
      <Button
        size="sm"
        variant="ghost"
        color="secondary"
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
