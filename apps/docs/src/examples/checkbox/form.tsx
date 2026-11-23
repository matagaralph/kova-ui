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
        setSubmitted(data.get("license") === "accepted" ? "Recording submitted" : null)
      }}
    >
      <Label>
        <Checkbox name="license" value="accepted" required>
          <Checkbox.Indicator />
        </Checkbox>
        I agree to share my recording under an open license
      </Label>
      <Button type="submit" size="sm">
        Submit recording
      </Button>
      {submitted && <p className="text-sm text-secondary">{submitted}</p>}
    </form>
  )
}

export { Example }
