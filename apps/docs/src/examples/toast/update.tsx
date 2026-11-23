import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useRef, useState } from "react"

function Example() {
  const [toast] = useState(() => createToaster())
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  useEffect(
    () => () => {
      clearInterval(timer.current)
      toast.dismiss()
    },
    [toast],
  )

  function upload() {
    clearInterval(timer.current)
    const id = toast.loading("Uploading story.mp3… 0%", { id: "upload" })
    let progress = 0
    timer.current = setInterval(() => {
      progress += 20
      const done = progress >= 100
      const open = toast.update(
        id,
        done
          ? { title: "Story uploaded", type: "success", duration: 5000 }
          : { title: `Uploading story.mp3… ${progress}%` },
      )
      if (done || !open) clearInterval(timer.current)
    }, 700)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={upload}>
        Upload story
      </Button>
      <Button variant="outline" onClick={() => toast.dismiss("upload")}>
        Cancel upload
      </Button>
      <Button variant="outline" onClick={() => toast.dismiss()}>
        Dismiss all
      </Button>
      <ToastRegion toaster={toast} />
    </div>
  )
}

export { Example }
