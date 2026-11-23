import { Checkbox, Label } from "kova-ui/components"

function Example() {
  return (
    <Label>
      <Checkbox defaultChecked="indeterminate">
        <Checkbox.Indicator />
      </Checkbox>
      Some recordings selected
    </Label>
  )
}

export { Example }
