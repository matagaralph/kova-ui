import { DatePicker } from "kova-ui/components"

const sizes = ["2xs", "sm", "md", "lg", "xl"] as const

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <DatePicker key={size} defaultValue="2026-10-16">
          <DatePicker.Trigger size={size} />
          <DatePicker.Content />
        </DatePicker>
      ))}
    </div>
  )
}

export { Example }
