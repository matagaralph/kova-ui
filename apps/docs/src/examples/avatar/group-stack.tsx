import { Avatar, AvatarGroup } from "kova-ui/components"

const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing"]
const stacks = ["start", "end"] as const

function Example() {
  return (
    <div className="flex flex-col items-start gap-3">
      {stacks.map((stack) => (
        <AvatarGroup key={stack} stack={stack} size={36}>
          {people.map((name) => (
            <Avatar key={name} variant="solid" color="primary">
              <Avatar.Fallback name={name} />
            </Avatar>
          ))}
        </AvatarGroup>
      ))}
    </div>
  )
}

export { Example }
