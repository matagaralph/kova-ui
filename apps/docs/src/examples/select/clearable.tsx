import { Field, Select } from "kova-ui/components"

const people = [
  { value: "tendai", label: "Tendai Moyo" },
  { value: "rudo", label: "Rudo Ncube" },
  { value: "farai", label: "Farai Mutasa" },
  { value: "chipo", label: "Chipo Gumbo" },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Reviewer</Field.Label>
      <Select defaultValue="rudo" placeholder="Unassigned" items={people}>
        <div className="flex w-full">
          <Select.Trigger />
          <Select.Clear aria-label="Clear reviewer" />
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
