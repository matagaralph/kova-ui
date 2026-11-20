import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button color="secondary" variant="outline" />}>
        Show dialog
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Project details</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>Kova UI is the design system every Amashona product builds on.</Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
