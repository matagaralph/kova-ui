import { Minus } from "@kova-ui/icons"
import { Field, OTPInput } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [invalid, setInvalid] = useState(true)

  return (
    <Field invalid={invalid}>
      <Field.Label>Verification code</Field.Label>
      <OTPInput maxLength={6} defaultValue="482913" onValueChange={() => setInvalid(false)}>
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
      <Field.Error>That code has expired. Request a new one.</Field.Error>
    </Field>
  )
}

export { Example }
