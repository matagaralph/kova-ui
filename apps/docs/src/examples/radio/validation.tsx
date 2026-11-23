import { Button, Field, Label, Radio } from "kova-ui/components"
import { useState } from "react"

const channels = [
  { value: "email", label: "Email only" },
  { value: "sms", label: "SMS only" },
  { value: "both", label: "Email and SMS" },
]

function Example() {
  const [saved, setSaved] = useState("")

  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSaved(String(new FormData(event.currentTarget).get("updates")))
      }}
    >
      <Field>
        <Field.Label>Review updates</Field.Label>
        <Field.Description>Choose how we tell you about reviews of your entries.</Field.Description>
        <Radio.Group name="updates" required direction="col">
          {channels.map((channel) => (
            <Label key={channel.value}>
              <Radio value={channel.value}>
                <Radio.Indicator />
              </Radio>
              {channel.label}
            </Label>
          ))}
        </Radio.Group>
        <Field.Error match="valueMissing">Choose how to get review updates.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Save
      </Button>
      {saved && <p className="text-sm text-secondary">Saved updates={saved}</p>}
    </form>
  )
}

export { Example }
