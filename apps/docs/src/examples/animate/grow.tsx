import { Animate, Button } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="flex flex-col items-center gap-6">
      <Button variant="outline" onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"}
      </Button>
      <Animate className="size-32" enter={{ scale: 1 }} exit={{ scale: 0.5, blur: 20 }}>
        {visible && (
          <div key="card" className="size-32 rounded-lg bg-(--color-background-primary-solid)" />
        )}
      </Animate>
    </div>
  )
}

export { Example }
