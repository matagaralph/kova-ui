import { Button, Label, Switch } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSubmitted(data.get("marketing") === "on" ? "Subscribed" : "Not subscribed")
      }}
    >
      <Label>
        <Switch name="marketing" value="on">
          <Switch.Thumb />
        </Switch>
        Product updates by email
      </Label>
      <Button type="submit" size="sm">
        Save
      </Button>
      {submitted && <p className="text-sm text-secondary">{submitted}</p>}
    </form>
  )
}

export { Example }
