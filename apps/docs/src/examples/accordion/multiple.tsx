import { Accordion } from "kova-ui/components"

const items = [
  {
    value: "word-of-the-day",
    label: "Word of the day",
    content: "Choose whether we email you a word each morning, and in which dialect.",
  },
  {
    value: "pronunciation",
    label: "Pronunciation recordings",
    content: "Play recordings as soon as an entry opens, or only when you press play.",
  },
  {
    value: "contributor",
    label: "Contributor profile",
    content: "Show your name and dialect on the entries and recordings you add.",
  },
]

function Example() {
  return (
    <Accordion multiple defaultValue={["word-of-the-day"]} className="max-w-md">
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
