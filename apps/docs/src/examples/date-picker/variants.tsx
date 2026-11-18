import { DatePicker } from "kova-ui/components"

const variants = ["outline", "soft", "ghost"] as const

function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <DatePicker key={variant} defaultValue="2026-10-16">
          <DatePicker.Trigger variant={variant} />
          <DatePicker.Content />
        </DatePicker>
      ))}
    </div>
  )
}

export { Example }
