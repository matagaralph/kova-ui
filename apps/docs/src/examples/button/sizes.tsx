import { Button } from "kova-ui/components"

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <Button key={size} size={size} color="secondary" variant="outline">
            {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {sizes.map((size) => (
          <Button key={size} size={size} color="secondary" variant="soft" pill>
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}

export { Example }
