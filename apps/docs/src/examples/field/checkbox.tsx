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
        <Switch name="word-of-the-day" defaultChecked>
          <Switch.Thumb />
        </Switch>
        <Field.Label>Word of the day</Field.Label>
        <Field.Description>A new Shona word, every morning.</Field.Description>
      </Field>
    </div>
  )
}

export { Example }
