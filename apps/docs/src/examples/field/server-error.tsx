import { Button, Field, Input } from "kova-ui/components"
import { useState } from "react"

const taken = ["hollis", "admin"]

function Example() {
  const [serverError, setServerError] = useState<string | null>(null)

  return (
    <form
      className="flex w-72 flex-col items-start gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        const username = String(new FormData(event.currentTarget).get("username"))
        setServerError(taken.includes(username) ? `${username} is already taken.` : null)
      }}
    >
      <Field name="username" invalid={serverError ? true : undefined} className="w-full">
        <Field.Label>Username</Field.Label>
        <Input required defaultValue="hollis" onValueChange={() => setServerError(null)} />
        <Field.Error match="valueMissing">Choose a username.</Field.Error>
        {serverError && <Field.Error match>{serverError}</Field.Error>}
      </Field>
      <Button type="submit" color="primary">
        Create account
      </Button>
    </form>
  )
}

export { Example }
