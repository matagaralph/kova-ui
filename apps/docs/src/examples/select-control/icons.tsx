import { Globe } from "@kova-ui/icons"
import { SelectControl } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <SelectControl block StartIcon={Globe}>
        English
      </SelectControl>
      <SelectControl block dropdownIconType="chevronDown">
        Chevron
      </SelectControl>
      <SelectControl block dropdownIconType="none">
        No icon
      </SelectControl>
    </div>
  )
}

export { Example }
