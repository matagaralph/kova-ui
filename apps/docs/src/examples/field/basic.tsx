import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Username</Field.Label>
      <Input name="username" autoComplete="username" placeholder="hollis" />
    </Field>
  )
}

export { Example }
