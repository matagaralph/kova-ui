import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <TextLink href="#billing" primary>
        Manage billing
      </TextLink>
      <TextLink href="#billing" primary underline>
        Manage billing
      </TextLink>
    </div>
  )
}

export { Example }
