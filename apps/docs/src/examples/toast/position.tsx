import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useState } from "react"

type Side = "top" | "bottom"
type Align = "start" | "center" | "end"

const positions: { side: Side; align: Align; label: string }[] = [
  { side: "top", align: "start", label: "Top start" },
  { side: "top", align: "center", label: "Top center" },
  { side: "top", align: "end", label: "Top end" },
  { side: "bottom", align: "start", label: "Bottom start" },
  { side: "bottom", align: "center", label: "Bottom center" },
  { side: "bottom", align: "end", label: "Bottom end" },
]

function Example() {
  const [toast] = useState(() => createToaster())
  const [position, setPosition] = useState(positions[5]!)
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <div className="grid grid-cols-3 gap-2">
      {positions.map((option) => (
        <Button
          key={option.label}
          color="secondary"
          variant="outline"
          onClick={() => {
            toast.dismiss()
            setPosition(option)
            toast("Event created", { description: `Shown at ${option.label.toLowerCase()}` })
          }}
        >
          {option.label}
        </Button>
      ))}
      <ToastRegion toaster={toast} side={position.side} align={position.align} />
    </div>
  )
}

export { Example }
