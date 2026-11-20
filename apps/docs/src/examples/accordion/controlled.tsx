import { Accordion, Button, createAccordionController } from "kova-ui/components"
import { useState } from "react"

const weeks = [
  {
    value: "week-1",
    label: "Week 1: Foundations",
    content: "Set up your editor, meet the command line and write your first script.",
  },
  {
    value: "week-2",
    label: "Week 2: Data and types",
    content: "Strings, numbers, lists and objects, and how to tell them apart.",
  },
  {
    value: "week-3",
    label: "Week 3: Control flow",
    content: "Conditions, loops and functions. This week's project is a small text adventure.",
  },
]

function Example() {
  const [syllabus] = useState(() => createAccordionController())
  const [value, setValue] = useState<string[]>(["week-1"])

  return (
    <div className="max-w-md flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <Button color="secondary" variant="outline" size="sm" onClick={() => syllabus.openAll()}>
          Expand all
        </Button>
        <Button color="secondary" variant="outline" size="sm" onClick={() => syllabus.closeAll()}>
          Collapse all
        </Button>
      </div>
      <Accordion multiple value={value} onValueChange={setValue} controller={syllabus}>
        {weeks.map((week) => (
          <Accordion.Item key={week.value} value={week.value}>
            <Accordion.Header>
              <Accordion.Trigger>{week.label}</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>{week.content}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export { Example }
