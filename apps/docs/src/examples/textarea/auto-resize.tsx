import { Field, Textarea } from "kova-ui/components"

function Example() {
  return (
    <Field name="usage" className="w-80">
      <Field.Label>Usage note</Field.Label>
      <Textarea autoResize rows={2} maxRows={6} placeholder="Where and when people say it…" />
      <Field.Description>Grows to six lines, then scrolls.</Field.Description>
    </Field>
  )
}

export { Example }
