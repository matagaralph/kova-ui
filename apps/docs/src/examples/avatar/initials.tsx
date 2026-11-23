import { Avatar } from "kova-ui/components"

const names = ["Rudo Ncube", "Tatenda Mutasa", "Chipo Mapfumo"]

function Example() {
  return (
    <div className="flex items-center gap-4">
      {names.map((name) => (
        <Avatar key={name} size={32}>
          <Avatar.Fallback name={name} />
        </Avatar>
      ))}
    </div>
  )
}

export { Example }
