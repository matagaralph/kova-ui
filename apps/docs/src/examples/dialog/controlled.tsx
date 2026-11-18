import { Button, Dialog } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState("Nothing yet")

  return (
    <div className="flex items-center gap-3">
      <Button color="secondary" variant="outline" onClick={() => setOpen(true)}>
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
            <Dialog.Title>Publish article?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>It goes live on your blog right away.</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close value="draft" render={<Button color="secondary" variant="outline" />}>
              Keep as draft
            </Dialog.Close>
            <Dialog.Close value="published" render={<Button color="primary" />}>
              Publish
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

export { Example }
