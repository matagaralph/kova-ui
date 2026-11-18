import { Avatar } from "kova-ui/components"

const colors = ["primary", "secondary", "info", "discovery", "success", "danger"] as const
const variants = ["soft", "solid"] as const

function Example() {
  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          {colors.map((color) => (
            <Avatar key={color} size={36} color={color} variant={variant}>
              <Avatar.Fallback name={color} />
            </Avatar>
          ))}
        </div>
      ))}
    </div>
  )
}

export { Example }
