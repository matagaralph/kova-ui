import { Avatar } from "kova-ui/components"

const sizes = [24, 32, 48]

function Example() {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Image
            src="https://randomuser.me/api/portraits/med/men/80.jpg"
            alt="Tendai Moyo"
          />
          <Avatar.Fallback name="Tendai Moyo" />
        </Avatar>
      ))}
    </div>
  )
}

export { Example }
