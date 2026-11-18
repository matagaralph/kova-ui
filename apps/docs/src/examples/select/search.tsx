import { Field, Select } from "kova-ui/components"

const regions = [
  {
    label: "Americas",
    items: [
      { value: "br", label: "Brazil" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
      { value: "us", label: "United States" },
    ],
  },
  {
    label: "Europe",
    items: [
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
      { value: "es", label: "Spain" },
      { value: "se", label: "Sweden" },
    ],
  },
  {
    label: "Africa",
    items: [
      { value: "gh", label: "Ghana" },
      { value: "ke", label: "Kenya" },
      { value: "za", label: "South Africa" },
      { value: "zw", label: "Zimbabwe" },
    ],
  },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Country</Field.Label>
      <Select placeholder="Select a country">
        <Select.Trigger />
        <Select.Content>
          <Select.Input aria-label="Search countries" placeholder="Search countries…" />
          <Select.Empty>No countries found.</Select.Empty>
          <Select.List>
            {regions.map((group) => (
              <Select.Group key={group.label}>
                <Select.GroupLabel>{group.label}</Select.GroupLabel>
                {group.items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </Select.List>
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
