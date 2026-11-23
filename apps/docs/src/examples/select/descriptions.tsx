import { Field, Select } from "kova-ui/components"

const parts = [
  { value: "noun", label: "Noun", description: "Names a person, place or thing." },
  { value: "verb", label: "Verb", description: "Names an action or a state." },
  { value: "adjective", label: "Adjective", description: "Describes a noun." },
]

function Example() {
  return (
    <Field className="w-72">
      <Field.Label>Part of speech</Field.Label>
      <Select defaultValue="noun" items={parts}>
        <Select.Trigger />
        <Select.Content>
          {parts.map((part) => (
            <Select.Item key={part.value} value={part.value} label={part.label}>
              {part.label}
              <Select.ItemDescription>{part.description}</Select.ItemDescription>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
