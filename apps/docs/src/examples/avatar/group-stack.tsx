import { Avatar, AvatarGroup } from "kova-ui/components"

const people = [
  { name: "Rudo Ncube", src: "https://randomuser.me/api/portraits/med/women/16.jpg" },
  { name: "Tendai Moyo", src: "https://randomuser.me/api/portraits/med/men/80.jpg" },
  { name: "Chipo Mapfumo", src: "https://randomuser.me/api/portraits/med/women/30.jpg" },
]

function Example() {
  return (
    <div className="flex items-center gap-4">
      {(["start", "end"] as const).map((stack) => (
        <AvatarGroup key={stack} stack={stack} size={32}>
          {people.map((person) => (
            <Avatar key={person.name}>
              <Avatar.Image src={person.src} alt={person.name} />
              <Avatar.Fallback name={person.name} />
            </Avatar>
          ))}
        </AvatarGroup>
      ))}
    </div>
  )
}

export { Example }
