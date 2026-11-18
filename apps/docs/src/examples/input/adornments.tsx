import { Field, Input } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [username, setUsername] = useState("")

  return (
    <Field className="w-72">
      <Field.Label>Username</Field.Label>
      <Input.Group>
        <span className="text-tertiary">@</span>
        <Input value={username} maxLength={16} onValueChange={setUsername} />
        <span className="text-[.875em] text-tertiary tabular-nums">{username.length}/16</span>
      </Input.Group>
    </Field>
  )
}

export { Example }
