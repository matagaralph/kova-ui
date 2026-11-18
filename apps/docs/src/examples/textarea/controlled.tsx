import { Field, Textarea } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [bio, setBio] = useState("Product designer in Harare. I write about type and interfaces.")

  return (
    <Field name="bio" className="w-80">
      <Field.Label>Bio</Field.Label>
      <Textarea value={bio} onValueChange={setBio} maxLength={160} />
      <Field.Description>{bio.length} / 160 characters</Field.Description>
    </Field>
  )
}

export { Example }
