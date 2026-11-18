import { Badge } from "kova-ui/components"

const colors = ["secondary", "success", "warning", "danger", "info", "discovery"] as const

function Example() {
  return (
    <div className="flex flex-col gap-3">
      {(["soft", "solid", "outline"] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          {colors.map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  )
}

export { Example }
