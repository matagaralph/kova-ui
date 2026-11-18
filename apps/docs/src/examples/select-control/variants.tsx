import { SelectControl } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <SelectControl variant="outline" block>
        Outline
      </SelectControl>
      <SelectControl variant="soft" block>
        Soft
      </SelectControl>
      <SelectControl variant="ghost">Ghost</SelectControl>
    </div>
  )
}

export { Example }
