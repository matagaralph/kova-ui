import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useRef, useState } from "react"

const notifications = [
  { title: "Event created", description: "Friday, 12 June at 10:00" },
  { title: "Message sent" },
  {
    title: "Rudo Chikore joined",
    description: "They can now add words and review recordings.",
  },
  { title: "Changes saved" },
  { title: "Recording published", description: "shumba · Tendai Moyo" },
  { title: "Proverbs added", description: "12 proverbs added to your collection" },
]

function Example() {
  const [toast] = useState(() => createToaster())
  const count = useRef(0)
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <>
      <Button
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
