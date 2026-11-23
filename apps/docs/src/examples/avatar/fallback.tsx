import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size={40}>
        <Avatar.Image src="https://example.invalid/missing.png" alt="Tendai Moyo" />
        <Avatar.Fallback name="Tendai Moyo" />
      </Avatar>
      <Avatar size={40}>
        <Avatar.Image
          src="https://randomuser.me/api/portraits/med/men/30.jpg"
          alt="Tatenda Mutasa"
        />
        <Avatar.Fallback name="Tatenda Mutasa" delay={600} />
      </Avatar>
    </div>
  )
}

export { Example }
