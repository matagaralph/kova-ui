import { Calendar } from "kova-ui/components"

function Example() {
  return (
    <Calendar mode="range" months={2} pageBy="page" defaultValue={["2026-10-26", "2026-11-03"]} />
  )
}

export { Example }
