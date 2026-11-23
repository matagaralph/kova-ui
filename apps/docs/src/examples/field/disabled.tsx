import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field disabled className="w-72">
      <Field.Label>Email</Field.Label>
      <Input name="email" defaultValue="tendai@example.com" />
      <Field.Description>Contact support to change your email.</Field.Description>
    </Field>
  )
}

export { Example }
