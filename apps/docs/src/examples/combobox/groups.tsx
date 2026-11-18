import { Combobox, Field } from "kova-ui/components"

const zones = [
  {
    label: "Africa",
    items: [
      { value: "Africa/Harare", label: "Harare", offset: "UTC+2" },
      { value: "Africa/Lagos", label: "Lagos", offset: "UTC+1" },
      { value: "Africa/Nairobi", label: "Nairobi", offset: "UTC+3" },
    ],
  },
  {
    label: "Europe",
    items: [
      { value: "Europe/Lisbon", label: "Lisbon", offset: "UTC+0" },
      { value: "Europe/Berlin", label: "Berlin", offset: "UTC+1" },
    ],
  },
]

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Time zone</Field.Label>
      <Combobox>
        <Combobox.Control>
          <Combobox.Input placeholder="Search cities…" />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.Empty>No cities found.</Combobox.Empty>
          <Combobox.List>
            {zones.map((group) => (
              <Combobox.Group key={group.label}>
                <Combobox.GroupLabel>{group.label}</Combobox.GroupLabel>
                {group.items.map((zone) => (
                  <Combobox.Item key={zone.value} value={zone.value} label={zone.label}>
                    {zone.label}
                    <Combobox.ItemDescription>{zone.offset}</Combobox.ItemDescription>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Group>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </Field>
  )
}

export { Example }
