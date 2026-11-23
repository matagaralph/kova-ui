import { Label, Switch } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Switch checked={checked} onCheckedChange={setChecked}>
          <Switch.Thumb />
        </Switch>
        Word of the day by email
      </Label>
      <p className="text-sm text-secondary">Emails are {checked ? "on" : "off"}.</p>
    </div>
  )
}

export { Example }
