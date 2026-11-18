import { Button, Checkbox, Label } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted(data.get("terms") === "accepted" ? "Account created" : null)
      }}
    >
      <Label>
        <Checkbox name="terms" value="accepted" required>
          <Checkbox.Indicator />
        </Checkbox>
        I accept the terms of service
      </Label>
      <Button type="submit" size="sm">
        Create account
      </Button>
      {submitted && <p className="text-sm text-secondary">{submitted}</p>}
    </form>
  )
}

export { Example }
