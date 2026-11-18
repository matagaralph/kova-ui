import { Select } from "kova-ui/components"

const statuses = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
]

function Example() {
  return (
    <div className="flex w-64 flex-col gap-3">
      {(["outline", "soft", "ghost"] as const).map((variant) => (
        <Select key={variant} defaultValue="open" items={statuses}>
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
