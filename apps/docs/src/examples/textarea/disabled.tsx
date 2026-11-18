import { Field, Textarea } from "kova-ui/components"

function Example() {
  return (
    <Field disabled className="w-80">
      <Field.Label>Reply</Field.Label>
      <Textarea defaultValue="Replies are closed for this thread." rows={2} />
    </Field>
  )
}

export { Example }
