import { Button, createRadioGroupController, Field, Label, Radio } from "kova-ui/components"
import { useState } from "react"

type Plan = "starter" | "pro" | "team"

const plans: { value: Plan; label: string }[] = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
]

function Example() {
  const [planGroup] = useState(() => createRadioGroupController<Plan>())
  const [value, setValue] = useState<Plan | null>("pro")
  const [lastChange, setLastChange] = useState("")

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        color="secondary"
        variant="outline"
        size="sm"
        onClick={() => planGroup.setValue("team")}
      >
        Choose Team
      </Button>
      <Field>
        <Field.Label>Plan</Field.Label>
        <Radio.Group
          value={value}
          direction="col"
          onValueChange={(next, details) => {
            setValue(next)
            const label = plans.find((plan) => plan.value === next)?.label ?? "None"
            setLastChange(`${label} (${details.reason})`)
          }}
          controller={planGroup}
        >
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
      {lastChange && <p className="text-sm text-secondary">Changed to {lastChange}</p>}
    </div>
  )
}

export { Example }
