import { Collapsible } from "kova-ui/components"

const forms = [
  { form: "Mbira", meaning: "One instrument" },
  { form: "Dzimbira", meaning: "Several instruments" },
  { form: "Kambira", meaning: "A small one" },
]

function Example() {
  return (
    <Collapsible className="w-80">
      <Collapsible.Trigger>Forms of mbira</Collapsible.Trigger>
      <Collapsible.Panel>
        <ul className="flex flex-col gap-1">
          {forms.map((item) => (
            <li key={item.form} className="flex justify-between gap-4">
              <span className="text-default">{item.form}</span>
              <span>{item.meaning}</span>
            </li>
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible>
  )
}

export { Example }
