import { AlertDialog, Button } from "kova-ui/components"
import { useState } from "react"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Example() {
  const [status, setStatus] = useState("Published")

  return (
    <div className="flex items-center gap-3">
      <AlertDialog>
        <AlertDialog.Trigger render={<Button variant="outline" />}>Unpublish</AlertDialog.Trigger>
        <AlertDialog.Backdrop />
        <AlertDialog.Content width="medium">
          {(state) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Title>Unpublish “sadza”?</AlertDialog.Title>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <AlertDialog.Description>
                  It leaves the dictionary right away and goes back to the review queue.
                </AlertDialog.Description>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.Close disabled={state.pending} render={<Button variant="outline" />}>
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close
                  value="confirm"
                  action={async () => {
                    await wait(1500)
                    setStatus("In review")
                  }}
                  render={<Button variant="destructive" loading={state.pending} />}
                >
                  Unpublish
                </AlertDialog.Close>
              </AlertDialog.Footer>
            </>
          )}
        </AlertDialog.Content>
      </AlertDialog>
      <span className="text-sm text-secondary">Status: {status}</span>
    </div>
  )
}

export { Example }
