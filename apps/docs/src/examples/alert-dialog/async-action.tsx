import { AlertDialog, Button } from "kova-ui/components"
import { useState } from "react"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Example() {
  const [status, setStatus] = useState("Active")

  return (
    <div className="flex items-center gap-3">
      <AlertDialog>
        <AlertDialog.Trigger render={<Button color="secondary" variant="outline" />}>
          Revoke key
        </AlertDialog.Trigger>
        <AlertDialog.Backdrop />
        <AlertDialog.Content width="medium">
          {(state) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Title>Revoke this API key?</AlertDialog.Title>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <AlertDialog.Description>
                  Apps using it stop working right away.
                </AlertDialog.Description>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.Close
                  disabled={state.pending}
                  render={<Button color="secondary" variant="outline" />}
                >
                  Cancel
                </AlertDialog.Close>
                <AlertDialog.Close
                  value="confirm"
                  action={async () => {
                    await wait(1500)
                    setStatus("Revoked")
                  }}
                  render={<Button color="danger" loading={state.pending} />}
                >
                  Revoke
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
