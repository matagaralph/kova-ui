import { TextLink } from "kova-ui/components"

function Example() {
  return (
    <p className="text-sm">
      You have 3 seats left.{" "}
      <TextLink href="#seats" className="font-semibold">
        Add seats
      </TextLink>
    </p>
  )
}

export { Example }
