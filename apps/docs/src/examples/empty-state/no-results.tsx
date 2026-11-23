import { Search } from "@kova-ui/icons"
import { EmptyState, TextLink } from "kova-ui/components"

function Example() {
  return (
    <EmptyState fill="none" role="status">
      <EmptyState.Icon size="sm">
        <Search />
      </EmptyState.Icon>
      <EmptyState.Description>
        No words match <span className="font-semibold">"mbiraa"</span>. Did you mean{" "}
        <TextLink href="#mbira">mbira</TextLink>?
      </EmptyState.Description>
    </EmptyState>
  )
}

export { Example }
