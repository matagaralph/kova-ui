import { Minus } from "@kova-ui/icons"
import { Button, Field, OTPInput } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("code")))
      }}
    >
      <Field>
        <Field.Label>Verification code</Field.Label>
        <OTPInput name="code" maxLength={6} required>
          <OTPInput.Group>
            <OTPInput.Slot index={0} />
            <OTPInput.Slot index={1} />
            <OTPInput.Slot index={2} />
          </OTPInput.Group>
          <OTPInput.Separator>
            <Minus aria-hidden="true" />
          </OTPInput.Separator>
          <OTPInput.Group>
            <OTPInput.Slot index={3} />
            <OTPInput.Slot index={4} />
            <OTPInput.Slot index={5} />
          </OTPInput.Group>
        </OTPInput>
        <Field.Error />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Verify</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
      </div>
      {submitted && <p className="text-sm text-secondary">Verified {submitted}</p>}
    </form>
  )
}

export { Example }
