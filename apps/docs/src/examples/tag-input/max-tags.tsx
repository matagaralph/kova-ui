import { Field, TagInput } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-96">
      <Field.Label>Keywords</Field.Label>
      <TagInput defaultValue={["water", "rain"]} maxTags={5}>
        <TagInput.Control>
          <TagInput.Value />
          <TagInput.Input placeholder="Add up to five keywords" />
        </TagInput.Control>
        <TagInput.Count />
      </TagInput>
    </Field>
  )
}

export { Example }
