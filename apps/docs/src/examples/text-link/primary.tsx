import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <TextLink href="#proverbs" primary>
        View all proverbs
      </TextLink>
      <TextLink href="#proverbs" primary underline>
        View all proverbs
      </TextLink>
    </div>
  )
}

export { Example }
