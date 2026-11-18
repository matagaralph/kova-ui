import { Calendar } from "kova-ui/components"

function Example() {
  return (
    <Calendar
      defaultValue="2026-10-16"
      min="2026-10-05"
      max="2026-11-20"
      unavailable={[{ weekday: [0, 6] }, "2026-10-22"]}
    />
  )
}

export { Example }
