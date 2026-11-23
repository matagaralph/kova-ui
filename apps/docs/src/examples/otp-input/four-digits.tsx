import { Field, OTPInput } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Field.Label>PIN</Field.Label>
      <OTPInput maxLength={4} textAlign="center">
        <OTPInput.Group>
          {[0, 1, 2, 3].map((index) => (
            <OTPInput.Slot key={index} index={index} />
          ))}
        </OTPInput.Group>
      </OTPInput>
    </Field>
  )
}

export { Example }
