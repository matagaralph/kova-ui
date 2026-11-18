import { Select } from "kova-ui/components"

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
]

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Select key={size} defaultValue="pro" items={plans}>
          <Select.Trigger
            size={size}
            pill={size === "3xl"}
            block={false}
            aria-label={`Plan, ${size}`}
          />
          <Select.Content>
            {plans.map((plan) => (
              <Select.Item key={plan.value} value={plan.value}>
                {plan.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      ))}
    </div>
  )
}

export { Example }
