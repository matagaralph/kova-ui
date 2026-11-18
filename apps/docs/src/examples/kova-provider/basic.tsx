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
      <nav aria-label="Account" className="flex gap-4 text-sm">
        <TextLink href="#profile">Profile</TextLink>
        <TextLink href="#billing">Billing</TextLink>
        <TextLink href="https://example.com/help">Help center</TextLink>
      </nav>
    </KovaProvider>
  )
}

export { Example }
