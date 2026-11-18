import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field name="username" className="w-72">
      <Field.Label>Username</Field.Label>
      <Input autoComplete="username" placeholder="ada" />
      <Field.Description>Shown on your public profile.</Field.Description>
    </Field>
  )
}

export { Example }
