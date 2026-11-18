import { Input } from "kova-ui/components"

const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const

function Example() {
  return (
    <div className="flex w-72 flex-col gap-2">
      {sizes.map((size) => (
        <Input key={size} size={size} aria-label={`Size ${size}`} placeholder={`Size ${size}`} />
      ))}
    </div>
  )
}

export { Example }
