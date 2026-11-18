import { Field, TagInput } from "kova-ui/components"

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

function Example() {
  return (
    <Field className="w-96">
      <Field.Label>Invite people</Field.Label>
      <TagInput defaultValue={["tendai@amashona.com", "not-an-email"]} validator={isEmail}>
        <TagInput.Control>
          <TagInput.Value />
          <TagInput.Input placeholder="Add email addresses" />
        </TagInput.Control>
      </TagInput>
      <Field.Description>
        Separate addresses with a comma or a space, or paste a list.
      </Field.Description>
    </Field>
  )
}

export { Example }
