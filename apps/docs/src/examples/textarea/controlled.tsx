import { Field, Textarea } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [bio, setBio] = useState(
    "Karanga speaker from Masvingo. I record proverbs and folk stories.",
  )

  return (
    <Field name="bio" className="w-80">
      <Field.Label>Bio</Field.Label>
      <Textarea value={bio} onValueChange={setBio} maxLength={160} />
      <Field.Description>{bio.length} / 160 characters</Field.Description>
    </Field>
  )
}

export { Example }
