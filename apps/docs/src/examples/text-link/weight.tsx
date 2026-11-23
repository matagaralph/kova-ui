import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <p className="text-sm">
      You have 3 words to review.{" "}
      <TextLink href="#review" className="font-semibold">
        Start reviewing
      </TextLink>
    </p>
  )
}

export { Example }
