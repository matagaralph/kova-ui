import { Field, Select } from "kova-ui/components"

const people = [
  { value: "tendai", label: "Tendai Moyo" },
  { value: "ines", label: "Inès Moreau" },
  { value: "kofi", label: "Kofi Mensah" },
  { value: "wren", label: "Wren Takahashi" },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Assignee</Field.Label>
      <Select defaultValue="ines" placeholder="Unassigned" items={people}>
        <div className="flex">
          <Select.Trigger />
          <Select.Clear aria-label="Clear assignee" />
        </div>
        <Select.Content>
          {people.map((person) => (
            <Select.Item key={person.value} value={person.value}>
              {person.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
