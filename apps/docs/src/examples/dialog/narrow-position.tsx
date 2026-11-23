import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <Dialog.Trigger render={<Button variant="outline" />}>
          Bottom sheet on phones
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Content position={{ narrow: "bottom", regular: "center" }} width="large">
          <Dialog.Header>
            <Dialog.Title>Share proverb</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>Below 768px wide, this dialog slides up from the bottom.</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close render={<Button />}>Done</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
      <Dialog>
        <Dialog.Trigger render={<Button variant="outline" />}>Full screen on phones</Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Content position={{ narrow: "fullscreen", regular: "center" }} width="large">
          <Dialog.Header>
            <Dialog.Title>Compose message</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>Below 768px wide, this dialog fills the screen.</Dialog.Body>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

export { Example }
