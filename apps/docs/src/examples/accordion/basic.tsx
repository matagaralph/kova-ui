import { Accordion } from "kova-ui/components"

const items = [
  {
    value: "add",
    label: "How do I add a word?",
    content: [
      "Write the headword, its meaning and its part of speech, and add an example sentence if you have one.",
      "Your entry is saved as a draft until you send it for review.",
    ],
  },
  {
    value: "review",
    label: "Who reviews new entries?",
    content: [
      "Reviewers who speak the word's dialect check each entry before it's published. Most entries are reviewed within a week.",
    ],
  },
  {
    value: "record",
    label: "Can I record pronunciations?",
    content: ["Yes. Open any entry and press Record. Recordings in every dialect are welcome."],
  },
]

function Example() {
  return (
    <Accordion defaultValue={["add"]} className="max-w-md">
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Header>
            <Accordion.Trigger>{item.label}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export { Example }
