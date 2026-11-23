import { Accordion, Button, createAccordionController } from "kova-ui/components"
import { useState } from "react"

const weeks = [
  {
    value: "week-1",
    label: "Week 1: Greetings",
    content: "Mhoro, Mangwanani and Makadii?, and when to use each.",
  },
  {
    value: "week-2",
    label: "Week 2: Family",
    content: "Baba, amai, sekuru and ambuya, and how to greet your elders.",
  },
  {
    value: "week-3",
    label: "Week 3: Home and village",
    content: "Imba, musha and mvura. This week's project is describing your home.",
  },
]

function Example() {
  const [syllabus] = useState(() => createAccordionController())
  const [value, setValue] = useState<string[]>(["week-1"])

  return (
    <div className="max-w-md flex w-full flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => syllabus.openAll()}>
          Expand all
        </Button>
        <Button variant="outline" size="sm" onClick={() => syllabus.closeAll()}>
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
