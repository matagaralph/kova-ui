import { Button, Field, Select } from "kova-ui/components"
import { useState } from "react"

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex w-64 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("level")))
      }}
    >
      <Field name="level">
        <Field.Label>Lesson level</Field.Label>
        <Select required placeholder="Select a level" items={levels}>
          <Select.Trigger />
          <Select.Content>
            {levels.map((level) => (
              <Select.Item key={level.value} value={level.value}>
                {level.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
        <Field.Description>Beginner starts with greetings like Mhoro.</Field.Description>
        <Field.Error match="valueMissing">Choose a lesson level.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Continue
      </Button>
      {submitted && <p className="text-sm text-secondary">Submitted level={submitted}</p>}
    </form>
  )
}

export { Example }
