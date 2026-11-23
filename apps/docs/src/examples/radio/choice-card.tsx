import { Field, Label, Radio } from "kova-ui/components"

const roles = [
  { value: "words", label: "Add words", description: "Suggest headwords and meanings." },
  { value: "audio", label: "Record audio", description: "Read entries aloud." },
  { value: "review", label: "Review", description: "Check other contributors' entries." },
]

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>How you’ll contribute</Field.Label>
      <Radio.Group defaultValue="words" direction="col" className="w-full">
        {roles.map((role) => (
          <Label
            key={role.value}
            className="w-full justify-between rounded-lg border border-default p-3 hover:bg-surface-secondary has-data-checked:border-(--color-primary)"
          >
            <span className="flex flex-col">
              <span className="font-medium">{role.label}</span>
              <span className="text-secondary">{role.description}</span>
            </span>
            <Radio value={role.value}>
              <Radio.Indicator />
            </Radio>
          </Label>
        ))}
      </Radio.Group>
    </Field>
  )
}

export { Example }
