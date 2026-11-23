import { Select } from "kova-ui/components"

function Example() {
  return (
    <div className="w-64">
      <Select placeholder="Loading collections…">
        <Select.Trigger aria-label="Collection" loading />
        <Select.Content />
      </Select>
    </div>
  )
}

export { Example }
