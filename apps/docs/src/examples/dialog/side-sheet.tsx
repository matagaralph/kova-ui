import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button color="secondary" variant="outline" />}>
        Show activity
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content position="right" width="medium">
        <Dialog.Header>
          <Dialog.Title>Activity</Dialog.Title>
          <Dialog.Description>The last 24 hours in this project.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <ul className="flex flex-col gap-3">
            <li>Ada merged “Fix login redirect”.</li>
            <li>Grace opened “Add billing alerts”.</li>
            <li>Linus deployed v2.4.1 to production.</li>
          </ul>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
