import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <Field disabled className="w-72">
      <Field.Label>Workspace URL</Field.Label>
      <Input name="workspace" defaultValue="acme.example.com" />
      <Field.Description>Contact support to change your workspace URL.</Field.Description>
    </Field>
  )
}

export { Example }
