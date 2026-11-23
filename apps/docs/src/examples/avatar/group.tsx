import { Avatar, AvatarGroup } from "kova-ui/components"

const reviewers = [
  { name: "Rudo Ncube", src: "https://randomuser.me/api/portraits/med/women/16.jpg" },
  { name: "Tendai Moyo", src: "https://randomuser.me/api/portraits/med/men/80.jpg" },
  { name: "Chipo Mapfumo", src: "https://randomuser.me/api/portraits/med/women/30.jpg" },
]

const contributors = [
  { name: "Farai Gumbo", src: "https://randomuser.me/api/portraits/med/men/54.jpg" },
  { name: "Tsitsi Marufu", src: "https://randomuser.me/api/portraits/med/women/36.jpg" },
  { name: "Tatenda Mutasa", src: "https://randomuser.me/api/portraits/med/men/30.jpg" },
  { name: "Tinashe Sibanda", src: "https://randomuser.me/api/portraits/med/men/59.jpg" },
]

function Example() {
  return (
    <div className="flex items-center gap-4">
      <AvatarGroup size={32}>
        {reviewers.map((person) => (
          <Avatar key={person.name}>
            <Avatar.Image src={person.src} alt={person.name} />
            <Avatar.Fallback name={person.name} />
          </Avatar>
        ))}
      </AvatarGroup>
      <AvatarGroup size={32}>
        {contributors.map((person) => (
          <Avatar key={person.name}>
            <Avatar.Image src={person.src} alt={person.name} />
            <Avatar.Fallback name={person.name} />
          </Avatar>
        ))}
        <AvatarGroup.Overflow count={12} />
      </AvatarGroup>
    </div>
  )
}

export { Example }
