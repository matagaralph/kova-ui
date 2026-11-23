import { Field, Select } from "kova-ui/components"

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
      <Field.Label>Dialects</Field.Label>
      <Select
        multiple
        defaultValue={["zezuru", "karanga"]}
        placeholder="Select dialects"
        items={dialects}
      >
        <Select.Trigger>
          <Select.Value maxLabels={1} getMoreLabel={(count) => `${count} more`} />
        </Select.Trigger>
        <Select.Content>
          <Select.SelectAll />
          <Select.Separator />
          {dialects.map((dialect) => (
            <Select.Item key={dialect.value} value={dialect.value}>
              {dialect.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
