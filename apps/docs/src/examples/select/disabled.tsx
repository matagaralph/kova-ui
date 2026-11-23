import { Select } from "kova-ui/components"

const dialects = [
  { value: "zezuru", label: "Zezuru" },
  { value: "karanga", label: "Karanga" },
  { value: "ndau", label: "Ndau (no recordings yet)", disabled: true },
]

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Select defaultValue="karanga" items={dialects} disabled>
        <Select.Trigger aria-label="Dialect, disabled" />
        <Select.Content />
      </Select>
      <Select defaultValue="zezuru" items={dialects}>
        <Select.Trigger aria-label="Dialect" />
        <Select.Content>
          {dialects.map((dialect) => (
            <Select.Item key={dialect.value} value={dialect.value} disabled={dialect.disabled}>
              {dialect.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

export { Example }
