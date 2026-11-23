import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="words">
      <Tabs.List aria-label="Lesson">
        <Tabs.Tab value="words">Words</Tabs.Tab>
        <Tabs.Tab value="greetings">Greetings</Tabs.Tab>
        <Tabs.Tab value="quiz" disabled>
          Quiz
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="words" className="p-4 text-sm">
        Ten words about the family, from amai and baba to sekuru and ambuya.
      </Tabs.Panel>
      <Tabs.Panel value="greetings" className="p-4 text-sm">
        Mangwanani, Masikati and Manheru, for the morning, afternoon and evening.
      </Tabs.Panel>
      <Tabs.Panel value="quiz" className="p-4 text-sm">
        The quiz opens when you finish the lesson.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
