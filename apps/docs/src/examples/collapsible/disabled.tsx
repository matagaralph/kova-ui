import { Collapsible } from "kova-ui/components"

function Example() {
  return (
    <Collapsible disabled className="w-80">
      <Collapsible.Trigger>Reviewer notes</Collapsible.Trigger>
      <Collapsible.Panel>Notes from the reviewers who checked this entry.</Collapsible.Panel>
    </Collapsible>
  )
}

export { Example }
