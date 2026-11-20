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
      <Button color="secondary" variant="outline" onClick={() => toast("Event created")}>
        Default
      </Button>
      <Button color="secondary" variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button
        color="secondary"
        variant="outline"
        onClick={() => toast.info("A new version is available")}
      >
        Info
      </Button>
      <Button
        color="secondary"
        variant="outline"
        onClick={() => toast.warning("Storage is almost full")}
      >
        Warning
      </Button>
      <Button
        color="secondary"
        variant="outline"
        onClick={() => toast.error("Couldn't save changes")}
      >
        Error
      </Button>
      <Button
        color="secondary"
        variant="outline"
        onClick={() =>
          toast.promise(upload, {
            loading: "Uploading photos…",
            success: "Photos uploaded",
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
