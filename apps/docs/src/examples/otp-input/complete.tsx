import { Minus } from "@kova-ui/icons"
import { Field, OTPInput } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [status, setStatus] = useState("Enter the code to join the reviewers.")

  return (
    <Field>
      <Field.Label>Invite code</Field.Label>
      <OTPInput
        maxLength={6}
        onValueChange={() => setStatus("Enter the code to join the reviewers.")}
        onValueCommit={(code) => setStatus(`Checking ${code}…`)}
      >
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
      <Field.Description>{status}</Field.Description>
    </Field>
  )
}

export { Example }
