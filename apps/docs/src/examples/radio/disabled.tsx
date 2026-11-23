import { Field, Label, Radio } from "kova-ui/components"

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
]

const qualities = [
  { value: "lossless", label: "Lossless", disabled: true },
  { value: "high", label: "High", disabled: false },
  { value: "standard", label: "Standard", disabled: false },
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
        <Field.Label>Audio quality</Field.Label>
        <Field.Description>Lossless recordings are coming soon.</Field.Description>
        <Radio.Group defaultValue="high" direction="col">
          {qualities.map((quality) => (
            <Label key={quality.value}>
              <Radio value={quality.value} disabled={quality.disabled}>
                <Radio.Indicator />
              </Radio>
              {quality.label}
            </Label>
          ))}
        </Radio.Group>
      </Field>
    </div>
  )
}

export { Example }
