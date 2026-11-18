import { Globe, Lock, Users } from "@kova-ui/icons"
import { Field, Select } from "kova-ui/components"

const visibilities = [
  { value: "private", label: "Private", Icon: Lock },
  { value: "team", label: "Team", Icon: Users },
  { value: "public", label: "Public", Icon: Globe },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Visibility</Field.Label>
      <Select defaultValue="team">
        <Select.Trigger dropdownIconType="chevronDown">
          <Select.ValueIcon />
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {visibilities.map(({ value, label, Icon }) => (
            <Select.Item key={value} value={value}>
              <Select.ItemIcon>
                <Icon />
              </Select.ItemIcon>
              {label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
