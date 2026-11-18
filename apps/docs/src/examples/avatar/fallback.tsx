import { Avatar } from "kova-ui/components"

function Example() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size={40}>
        <Avatar.Image src="https://example.invalid/missing.png" alt="Alan Turing" />
        <Avatar.Fallback name="Alan Turing" />
      </Avatar>
      <Avatar size={40}>
        <Avatar.Image src="https://github.com/octocat.png" alt="Mona Octocat" />
        <Avatar.Fallback name="Mona Octocat" delay={600} />
      </Avatar>
    </div>
  )
}

export { Example }
