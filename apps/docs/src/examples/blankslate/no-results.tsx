import { Search } from "@kova-ui/icons"
import { Blankslate } from "kova-ui/components"

function Example() {
  return (
    <Blankslate fill="none" role="status">
      <Blankslate.Icon size="sm">
        <Search />
      </Blankslate.Icon>
      <Blankslate.Description>
        No icons match <span className="font-semibold">"pizza"</span>
      </Blankslate.Description>
    </Blankslate>
  )
}

export { Example }
