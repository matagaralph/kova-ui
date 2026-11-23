import { Button, Field, Label, Radio } from "kova-ui/components"
import { useId, useState } from "react"

const levels = [
  { value: "beginner", label: "Beginner", detail: "greetings and everyday words" },
  { value: "intermediate", label: "Intermediate", detail: "proverbs and stories" },
  { value: "advanced", label: "Advanced", detail: "dialects and idioms" },
]

function Example() {
  const id = useId()
  const [submitted, setSubmitted] = useState("")

  return (
    <div className="flex flex-col items-start gap-4">
      <Field>
        <Field.Label>Lesson level</Field.Label>
        <Radio.Group
          name="level"
          form={`${id}-lessons`}
          required
          defaultValue="beginner"
          direction="col"
        >
          {levels.map((level) => (
            <Label key={level.value}>
              <Radio value={level.value}>
                <Radio.Indicator />
              </Radio>
              {level.label}
              <span className="text-secondary">({level.detail})</span>
            </Label>
          ))}
        </Radio.Group>
      </Field>
      <form
        id={`${id}-lessons`}
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(String(new FormData(event.currentTarget).get("level")))
        }}
      >
        <Button type="submit" size="sm">
          Continue
        </Button>
        <Button type="reset" variant="outline" size="sm">
          Reset
        </Button>
      </form>
      {submitted && <p className="text-sm text-secondary">Submitted level={submitted}</p>}
    </div>
  )
}

export { Example }
