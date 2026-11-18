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
        Email notifications
      </Label>
      <p className="text-sm text-secondary">Notifications are {checked ? "on" : "off"}.</p>
    </div>
  )
}

export { Example }
