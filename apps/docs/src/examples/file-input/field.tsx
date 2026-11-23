import { Button, Field, FileInput } from "kova-ui/components"

function Example() {
  return (
    <form
      className="max-w-sm flex flex-col items-start gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <Field.Label>Pronunciation recording</Field.Label>
        <FileInput name="recording" required accept="audio/*">
          {(state) => (
            <div className="flex items-center gap-3">
              <FileInput.Trigger render={<Button variant="outline" />}>
                Choose a file
              </FileInput.Trigger>
              <span className="truncate text-sm text-secondary">
                {state.value[0]?.name ?? "No file chosen"}
              </span>
            </div>
          )}
        </FileInput>
        <Field.Description>
          Say the headword once, clearly, as it sounds in your dialect.
        </Field.Description>
        <Field.Error match="valueMissing">Add a recording to continue.</Field.Error>
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export { Example }
