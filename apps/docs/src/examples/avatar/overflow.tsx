import { AvatarGroup } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-3">
      <AvatarGroup.Overflow count={4} size={40} />
      <AvatarGroup.Overflow count={48} size={40} />
      <AvatarGroup.Overflow count={1250} size={40} />
    </div>
  )
}

export { Example }
