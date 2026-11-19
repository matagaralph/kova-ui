import { Field, Label, Radio } from "kova-ui/components"

const plans = [
  { value: "hobby", label: "Hobby", description: "Free for personal projects." },
  { value: "pro", label: "Pro", description: "$20 per month for growing teams." },
  { value: "enterprise", label: "Enterprise", description: "Custom pricing and support." },
]

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Plan</Field.Label>
      <Radio.Group defaultValue="hobby" direction="col" className="w-full">
        {plans.map((plan) => (
          <Label
            key={plan.value}
            className="w-full justify-between rounded-lg border border-default p-3 hover:bg-surface-secondary has-data-checked:border-(--color-primary)"
          >
            <span className="flex flex-col">
              <span className="font-medium">{plan.label}</span>
              <span className="text-secondary">{plan.description}</span>
            </span>
            <Radio value={plan.value}>
              <Radio.Indicator />
            </Radio>
          </Label>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
