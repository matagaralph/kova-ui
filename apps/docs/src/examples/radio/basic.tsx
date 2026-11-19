import { Field, Label, Radio } from "kova-ui/components"

const speeds = [
  { value: "standard", label: "Standard" },
  { value: "express", label: "Express" },
  { value: "overnight", label: "Overnight" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Shipping speed</Field.Label>
      <Radio.Group defaultValue="standard" direction="col">
        {speeds.map((speed) => (
          <Label key={speed.value}>
            <Radio value={speed.value}>
              <Radio.Indicator />
            </Radio>
            {speed.label}
          </Label>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
