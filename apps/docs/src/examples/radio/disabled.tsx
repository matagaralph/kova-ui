import { Label, Radio } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Radio.Group aria-label="Region" defaultValue="eu">
        <Label>
          <Radio value="eu">
            <Radio.Indicator />
          </Radio>
          Europe
        </Label>
        <Label>
          <Radio value="us" disabled>
            <Radio.Indicator />
          </Radio>
          United States (full)
        </Label>
      </Radio.Group>
      <Radio.Group aria-label="Billing cycle" defaultValue="monthly" disabled>
        <Label>
          <Radio value="monthly">
            <Radio.Indicator />
          </Radio>
          Monthly
        </Label>
        <Label>
          <Radio value="yearly">
            <Radio.Indicator />
          </Radio>
          Yearly
        </Label>
      </Radio.Group>
    </div>
  )
}

export { Example }
