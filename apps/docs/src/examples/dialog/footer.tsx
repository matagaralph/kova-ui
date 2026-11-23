import { Button, Dialog, Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Edit profile</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content width="large">
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-4">
          <Field>
            <Field.Label>Name</Field.Label>
            <Input defaultValue="Tendai Moyo" />
          </Field>
          <Field>
            <Field.Label>Username</Field.Label>
            <Input defaultValue="tendai" />
          </Field>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
          <Dialog.Close value="save" render={<Button />}>
            Save changes
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
