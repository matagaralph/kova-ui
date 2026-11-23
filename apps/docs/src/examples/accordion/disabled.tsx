import { Accordion } from "kova-ui/components"

const items = [
  {
    value: "suggest",
    label: "Can I suggest a new word?",
    content:
      "Yes. Anyone with an account can add a draft, and a reviewer checks it before it's published.",
  },
  {
    value: "reviewer",
    label: "Reviewer tools",
    content: "Reviewers can approve, edit or send back entries in the review queue.",
    disabled: true,
  },
  {
    value: "dialect",
    label: "How do I change my dialect?",
    content: "Open Settings, then Profile, and pick Zezuru, Karanga, Korekore, Manyika or Ndau.",
  },
]

function Example() {
  return (
    <Accordion className="max-w-md">
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value} disabled={item.disabled}>
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
