import { Accordion } from "kova-ui/components"

const items = [
  {
    value: "access",
    label: "Can I access my account history?",
    content: "Yes. Every order and payment from the last five years is in your account.",
  },
  {
    value: "premium",
    label: "Premium feature information",
    content: "Premium includes priority support and early access to new features.",
    disabled: true,
  },
  {
    value: "email",
    label: "How do I update my email address?",
    content: "Open Settings, then Account, and change it there. We'll send a confirmation link.",
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
