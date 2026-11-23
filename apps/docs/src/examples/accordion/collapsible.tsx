import { Accordion } from "kova-ui/components"

const items = [
  {
    value: "meaning",
    label: "Meaning",
    content: "A thumb piano: metal keys on a wooden board, played with the thumbs.",
  },
  {
    value: "part-of-speech",
    label: "Part of speech",
    content: "Noun.",
  },
  {
    value: "recordings",
    label: "Recordings",
    content: "Pronunciations recorded in Zezuru, Karanga and Manyika.",
  },
]

function Example() {
  return (
    <Accordion collapsible={false} defaultValue={["meaning"]} className="max-w-md">
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Header>
            <Accordion.Trigger>{item.label}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export { Example }
