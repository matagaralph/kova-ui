import { Field, Label, Radio } from "kova-ui/components"

function Example() {
  return (
    <Field>
      <Field.Label>Visibility</Field.Label>
      <Field.Description>Who can open this project.</Field.Description>
      <Radio.Group direction="col" defaultValue="private">
        <Label>
          <Radio value="private">
            <Radio.Indicator />
          </Radio>
          Only you
        </Label>
        <Label>
          <Radio value="team">
            <Radio.Indicator />
          </Radio>
          Your team
        </Label>
        <Label>
          <Radio value="public">
            <Radio.Indicator />
          </Radio>
          Anyone with the link
        </Label>
      </Radio.Group>
    </Field>
  )
}

export { Example }
