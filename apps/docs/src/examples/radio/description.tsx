import { Field, Radio } from "kova-ui/components"

const frequencies = [
  { value: "instant", label: "Instantly", description: "An email when an entry needs review." },
  { value: "daily", label: "Daily digest", description: "One email each morning." },
  { value: "weekly", label: "Weekly digest", description: "A review summary every Monday." },
]

function Example() {
  return (
    <Field>
      <Field.Label>Review requests</Field.Label>
      <Radio.Group defaultValue="daily" direction="col">
        {frequencies.map((frequency) => (
          <Field key={frequency.value}>
            <Radio value={frequency.value}>
              <Radio.Indicator />
            </Radio>
            <Field.Label>{frequency.label}</Field.Label>
            <Field.Description>{frequency.description}</Field.Description>
          </Field>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
