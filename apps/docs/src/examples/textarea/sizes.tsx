import { Textarea } from "kova-ui/components"

const sizes = ["xs", "md", "xl", "3xl"] as const

function Example() {
  return (
    <div className="flex w-80 flex-col gap-3">
      {sizes.map((size) => (
        <Textarea
          key={size}
          size={size}
          rows={1}
          aria-label={`Size ${size}`}
          placeholder={`Size ${size}`}
        />
      ))}
    </div>
  )
}

export { Example }
