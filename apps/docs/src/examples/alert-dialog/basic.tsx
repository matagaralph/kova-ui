import { AlertDialog, Button } from "kova-ui/components"

function Example() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger render={<Button color="secondary" variant="outline" />}>
        Discard draft
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop />
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Discard this draft?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <AlertDialog.Description>
            Your changes since the last save will be lost.
          </AlertDialog.Description>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button color="secondary" variant="outline" />}>
            Keep editing
          </AlertDialog.Close>
          <AlertDialog.Close value="confirm" render={<Button color="danger" />}>
            Discard
          </AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export { Example }
