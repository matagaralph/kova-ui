import { Select } from "kova-ui/components"

const sizes = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large (sold out)", disabled: true },
]

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Select defaultValue="medium" items={sizes} disabled>
        <Select.Trigger aria-label="Size, disabled" />
        <Select.Content />
      </Select>
      <Select defaultValue="small" items={sizes}>
        <Select.Trigger aria-label="Size" />
        <Select.Content>
          {sizes.map((size) => (
            <Select.Item key={size.value} value={size.value} disabled={size.disabled}>
              {size.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

export { Example }
