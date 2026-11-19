import { Field, Label, Radio } from "kova-ui/components"

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Your plan</Field.Label>
      <Field.Description>Ask an admin to change plans.</Field.Description>
      <Radio.Group defaultValue="pro" direction="col" readOnly>
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
