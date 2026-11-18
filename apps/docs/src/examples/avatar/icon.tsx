import { Headphones } from "@kova-ui/icons"
import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <Avatar size={48} color="discovery">
      <Avatar.Fallback>
        <Headphones aria-hidden="true" />
        <span className="sr-only">Support team</span>
      </Avatar.Fallback>
    </Avatar>
  )
}

export { Example }
