import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <nav aria-label="Footer" className="flex gap-4 text-sm text-secondary">
      <TextLink href="#privacy" underline={false}>
        Privacy
      </TextLink>
      <TextLink href="#terms" underline={false}>
        Terms
      </TextLink>
      <TextLink href="#status" underline={false}>
        Status
      </TextLink>
    </nav>
  )
}

export { Example }
