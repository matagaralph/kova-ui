import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Display name</Field.Label>
      <Input name="display-name" defaultValue="Tendai" />
      <Field.Description>Shown on your profile and on the entries you add.</Field.Description>
    </Field>
  )
}

export { Example }
