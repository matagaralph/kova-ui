import { SelectControl } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <SelectControl block placeholder>
        Nothing selected
      </SelectControl>
      <SelectControl block invalid>
        Invalid
      </SelectControl>
      <SelectControl block loading>
        Loading
      </SelectControl>
      <SelectControl block disabled>
        Disabled
      </SelectControl>
    </div>
  )
}

export { Example }
