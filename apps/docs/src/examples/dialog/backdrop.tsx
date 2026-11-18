import { Button, Dialog } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["dim", "fade"] as const).map((variant) => (
        <Dialog key={variant}>
          <Dialog.Trigger render={<Button color="secondary" variant="outline" />}>
            {variant === "dim" ? "Dim backdrop" : "Fade backdrop"}
          </Dialog.Trigger>
          <Dialog.Backdrop variant={variant} />
          <Dialog.Content width="medium">
            <Dialog.Header>
              <Dialog.Title>{variant === "dim" ? "Dimmed page" : "Faded page"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>Look at the page behind this dialog.</Dialog.Body>
          </Dialog.Content>
        </Dialog>
      ))}
    </div>
  )
}

export { Example }
