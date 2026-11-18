import { TagInput } from "kova-ui/components"

function Example() {
  return (
    <div className="w-96">
      <TagInput defaultValue={["archived", "read-only"]} disabled>
        <TagInput.Control>
          <TagInput.Value />
          <TagInput.Input aria-label="Tags" />
        </TagInput.Control>
      </TagInput>
    </div>
  )
}

export { Example }
