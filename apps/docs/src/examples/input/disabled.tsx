import { Field, Input } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Field disabled>
        <Field.Label>Email</Field.Label>
        <Input type="email" defaultValue="tendai@example.com" />
      </Field>
      <Field>
        <Field.Label>Headword</Field.Label>
        <Input readOnly defaultValue="mvura" />
      </Field>
    </div>
  )
}

export { Example }
