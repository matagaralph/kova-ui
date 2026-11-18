import { AlertDialog, Button } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState("none")

  return (
    <div className="flex items-center gap-3">
      <Button color="secondary" variant="outline" onClick={() => setOpen(true)}>
        Leave workspace
      </Button>
      <span className="text-sm text-secondary">Answer: {answer}</span>
      <AlertDialog
        open={open}
        onOpenChange={(next, details) => {
          setOpen(next)
          if (!next) setAnswer(details.returnValue ?? "cancel")
        }}
      >
        <AlertDialog.Backdrop />
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Leave the Design workspace?</AlertDialog.Title>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <AlertDialog.Description>
              You'll need a new invite to come back.
            </AlertDialog.Description>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <AlertDialog.Close render={<Button color="secondary" variant="outline" />}>
              Stay
            </AlertDialog.Close>
            <AlertDialog.Close value="confirm" render={<Button color="danger" />}>
              Leave
            </AlertDialog.Close>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  )
}

export { Example }
