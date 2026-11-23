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
        <Field.Label>Get a Shona word every day</Field.Label>
        <Input type="email" placeholder="you@example.com" required />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Subscribe</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
      </div>
      {submitted && <p className="text-sm text-secondary">Subscribed {submitted}</p>}
    </form>
  )
}

export { Example }
