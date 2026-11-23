import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>Show activity</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Content position="right" width="medium">
        <Dialog.Header>
          <Dialog.Title>Activity</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <ul className="flex flex-col gap-3">
            <li>Rudo added “sadza” to the dictionary.</li>
            <li>Farai recorded a pronunciation of “mbira”.</li>
            <li>Tinashe published 12 proverbs.</li>
          </ul>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog>
  )
}

export { Example }
