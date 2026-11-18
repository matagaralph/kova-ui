import { Avatar } from "kova-ui/components"

const sizes = [20, 28, 40, 56, 72]

function Example() {
  return (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Fallback name="Noah" />
        </Avatar>
      ))}
    </div>
  )
}

export { Example }
