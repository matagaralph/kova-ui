import { KovaProvider, TextLink } from "kova-ui/components"
import type { ComponentProps } from "react"

function RouterLink({ href, onClick, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      href={href}
      data-router-link=""
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
        window.history.pushState(null, "", href)
      }}
    />
  )
}

function Example() {
  return (
    <KovaProvider linkComponent={RouterLink}>
      <nav aria-label="Explore" className="flex gap-4 text-sm">
        <TextLink href="#dictionary">Dictionary</TextLink>
        <TextLink href="#proverbs">Proverbs</TextLink>
        <TextLink href="https://en.wikipedia.org/wiki/Shona_language">Shona on Wikipedia</TextLink>
      </nav>
    </KovaProvider>
  )
}

export { Example }
