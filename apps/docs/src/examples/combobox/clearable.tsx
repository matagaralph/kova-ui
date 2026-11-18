import { Combobox, Field } from "kova-ui/components"

const people = ["Tendai Moyo", "Inès Moreau", "Kofi Mensah", "Wren Takahashi"]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Assignee</Field.Label>
      <Combobox defaultValue="Kofi Mensah" items={people}>
        <Combobox.Control>
          <Combobox.Input placeholder="Unassigned" />
          <Combobox.Clear aria-label="Clear assignee" />
          <Combobox.Trigger aria-label="Show people" />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.List>
            {people.map((person) => (
              <Combobox.Item key={person} value={person}>
                {person}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </Field>
  )
}

export { Example }
