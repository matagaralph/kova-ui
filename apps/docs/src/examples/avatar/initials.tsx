import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <Avatar.Fallback name="Ada Lovelace" />
      </Avatar>
      <Avatar>
        <Avatar.Fallback name="Grace Hopper" />
      </Avatar>
      <Avatar>
        <Avatar.Fallback name="Katherine Johnson" />
      </Avatar>
    </div>
  )
}

export { Example }
