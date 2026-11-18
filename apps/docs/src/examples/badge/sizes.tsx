import { Badge } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge color="info" size="sm">
          Small
        </Badge>
        <Badge color="info" size="md">
          Medium
        </Badge>
        <Badge color="info" size="lg">
          Large
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge color="info" size="sm" pill>
          12
        </Badge>
        <Badge color="info" size="md" pill>
          Pill
        </Badge>
        <Badge color="info" size="lg" pill>
          Pill
        </Badge>
      </div>
    </div>
  )
}

export { Example }
