import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Headword</Field.Label>
      <Input name="headword" required />
      <Field.Description>The word in standard Shona spelling.</Field.Description>
    </Field>
  )
}

export { Example }
