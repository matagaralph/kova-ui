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
          <Dialog.Title>Deployment</Dialog.Title>
          <Dialog.Description>Production · deployed 2 hours ago</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>All 14 checks passed and the build is live.</Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
