import { Field, Select } from "kova-ui/components"

const plans = [
  { value: "free", label: "Free", description: "For trying things out." },
  { value: "pro", label: "Pro", description: "For individuals shipping real work." },
  { value: "team", label: "Team", description: "Shared billing and roles for groups." },
]

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Plan</Field.Label>
      <Select defaultValue="pro" items={plans}>
        <Select.Trigger />
        <Select.Content>
          {plans.map((plan) => (
            <Select.Item key={plan.value} value={plan.value} label={plan.label}>
              {plan.label}
              <Select.ItemDescription>{plan.description}</Select.ItemDescription>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
