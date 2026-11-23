import { Select } from "kova-ui/components"

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

const dialects = [
  { value: "zezuru", label: "Zezuru" },
  { value: "karanga", label: "Karanga" },
  { value: "manyika", label: "Manyika" },
]

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Select key={size} defaultValue="zezuru" items={dialects}>
          <Select.Trigger
            size={size}
            pill={size === "3xl"}
            block={false}
            aria-label={`Dialect, ${size}`}
          />
          <Select.Content>
            {dialects.map((dialect) => (
              <Select.Item key={dialect.value} value={dialect.value}>
                {dialect.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      ))}
    </div>
  )
}

export { Example }
