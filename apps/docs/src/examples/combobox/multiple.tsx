import { Combobox, Field } from "kova-ui/components"

const labels = ["Bug", "Feature", "Documentation", "Design", "Performance", "Security"]

function Example() {
  return (
    <Field className="w-80">
      <Field.Label>Labels</Field.Label>
      <Combobox multiple defaultValue={["Bug", "Design"]} items={labels} maxSelected={4}>
        <Combobox.Chips>
          <Combobox.Value>
            {(state) =>
              (state.value as string[]).map((label) => (
                <Combobox.Chip key={label} value={label}>
                  {label}
                  <Combobox.ChipRemove aria-label={`Remove ${label}`} />
                </Combobox.Chip>
              ))
            }
          </Combobox.Value>
          <Combobox.Input placeholder="Add labels…" />
        </Combobox.Chips>
        <Combobox.Content>
          <Combobox.Empty>No labels found.</Combobox.Empty>
          <Combobox.List>
            {labels.map((label) => (
              <Combobox.Item key={label} value={label}>
                {label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </Field>
  )
}

export { Example }
