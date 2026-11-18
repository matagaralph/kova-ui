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
        Archive finished tasks
      </Label>
      <p className="text-sm text-secondary">
        Finished tasks are {checked === true ? "archived" : "kept"}.
      </p>
    </div>
  )
}

export { Example }
