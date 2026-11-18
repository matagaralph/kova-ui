import { Button, Field, Input } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex w-72 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("email")))
      }}
    >
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Input type="email" defaultValue="ada@example.com" />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Subscribe</Button>
        <Button type="reset" color="secondary" variant="outline">
          Reset
        </Button>
      </div>
      {submitted && <p className="text-sm text-secondary">Subscribed {submitted}</p>}
    </form>
  )
}

export { Example }
