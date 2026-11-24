import { Collapsible } from "kova-ui/components"

function Example() {
  return (
    <Collapsible className="w-80">
      <Collapsible.Trigger>Ingredients for sadza</Collapsible.Trigger>
      <Collapsible.Panel hiddenUntilFound>
        <p>White maize meal, boiling water and a wooden spoon called a mugoti to stir it.</p>
      </Collapsible.Panel>
    </Collapsible>
  )
}

export { Example }
