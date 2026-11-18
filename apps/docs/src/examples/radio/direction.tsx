import { Field, Label, Radio } from "kova-ui/components"

const plans = [
  { value: "hobby", label: "Hobby — free" },
  { value: "pro", label: "Pro — $20 a month" },
  { value: "team", label: "Team — $50 a month" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Plan</Field.Label>
      <Radio.Group direction="col" defaultValue="pro">
        {plans.map((plan) => (
          <Label key={plan.value}>
            <Radio value={plan.value}>
              <Radio.Indicator />
            </Radio>
            {plan.label}
          </Label>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
