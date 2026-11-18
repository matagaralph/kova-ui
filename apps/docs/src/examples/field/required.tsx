import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Project name</Field.Label>
      <Input name="project" required />
      <Field.Description>Letters, numbers and dashes.</Field.Description>
    </Field>
  )
}

export { Example }
