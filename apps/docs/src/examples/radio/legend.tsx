import { Field, Label, Radio } from "kova-ui/components"
import { useId } from "react"

const periods = [
  { value: "monthly", label: "Monthly", price: "$12 per month" },
  { value: "yearly", label: "Yearly", price: "$120 per year" },
]

function Example() {
  const id = useId()
  return (
    <Field.Set>
      <Field.Legend id={`${id}-legend`}>Billing period</Field.Legend>
      <Field.Description id={`${id}-description`}>
        Yearly billing gets you two months free.
      </Field.Description>
      <Radio.Group
        defaultValue="monthly"
        direction="col"
        aria-labelledby={`${id}-legend`}
        aria-describedby={`${id}-description`}
      >
        {periods.map((period) => (
          <Label key={period.value}>
            <Radio value={period.value}>
              <Radio.Indicator />
            </Radio>
            {period.label}
            <span className="text-secondary">({period.price})</span>
          </Label>
        ))}
      </Radio.Group>
    </Field.Set>
  )
}

export { Example }
