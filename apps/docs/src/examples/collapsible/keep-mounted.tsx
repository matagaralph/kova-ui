import { Collapsible, Field, Textarea } from "kova-ui/components"

function Example() {
  return (
    <Collapsible className="w-80">
      <Collapsible.Trigger>Add a usage note</Collapsible.Trigger>
      <Collapsible.Panel keepMounted>
        <Field name="usage">
          <Field.Label>Usage note</Field.Label>
          <Textarea placeholder="Where and when people say it…" />
          <Field.Description>Optional, for the reviewer.</Field.Description>
        </Field>
      </Collapsible.Panel>
    </Collapsible>
  )
}

export { Example }
