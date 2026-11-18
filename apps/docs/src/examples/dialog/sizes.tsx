import { Button, Dialog } from "kova-ui/components"

const sizes = ["small", "medium", "large", "xlarge"] as const

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <Dialog key={size}>
          <Dialog.Trigger render={<Button color="secondary" variant="outline" />}>
            {size}
          </Dialog.Trigger>
          <Dialog.Backdrop />
          <Dialog.Content width={size}>
            <Dialog.Header>
              <Dialog.Title>A {size} dialog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>The body grows with its content, then scrolls.</Dialog.Body>
          </Dialog.Content>
        </Dialog>
      ))}
    </div>
  )
}

export { Example }
