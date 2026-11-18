import { ExternalLink } from "@kova-ui/icons"
import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <p className="text-sm">
      See the{" "}
      <TextLink href="https://developer.mozilla.org/docs/Web/HTML/Element/a">
        MDN reference
        <ExternalLink />
        <span className="sr-only">(opens in a new tab)</span>
      </TextLink>{" "}
      for every anchor attribute.
    </p>
  )
}

export { Example }
