import { Button, Dialog } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState("Nothing yet")

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Publish
      </Button>
      <span className="text-sm text-secondary">Last answer: {result}</span>
      <Dialog
        open={open}
        onOpenChange={(next, details) => {
          setOpen(next)
          if (!next) setResult(details.returnValue ?? details.reason)
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Content width="large">
          <Dialog.Header>
            <Dialog.Title>Publish story?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>It goes live in the story library right away.</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close value="draft" render={<Button variant="outline" />}>
              Keep as draft
            </Dialog.Close>
            <Dialog.Close value="published" render={<Button />}>
              Publish
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

export { Example }
