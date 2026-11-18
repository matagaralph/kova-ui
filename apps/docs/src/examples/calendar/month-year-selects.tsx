import { Calendar } from "kova-ui/components"

function Example() {
  return (
    <Calendar defaultValue="2026-10-16">
      <Calendar.Header>
        <Calendar.Previous />
        <div className="flex gap-1">
          <Calendar.MonthSelect aria-label="Month" />
          <Calendar.YearSelect aria-label="Year" />
        </div>
        <Calendar.Next />
      </Calendar.Header>
      <Calendar.Grid />
    </Calendar>
  )
}

export { Example }
