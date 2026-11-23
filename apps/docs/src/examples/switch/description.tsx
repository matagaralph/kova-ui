import { Field, Switch } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Switch defaultChecked>
        <Switch.Thumb />
      </Switch>
      <Field.Label>Weekly digest</Field.Label>
      <Field.Description>New words and proverbs from the week, every Monday.</Field.Description>
    </Field>
  )
}

export { Example }
