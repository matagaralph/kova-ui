import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <Avatar size={48} className="[--avatar-radius:var(--radius-lg)]">
      <Avatar.Image src="https://github.com/octocat.png" alt="Mona Octocat" />
      <Avatar.Fallback name="Mona Octocat" />
    </Avatar>
  )
}

export { Example }
