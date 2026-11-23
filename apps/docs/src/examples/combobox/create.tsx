import { Combobox, Field } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [topics, setTopics] = useState(["Proverbs", "Folk stories", "Music"])
  const [value, setValue] = useState<string[]>(["Proverbs"])

  return (
    <Field className="w-80">
      <Field.Label>Topics</Field.Label>
      <Combobox multiple value={value} onValueChange={setValue}>
        <Combobox.Chips>
          <Combobox.Value>
            {(state) =>
              (state.value as string[]).map((topic) => (
                <Combobox.Chip key={topic} value={topic}>
                  {topic}
                  <Combobox.ChipRemove aria-label={`Remove ${topic}`} />
                </Combobox.Chip>
              ))
            }
          </Combobox.Value>
          <Combobox.Input placeholder="Add or create a topic…" />
        </Combobox.Chips>
        <Combobox.Content>
          <Combobox.List>
            {topics.map((topic) => (
              <Combobox.Item key={topic} value={topic}>
                {topic}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
            <Combobox.Create
              minLength={2}
              onCreate={(query) => {
                setTopics((list) => [...list, query])
                setValue((list) => [...list, query])
              }}
            />
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </Field>
  )
}

export { Example }
