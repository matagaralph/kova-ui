import { Field, Textarea } from "kova-ui/components"

function Example() {
  return (
    <Field name="message" className="w-80">
      <Field.Label>Message</Field.Label>
      <Textarea placeholder="Type your message here…" />
    </Field>
  )
}

export { Example }
