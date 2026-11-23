import { Field, Label, Radio } from "kova-ui/components"

const roles = [
  { value: "contributor", label: "Contributor" },
  { value: "reviewer", label: "Reviewer" },
  { value: "editor", label: "Editor" },
]

function Example() {
  return (
    <Field>
      <Field.Label>Your role</Field.Label>
      <Field.Description>Ask an editor to change roles.</Field.Description>
      <Radio.Group defaultValue="reviewer" direction="col" readOnly>
        {roles.map((role) => (
          <Label key={role.value}>
            <Radio value={role.value}>
              <Radio.Indicator />
            </Radio>
            {role.label}
          </Label>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
