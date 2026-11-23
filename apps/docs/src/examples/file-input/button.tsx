import { Button, FileInput } from "kova-ui/components"

function Example() {
  return (
    <FileInput name="recording" accept="audio/*">
      {(state) => (
        <div className="flex items-center gap-3">
          <FileInput.Trigger render={<Button variant="outline" />}>
            {state.value[0] ? "Replace recording" : "Upload recording"}
          </FileInput.Trigger>
          <span className="text-sm text-secondary">{state.value[0]?.name ?? "No file chosen"}</span>
        </div>
      )}
    </FileInput>
  )
}

export { Example }
