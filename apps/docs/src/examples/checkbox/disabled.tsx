import { Checkbox, Label } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox disabled>
          <Checkbox.Indicator />
        </Checkbox>
        Unchecked and disabled
      </Label>
      <Label>
        <Checkbox defaultChecked disabled>
          <Checkbox.Indicator />
        </Checkbox>
        Checked and disabled
      </Label>
    </div>
  )
}

export { Example }
