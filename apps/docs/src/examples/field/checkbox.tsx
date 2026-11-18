import { Checkbox, Field, Switch } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-80 flex-col gap-4">
      <Field>
        <Checkbox name="terms" required>
          <Checkbox.Indicator />
        </Checkbox>
        <Field.Label>Accept the terms of service</Field.Label>
        <Field.Description>You can read them at any time in Settings.</Field.Description>
      </Field>
      <Field>
        <Switch name="digest" defaultChecked>
          <Switch.Thumb />
        </Switch>
        <Field.Label>Weekly digest</Field.Label>
        <Field.Description>A summary of your week, every Monday.</Field.Description>
      </Field>
    </div>
  )
}

export { Example }
