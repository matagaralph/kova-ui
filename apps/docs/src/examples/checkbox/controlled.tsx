import { Checkbox, Label } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false)

  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox checked={checked} onCheckedChange={setChecked}>
          <Checkbox.Indicator />
        </Checkbox>
        Show English meanings
      </Label>
      <p className="text-sm text-secondary">
        English meanings are {checked === true ? "shown" : "hidden"}.
      </p>
    </div>
  )
}

export { Example }
