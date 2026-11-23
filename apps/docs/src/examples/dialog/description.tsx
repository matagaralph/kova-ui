import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Show dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Pronunciation recording</Dialog.Title>
          <Dialog.Description>Zezuru · recorded 2 hours ago</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>Two reviewers approved it, and it plays on the entry now.</Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
