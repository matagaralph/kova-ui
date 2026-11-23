import { Field, Label, Radio } from "kova-ui/components"

const dialects = [
  { value: "zezuru", label: "Zezuru" },
  { value: "karanga", label: "Karanga" },
  { value: "manyika", label: "Manyika" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Dialect</Field.Label>
      <Radio.Group defaultValue="zezuru" direction="col">
        {dialects.map((dialect) => (
          <Label key={dialect.value}>
            <Radio value={dialect.value}>
              <Radio.Indicator />
            </Radio>
            {dialect.label}
          </Label>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
