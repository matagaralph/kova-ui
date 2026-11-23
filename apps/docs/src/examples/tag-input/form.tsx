import { Button, Field, TagInput } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string[] | null>(null)

  return (
    <form
      className="flex w-96 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(new FormData(event.currentTarget).getAll("tags").map(String))
      }}
    >
      <Field>
        <Field.Label>Tags</Field.Label>
        <TagInput name="tags" required defaultValue={["greetings"]}>
          <TagInput.Control>
            <TagInput.Value />
            <TagInput.Input placeholder="Add a tag" />
          </TagInput.Control>
        </TagInput>
      </Field>
      <Button type="submit" size="sm">
        Save
      </Button>
      {submitted && <p className="text-sm text-secondary">Saved tags={submitted.join(", ")}</p>}
    </form>
  )
}

export { Example }
