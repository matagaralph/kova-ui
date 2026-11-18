import { Checkbox, Field } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Checkbox defaultChecked>
        <Checkbox.Indicator />
      </Checkbox>
      <Field.Label>Email me about new features</Field.Label>
      <Field.Description>At most one email a month. Unsubscribe any time.</Field.Description>
    </Field>
  )
}

export { Example }
