import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <Avatar size={32}>
      <Avatar.Image src="https://randomuser.me/api/portraits/med/women/16.jpg" alt="Rudo Ncube" />
      <Avatar.Fallback name="Rudo Ncube" />
    </Avatar>
  )
}

export { Example }
