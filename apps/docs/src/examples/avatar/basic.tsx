import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <Avatar size={40}>
      <Avatar.Image src="https://github.com/octocat.png" alt="Mona Octocat" />
      <Avatar.Fallback name="Mona Octocat" />
    </Avatar>
  )
}

export { Example }
