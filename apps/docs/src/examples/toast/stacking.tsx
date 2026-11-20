import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useRef, useState } from "react"

const notifications = [
  { title: "Event created", description: "Friday, 12 June at 10:00" },
  { title: "Message sent" },
  {
    title: "Rudo Chikwanha joined",
    description: "They can now edit the launch plan and see its comments.",
  },
  { title: "Changes saved" },
  { title: "Invoice sent", description: "Tendai Moyo · $240.00" },
  { title: "Photos uploaded", description: "12 photos added to Victoria Falls trip" },
]

function Example() {
  const [toast] = useState(() => createToaster())
  const count = useRef(0)
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <>
      <Button
        color="secondary"
        variant="outline"
        onClick={() => toast(notifications[count.current++ % notifications.length]!)}
      >
        Add toast
      </Button>
      <ToastRegion toaster={toast} maxVisible={4} />
    </>
  )
}

export { Example }
