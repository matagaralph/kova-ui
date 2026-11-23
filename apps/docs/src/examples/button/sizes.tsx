import { Button } from "kova-ui/components"

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} size={size} variant="secondary">
          {size}
        </Button>
      ))}
    </div>
  )
}

export { Example }
