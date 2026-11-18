import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Field disabled>
        <Field.Label>Email</Field.Label>
        <Input type="email" defaultValue="ada@example.com" />
      </Field>
      <Field>
        <Field.Label>Profile URL</Field.Label>
        <Input readOnly defaultValue="kova.dev/ada" />
      </Field>
    </div>
  )
}

export { Example }
