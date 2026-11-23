import { Field, Select } from "kova-ui/components"

const roles = [
  { value: "learner", label: "Learner" },
  { value: "contributor", label: "Contributor" },
  { value: "reviewer", label: "Reviewer" },
  { value: "editor", label: "Editor" },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Role</Field.Label>
      <Select placeholder="Select a role" items={roles}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {roles.map((role) => (
            <Select.Item key={role.value} value={role.value}>
              {role.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
