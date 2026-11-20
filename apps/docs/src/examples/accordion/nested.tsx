import { Accordion } from "kova-ui/components"

const sections = [
  {
    value: "profile",
    label: "Profile",
    content: "Your name, photo and the email address people see.",
  },
  {
    value: "notifications",
    label: "Notifications",
    topics: [
      { value: "email", label: "Email", content: "A weekly digest, and mentions as they happen." },
      { value: "push", label: "Push", content: "Direct messages and replies to your comments." },
    ],
  },
  {
    value: "billing",
    label: "Billing",
    topics: [
      {
        value: "payment",
        label: "Payment methods",
        content: "A Visa card ending in 4242, used for every renewal.",
      },
      {
        value: "invoices",
        label: "Invoices",
        content: "Download a PDF of any invoice from the last two years.",
      },
    ],
  },
]

function Example() {
  return (
    <Accordion defaultValue={["notifications"]} className="max-w-md">
      {sections.map((section) => (
        <Accordion.Item key={section.value} value={section.value}>
          <Accordion.Header>
            <Accordion.Trigger>{section.label}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            {section.topics ? (
              <Accordion multiple>
                {section.topics.map((topic) => (
                  <Accordion.Item key={topic.value} value={topic.value}>
                    <Accordion.Header render={<h4 />}>
                      <Accordion.Trigger>{topic.label}</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>{topic.content}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              section.content
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export { Example }
