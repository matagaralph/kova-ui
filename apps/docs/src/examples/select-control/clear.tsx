import { SelectControl } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [contributor, setContributor] = useState<string | null>("Tendai Moyo")

  return (
    <div className="flex w-64">
      <SelectControl block placeholder={!contributor} onClick={() => setContributor("Tendai Moyo")}>
        {contributor ?? "Any contributor"}
      </SelectControl>
      {contributor && (
        <SelectControl.Clear aria-label="Clear contributor" onClick={() => setContributor(null)} />
      )}
    </div>
  )
}

export { Example }
