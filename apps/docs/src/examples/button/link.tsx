import { ExternalLink } from "@kova-ui/icons"
import { ButtonLink } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonLink href="#dictionary" variant="secondary">
        Open the dictionary
      </ButtonLink>
      <ButtonLink href="https://en.wikipedia.org/wiki/Shona_language" variant="ghost">
        Shona on Wikipedia
        <ExternalLink />
      </ButtonLink>
    </div>
  )
}

export { Example }
