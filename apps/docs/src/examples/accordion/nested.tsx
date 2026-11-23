import { Accordion } from "kova-ui/components"

const sections = [
  {
    value: "profile",
    label: "Profile",
    content: "Your name, photo and the dialect you speak.",
  },
  {
    value: "notifications",
    label: "Notifications",
    topics: [
      {
        value: "email",
        label: "Email",
        content: "A weekly digest of new words, and replies to your entries.",
      },
      {
        value: "push",
        label: "Push",
        content: "Reviews of your entries and comments on your recordings.",
      },
    ],
  },
  {
    value: "contributions",
    label: "Contributions",
    topics: [
      {
        value: "words",
        label: "Words",
        content: "42 entries you added, 38 of them published.",
      },
      {
        value: "recordings",
        label: "Recordings",
        content: "17 pronunciation recordings, 3 of them waiting for a reviewer.",
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
