import { Checkbox, Field, Label } from "kova-ui/components"

const dialects = [
  { value: "zezuru", label: "Zezuru" },
  { value: "karanga", label: "Karanga" },
  { value: "korekore", label: "Korekore" },
  { value: "manyika", label: "Manyika" },
  { value: "ndau", label: "Ndau" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Dialects</Field.Label>
      <Checkbox.Group defaultValue={["zezuru", "karanga"]} allValues={dialects.map((d) => d.value)}>
        <Label>
          <Checkbox parent>
            <Checkbox.Indicator />
          </Checkbox>
          All dialects
        </Label>
        {dialects.map((dialect) => (
          <Label key={dialect.value}>
            <Checkbox value={dialect.value}>
              <Checkbox.Indicator />
            </Checkbox>
            {dialect.label}
          </Label>
        ))}
      </Checkbox.Group>
    </Field>
  )
}

export { Example }
