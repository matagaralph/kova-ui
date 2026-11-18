import { Field, Select } from "kova-ui/components"
import { Fragment } from "react"

const fonts = [
  {
    label: "Sans serif",
    items: [
      { value: "inter", label: "Inter" },
      { value: "geist", label: "Geist" },
    ],
  },
  {
    label: "Serif",
    items: [
      { value: "source-serif", label: "Source Serif" },
      { value: "lora", label: "Lora" },
    ],
  },
  {
    label: "Monospace",
    items: [
      { value: "geist-mono", label: "Geist Mono" },
      { value: "jetbrains-mono", label: "JetBrains Mono" },
    ],
  },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Font</Field.Label>
      <Select placeholder="Select a font">
        <Select.Trigger />
        <Select.Content>
          {fonts.map((group, index) => (
            <Fragment key={group.label}>
              {index > 0 && <Select.Separator />}
              <Select.Group>
                <Select.GroupLabel>{group.label}</Select.GroupLabel>
                {group.items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Group>
            </Fragment>
          ))}
        </Select.Content>
      </Select>
    </Field>
  )
}

export { Example }
