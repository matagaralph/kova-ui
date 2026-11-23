import { Button, Field, Input } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [subscribed, setSubscribed] = useState<string | null>(null)

  return (
    <form
      className="flex w-72 flex-col items-start gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubscribed(String(new FormData(event.currentTarget).get("email")))
      }}
    >
      <Field name="email" className="w-full">
        <Field.Label>Email</Field.Label>
        <Input type="email" required placeholder="tendai@example.com" />
        <Field.Error match="valueMissing">Enter your email address.</Field.Error>
        <Field.Error match="typeMismatch">
          Enter an email address like tendai@example.com.
        </Field.Error>
      </Field>
      <Field name="website" className="w-full">
        <Field.Label>Website</Field.Label>
        <Input type="url" placeholder="https://example.com" />
        <Field.Error />
      </Field>
      <Button type="submit">Subscribe</Button>
      {subscribed && <p className="text-sm text-secondary">Subscribed {subscribed}</p>}
    </form>
  )
}

export { Example }
