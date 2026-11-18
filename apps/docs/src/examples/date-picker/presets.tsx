import { Calendar, DatePicker } from "kova-ui/components"

const presets: { label: string; value: [string, string] }[] = [
  { label: "Today", value: ["2026-10-16", "2026-10-16"] },
  { label: "Last 7 days", value: ["2026-10-10", "2026-10-16"] },
  { label: "Last 30 days", value: ["2026-09-17", "2026-10-16"] },
  { label: "Month to date", value: ["2026-10-01", "2026-10-16"] },
  { label: "Last month", value: ["2026-09-01", "2026-09-30"] },
]

function presetLabel(value: unknown) {
  if (!Array.isArray(value)) return undefined
  return presets.find((preset) => preset.value[0] === value[0] && preset.value[1] === value[1])
    ?.label
}

function Example() {
  return (
    <DatePicker mode="range" today="2026-10-16" defaultValue={presets[1]?.value}>
      <DatePicker.Trigger>
        <DatePicker.ValueText>{(value) => presetLabel(value)}</DatePicker.ValueText>
      </DatePicker.Trigger>
      <DatePicker.Content>
        <DatePicker.Presets>
          {presets.map((preset) => (
            <DatePicker.Preset key={preset.label} value={preset.value}>
              {preset.label}
            </DatePicker.Preset>
          ))}
        </DatePicker.Presets>
        <Calendar.Header />
        <Calendar.Months />
      </DatePicker.Content>
    </DatePicker>
  )
}

export { Example }
