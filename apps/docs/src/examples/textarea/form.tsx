import { Button, Field, Textarea } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [sent, setSent] = useState<string | null>(null)

  return (
    <form
      className="flex w-80 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSent(String(new FormData(event.currentTarget).get("reply")))
      }}
    >
      <Field name="reply">
        <Field.Label>Reply</Field.Label>
        <Textarea required autoResize submitShortcut="mod+enter" placeholder="Write a reply…" />
        <Field.Error match="valueMissing">Write a reply before sending.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Send
      </Button>
      {sent && <p className="text-sm text-secondary">Sent “{sent}”</p>}
    </form>
  )
}

export { Example }
