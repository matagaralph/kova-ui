import { Field, Textarea } from "kova-ui/components"

function Example() {
  return (
    <Field name="notes" className="w-80">
      <Field.Label>Delivery notes</Field.Label>
      <Textarea autoResize rows={2} maxRows={6} placeholder="Gate code, where to leave it…" />
      <Field.Description>Grows to six lines, then scrolls.</Field.Description>
    </Field>
  )
}

export { Example }
