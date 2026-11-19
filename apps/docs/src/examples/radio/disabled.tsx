import { Field, Label, Radio } from "kova-ui/components"

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
]

const backups = [
  { value: "hourly", label: "Hourly", disabled: true },
  { value: "daily", label: "Daily", disabled: false },
  { value: "weekly", label: "Weekly", disabled: false },
]

function Example() {
  return (
    <div className="flex flex-col gap-6">
      <Field>
        <Field.Label>Theme</Field.Label>
        <Field.Description>Set by your organization.</Field.Description>
        <Radio.Group defaultValue="light" direction="col" disabled>
          {themes.map((theme) => (
            <Label key={theme.value}>
              <Radio value={theme.value}>
                <Radio.Indicator />
              </Radio>
              {theme.label}
            </Label>
          ))}
        </Radio.Group>
      </Field>
      <Field>
        <Field.Label>Backups</Field.Label>
        <Field.Description>Hourly backups need the Pro plan.</Field.Description>
        <Radio.Group defaultValue="daily" direction="col">
          {backups.map((backup) => (
            <Label key={backup.value}>
              <Radio value={backup.value} disabled={backup.disabled}>
                <Radio.Indicator />
              </Radio>
              {backup.label}
            </Label>
          ))}
        </Radio.Group>
      </Field>
    </div>
  )
}

export { Example }
