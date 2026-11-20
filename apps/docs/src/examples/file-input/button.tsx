import { Button, FileInput } from "kova-ui/components"

function Example() {
  return (
    <FileInput name="resume" accept=".pdf">
      {(state) => (
        <div className="flex items-center gap-3">
          <FileInput.Trigger render={<Button color="secondary" variant="outline" />}>
            {state.value[0] ? "Replace resume" : "Upload resume"}
          </FileInput.Trigger>
          <span className="text-sm text-secondary">{state.value[0]?.name ?? "No file chosen"}</span>
        </div>
      )}
    </FileInput>
  )
}

export { Example }
