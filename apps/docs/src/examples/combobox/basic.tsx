import { Combobox, Field } from "kova-ui/components"

const dialects = [
  { value: "zezuru", label: "Zezuru" },
  { value: "karanga", label: "Karanga" },
  { value: "korekore", label: "Korekore" },
  { value: "manyika", label: "Manyika" },
  { value: "ndau", label: "Ndau" },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Dialect</Field.Label>
      <Combobox items={dialects}>
        <Combobox.Control>
          <Combobox.Input placeholder="Select a dialect" />
          <Combobox.Trigger aria-label="Show dialects" />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.Empty>No dialects found.</Combobox.Empty>
          <Combobox.List>
            {dialects.map((dialect) => (
              <Combobox.Item key={dialect.value} value={dialect.value} label={dialect.label}>
                {dialect.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </Field>
  )
}

export { Example }
