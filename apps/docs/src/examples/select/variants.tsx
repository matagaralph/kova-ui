import { Select } from "kova-ui/components"

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "in-review", label: "In review" },
  { value: "published", label: "Published" },
]

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {(["outline", "soft", "ghost"] as const).map((variant) => (
        <Select key={variant} defaultValue="draft" items={statuses}>
          <Select.Trigger variant={variant} aria-label={`Status, ${variant}`} />
          <Select.Content>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
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
