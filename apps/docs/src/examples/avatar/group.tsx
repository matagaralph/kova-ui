import { Avatar, AvatarGroup } from "kova-ui/components"

const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing"]

function Example() {
  return (
    <AvatarGroup size={32}>
      {people.map((name) => (
        <Avatar key={name} color="info">
          <Avatar.Fallback name={name} />
        </Avatar>
      ))}
      <AvatarGroup.Overflow count={12} />
    </AvatarGroup>
  )
}

export { Example }
