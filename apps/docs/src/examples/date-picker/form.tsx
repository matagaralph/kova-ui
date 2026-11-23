import { Button, DatePicker, Field } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("due")))
      }}
    >
      <Field name="due">
        <Field.Label>Due date</Field.Label>
        <DatePicker required>
          <DatePicker.Input />
          <DatePicker.Trigger uniform variant="ghost" />
          <DatePicker.Content />
        </DatePicker>
        <Field.Description>When the review is due.</Field.Description>
        <Field.Error match="valueMissing">Choose a due date.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Save
      </Button>
      {submitted && <p className="text-sm text-secondary">Submitted {submitted}</p>}
    </form>
  )
}

export { Example }
