import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p>
        Primary text with <TextLink href="#a">a link</TextLink>.
      </p>
      <p className="text-secondary">
        Secondary text with <TextLink href="#b">a link</TextLink>.
      </p>
      <p className="text-tertiary">
        Tertiary text with <TextLink href="#c">a link</TextLink>.
      </p>
    </div>
  )
}

export { Example }
