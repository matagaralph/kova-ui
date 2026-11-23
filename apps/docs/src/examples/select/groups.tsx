import { Field, Select } from "kova-ui/components"
import { Fragment } from "react"

const words = [
  {
    label: "Family",
    items: [
      { value: "amai", label: "amai (mother)" },
      { value: "baba", label: "baba (father)" },
    ],
  },
  {
    label: "Animals",
    items: [
      { value: "nzou", label: "nzou (elephant)" },
      { value: "shumba", label: "shumba (lion)" },
    ],
  },
  {
    label: "Music",
    items: [
      { value: "mbira", label: "mbira (thumb piano)" },
      { value: "ngoma", label: "ngoma (drum)" },
    ],
  },
]

function Example() {
  return (
    <Field className="w-64">
      <Field.Label>Word</Field.Label>
      <Select placeholder="Select a word">
        <Select.Trigger />
        <Select.Content>
          {words.map((group, index) => (
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
