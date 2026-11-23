import { Combobox, Field } from "kova-ui/components"

const tags = ["Animals", "Family", "Food", "Music", "Nature", "Places"]

function Example() {
  return (
    <Field className="w-80">
      <Field.Label>Tags</Field.Label>
      <Combobox multiple defaultValue={["Animals", "Nature"]} items={tags} maxSelected={4}>
        <Combobox.Chips>
          <Combobox.Value>
            {(state) =>
              (state.value as string[]).map((tag) => (
                <Combobox.Chip key={tag} value={tag}>
                  {tag}
                  <Combobox.ChipRemove aria-label={`Remove ${tag}`} />
                </Combobox.Chip>
              ))
            }
          </Combobox.Value>
          <Combobox.Input placeholder="Add tags…" />
        </Combobox.Chips>
        <Combobox.Content>
          <Combobox.Empty>No tags found.</Combobox.Empty>
          <Combobox.List>
            {tags.map((tag) => (
              <Combobox.Item key={tag} value={tag}>
                {tag}
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
