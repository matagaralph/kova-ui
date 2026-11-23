import { Field, TagInput } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-96">
      <Field.Label>Topics</Field.Label>
      <TagInput defaultValue={["proverbs", "music"]}>
        <TagInput.Control>
          <TagInput.Value />
          <TagInput.Input placeholder="Add a topic" />
        </TagInput.Control>
      </TagInput>
    </Field>
  )
}

export { Example }
