import { Calendar } from "kova-ui/components"

const busy = new Set(["2026-10-07", "2026-10-14", "2026-10-21"])

function Example() {
  return (
    <Calendar defaultValue="2026-10-16">
      <Calendar.Header />
      <Calendar.Grid>
        <Calendar.Weekdays>{(index) => <Calendar.Weekday index={index} />}</Calendar.Weekdays>
        <Calendar.Weeks>
          {(cell) => (
            <Calendar.Day value={cell.date} className={busy.has(cell.date) ? "font-semibold" : ""}>
              {(state) => (busy.has(cell.date) ? `${state.label}*` : state.label)}
            </Calendar.Day>
          )}
        </Calendar.Weeks>
      </Calendar.Grid>
    </Calendar>
  )
}

export { Example }
