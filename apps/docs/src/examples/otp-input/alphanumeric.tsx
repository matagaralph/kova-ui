import { Minus } from "@kova-ui/icons"
import { Field, OTPInput } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Field.Label>Recovery code</Field.Label>
      <OTPInput maxLength={8} pattern="alphanumeric">
        <OTPInput.Group>
          {[0, 1, 2, 3].map((index) => (
            <OTPInput.Slot key={index} index={index} />
          ))}
        </OTPInput.Group>
        <OTPInput.Separator>
          <Minus aria-hidden="true" />
        </OTPInput.Separator>
        <OTPInput.Group>
          {[4, 5, 6, 7].map((index) => (
            <OTPInput.Slot key={index} index={index} />
          ))}
        </OTPInput.Group>
      </OTPInput>
    </Field>
  )
}

export { Example }
