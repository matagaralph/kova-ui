import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field name="username" className="w-72">
      <Field.Label>Username</Field.Label>
      <Input autoComplete="username" placeholder="tendai" />
      <Field.Description>Shown on the entries you contribute.</Field.Description>
    </Field>
  )
}

export { Example }
