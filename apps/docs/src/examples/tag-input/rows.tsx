import { Field, TagInput } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-96">
      <Field.Label>Allowed domains</Field.Label>
      <TagInput delimiters={[",", " ", ";"]}>
        <TagInput.Control rows={3}>
          <TagInput.Value />
          <TagInput.Input placeholder="example.com; another.org" />
        </TagInput.Control>
      </TagInput>
    </Field>
  )
}

export { Example }
