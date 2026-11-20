import { Button, Field, FileInput } from "kova-ui/components"

function Example() {
  return (
    <form
      className="max-w-sm flex flex-col items-start gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <Field.Label>Proof of address</Field.Label>
        <FileInput name="proof" required accept={["image/*", ".pdf"]}>
          {(state) => (
            <div className="flex items-center gap-3">
              <FileInput.Trigger render={<Button color="secondary" variant="outline" />}>
                Choose a file
              </FileInput.Trigger>
              <span className="truncate text-sm text-secondary">
                {state.value[0]?.name ?? "No file chosen"}
              </span>
            </div>
          )}
        </FileInput>
        <Field.Description>
          A utility bill or bank statement from the last 3 months.
        </Field.Description>
        <Field.Error match="valueMissing">Add a scan to continue.</Field.Error>
      </Field>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
  )
}

export { Example }
