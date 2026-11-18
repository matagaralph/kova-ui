import { Button } from "kova-ui/components"
import { useState } from "react"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Example() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true)
          setTimeout(() => setLoading(false), 1500)
        }}
      >
        Deploy
      </Button>
      <Button color="secondary" variant="outline" onClick={() => wait(1500)}>
        Sync now
      </Button>
    </div>
  )
}

export { Example }
