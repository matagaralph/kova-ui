import { SelectControl } from "kova-ui/components"

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <SelectControl key={size} size={size}>
            {size}
          </SelectControl>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <SelectControl key={size} size={size} pill>
            {size}
          </SelectControl>
        ))}
      </div>
    </div>
  )
}

export { Example }
