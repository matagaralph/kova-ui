import { Button, TransitionGroup } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="flex flex-col items-center gap-6">
      <Button variant="outline" onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"}
      </Button>
      <div className="size-32">
        <TransitionGroup
          as="div"
          enterDuration={300}
          exitDuration={300}
          className="transition-opacity duration-300 data-exiting-active:opacity-0 [&[data-entering]:not([data-entering-active])]:opacity-0"
        >
          {visible && (
            <div key="card" className="size-32 rounded-lg bg-(--color-background-primary-solid)" />
          )}
        </TransitionGroup>
      </div>
    </div>
  )
}

export { Example }
