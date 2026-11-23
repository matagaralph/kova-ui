import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useState } from "react"

function upload() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

function Example() {
  const [toast] = useState(() => createToaster())
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast("Event created")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("A new version is available")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Storage is almost full")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't save changes")}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(upload, {
            loading: "Uploading recordings…",
            success: "Recordings uploaded",
            error: "Upload failed",
          })
        }
      >
        Loading
      </Button>
      <ToastRegion toaster={toast} />
    </div>
  )
}

export { Example }
