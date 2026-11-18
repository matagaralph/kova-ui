import { Button } from "kova-ui/components"

const colors = [
  "primary",
  "secondary",
  "danger",
  "success",
  "warning",
  "caution",
  "info",
  "discovery",
] as const
const variants = ["solid", "soft", "outline", "ghost"] as const

function Example() {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button key={color} color={color} variant={variant} size="sm">
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

export { Example }
