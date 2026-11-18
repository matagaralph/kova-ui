import { Button, Field, Select } from "kova-ui/components"
import { useState } from "react"

const methods = [
  { value: "standard", label: "Standard" },
  { value: "express", label: "Express" },
  { value: "overnight", label: "Overnight" },
]

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex w-64 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("shipping")))
      }}
    >
      <Field name="shipping">
        <Field.Label>Shipping method</Field.Label>
        <Select required placeholder="Select a method" items={methods}>
          <Select.Trigger />
          <Select.Content>
            {methods.map((method) => (
              <Select.Item key={method.value} value={method.value}>
                {method.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Field.Description>Express arrives in two business days.</Field.Description>
        <Field.Error match="valueMissing">Choose a shipping method.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Continue
      </Button>
      {submitted && <p className="text-sm text-secondary">Submitted shipping={submitted}</p>}
    </form>
  )
}

export { Example }
