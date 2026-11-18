import { Checkbox, Label } from "kova-ui/components"

function Example() {
  return (
    <Label>
      <Checkbox defaultChecked="indeterminate">
        <Checkbox.Indicator />
      </Checkbox>
      Some files selected
    </Label>
  )
}

export { Example }
