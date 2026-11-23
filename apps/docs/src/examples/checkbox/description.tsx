import { Checkbox, Field } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Checkbox defaultChecked>
        <Checkbox.Indicator />
      </Checkbox>
      <Field.Label>Email me the word of the day</Field.Label>
      <Field.Description>One Shona word each morning. Unsubscribe any time.</Field.Description>
    </Field>
  )
}

export { Example }
