import { Field, OTPInput } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Field>
        <Field.Label>Disabled code</Field.Label>
        <OTPInput maxLength={6} disabled defaultValue="123456">
          <OTPInput.Group>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <OTPInput.Slot key={index} index={index} />
            ))}
          </OTPInput.Group>
        </OTPInput>
      </Field>
      <Field>
        <Field.Label>Read-only code</Field.Label>
        <OTPInput maxLength={6} readOnly defaultValue="654321">
          <OTPInput.Group>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <OTPInput.Slot key={index} index={index} />
            ))}
          </OTPInput.Group>
        </OTPInput>
      </Field>
    </div>
  )
}

export { Example }
