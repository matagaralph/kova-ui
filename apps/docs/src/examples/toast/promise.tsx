import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useRef, useState } from "react"

function Example() {
  const [toast] = useState(() => createToaster())
  const attempts = useRef(0)
  useEffect(() => () => void toast.dismiss(), [toast])

  function save() {
    const succeeds = ++attempts.current % 2 === 1
    return new Promise<void>((resolve, reject) =>
      setTimeout(() => (succeeds ? resolve() : reject(new Error("Network error"))), 1500),
    )
  }

  function saveChanges() {
    toast.promise(save, {
      loading: "Saving changes…",
      success: "Changes saved",
      error: {
        title: "Couldn't save changes",
        description: "Check your connection and try again.",
        action: { label: "Retry", onAction: saveChanges },
      },
    })
  }

  return (
    <>
      <Button variant="outline" onClick={saveChanges}>
        Save changes
      </Button>
      <ToastRegion toaster={toast} />
    </>
  )
}

export { Example }
