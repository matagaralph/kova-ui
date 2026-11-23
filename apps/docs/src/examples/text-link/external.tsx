import { ExternalLink } from "@kova-ui/icons"
import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <p className="text-sm">
      Read about the{" "}
      <TextLink href="https://en.wikipedia.org/wiki/Shona_language">
        Shona language on Wikipedia
        <ExternalLink />
        <span className="sr-only">(opens in a new tab)</span>
      </TextLink>{" "}
      before you start the first lesson.
    </p>
  )
}

export { Example }
