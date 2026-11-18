import { SelectControl } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [owner, setOwner] = useState<string | null>("Tendai Moyo")

  return (
    <div className="flex w-64">
      <SelectControl block placeholder={!owner} onClick={() => setOwner("Tendai Moyo")}>
        {owner ?? "Any owner"}
      </SelectControl>
      {owner && <SelectControl.Clear aria-label="Clear owner" onClick={() => setOwner(null)} />}
    </div>
  )
}

export { Example }
