import { Separator } from "kova-ui/components"

const stats = [
  { value: "24", label: "Projects" },
  { value: "1,280", label: "Followers" },
  { value: "312", label: "Following" },
]

function Example() {
  return (
    <div className="flex items-center gap-4 text-sm">
      {stats.map((stat, index) => (
        <div key={stat.label} className="contents">
          {index > 0 && <Separator orientation="vertical" />}
          <div className="flex flex-col">
            <span className="font-semibold tabular-nums">{stat.value}</span>
            <span className="text-secondary">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Example }
