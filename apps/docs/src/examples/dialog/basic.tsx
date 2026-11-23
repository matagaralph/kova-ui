import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Show dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Word of the day</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>Mvura means water.</Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
