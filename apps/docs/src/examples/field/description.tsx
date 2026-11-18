import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Display name</Field.Label>
      <Input name="display-name" defaultValue="Hollis" />
      <Field.Description>Shown on your profile and in comments.</Field.Description>
    </Field>
  )
}

export { Example }
