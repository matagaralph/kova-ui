import { Checkbox, Label } from "kova-ui/components"

function Example() {
  return (
    <Label>
      <Checkbox name="remember" defaultChecked>
        <Checkbox.Indicator />
      </Checkbox>
      Remember this device
    </Label>
  )
}

export { Example }
