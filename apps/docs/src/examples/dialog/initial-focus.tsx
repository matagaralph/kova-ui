import { Button, Dialog, Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Invite reviewer</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content width="large" initialFocus="[name='email']">
        <Dialog.Header>
          <Dialog.Title>Invite a reviewer</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-4">
          <Field>
            <Field.Label>Collection</Field.Label>
            <Input defaultValue="Proverbs" readOnly />
          </Field>
          <Field>
            <Field.Label>Email</Field.Label>
            <Input name="email" type="email" placeholder="name@example.com" />
          </Field>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close value="invite" render={<Button />}>
            Send invite
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
