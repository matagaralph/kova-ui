import { Select } from "kova-ui/components"

function Example() {
  return (
    <div className="w-64">
      <Select placeholder="Loading projects…">
        <Select.Trigger aria-label="Project" loading />
        <Select.Content />
      </Select>
    </div>
  )
}

export { Example }
