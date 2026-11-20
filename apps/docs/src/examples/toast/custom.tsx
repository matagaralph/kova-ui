import { Avatar, Button, createToaster, Toast, ToastRegion } from "kova-ui/components"
import { useEffect, useState } from "react"

function Example() {
  const [toast] = useState(() => createToaster())
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <>
      <Button
        color="secondary"
        variant="outline"
        onClick={() =>
          toast({
            title: "Rudo Chikwanha",
            description: "Can you review the draft?",
            data: { name: "Rudo Chikwanha" },
            action: { label: "Reply" },
          })
        }
      >
        New message
      </Button>
      <ToastRegion toaster={toast} aria-label="Messages">
        {(item) => (
          <Toast>
            <Avatar size={32} aria-hidden="true">
              <Avatar.Fallback name={(item.data as { name: string }).name} />
            </Avatar>
            <Toast.Content>
              <Toast.Title />
              <Toast.Description />
            </Toast.Content>
            <Toast.Action />
            <Toast.Close />
          </Toast>
        )}
      </ToastRegion>
    </>
  )
}

export { Example }
