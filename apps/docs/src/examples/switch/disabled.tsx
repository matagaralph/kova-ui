import { Label, Switch } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Switch disabled>
          <Switch.Thumb />
        </Switch>
        Off and disabled
      </Label>
      <Label>
        <Switch defaultChecked disabled>
          <Switch.Thumb />
        </Switch>
        On and disabled
      </Label>
    </div>
  )
}

export { Example }
