import { Field, TagInput } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-96">
      <Field.Label>Related words</Field.Label>
      <TagInput delimiters={[",", " ", ";"]}>
        <TagInput.Control rows={3}>
          <TagInput.Value />
          <TagInput.Input placeholder="rwizi; gomo" />
        </TagInput.Control>
      </TagInput>
    </Field>
  )
}

export { Example }
