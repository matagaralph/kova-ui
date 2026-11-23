import { Minus } from "@kova-ui/icons"
import { Field, OTPInput } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Field.Label>Verification code</Field.Label>
      <OTPInput maxLength={6}>
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
      <Field.Description>We sent a six-digit code to tendai@example.com.</Field.Description>
    </Field>
  )
}

export { Example }
