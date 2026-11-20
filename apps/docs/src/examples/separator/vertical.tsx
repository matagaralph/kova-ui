import { Separator, TextLink } from "kova-ui/components"

function Example() {
  return (
    <nav aria-label="Legal" className="flex items-center gap-3 text-sm">
      <TextLink href="#">Privacy</TextLink>
      <Separator orientation="vertical" />
      <TextLink href="#">Terms</TextLink>
      <Separator orientation="vertical" />
      <TextLink href="#">Cookies</TextLink>
    </nav>
  )
}

export { Example }
