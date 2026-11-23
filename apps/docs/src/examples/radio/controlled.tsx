import { Button, createRadioGroupController, Field, Label, Radio } from "kova-ui/components"
import { useState } from "react"

type Status = "draft" | "review" | "published"

const statuses: { value: Status; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In review" },
  { value: "published", label: "Published" },
]

function Example() {
  const [statusGroup] = useState(() => createRadioGroupController<Status>())
  const [value, setValue] = useState<Status | null>("review")
  const [lastChange, setLastChange] = useState("")

  return (
    <div className="flex flex-col items-start gap-4">
      <Button variant="outline" size="sm" onClick={() => statusGroup.setValue("published")}>
        Publish
      </Button>
      <Field>
        <Field.Label>Status</Field.Label>
        <Radio.Group
          value={value}
          direction="col"
          onValueChange={(next, details) => {
            setValue(next)
            const label = statuses.find((status) => status.value === next)?.label ?? "None"
            setLastChange(`${label} (${details.reason})`)
          }}
          controller={statusGroup}
        >
          {statuses.map((status) => (
            <Label key={status.value}>
              <Radio value={status.value}>
                <Radio.Indicator />
              </Radio>
              {status.label}
            </Label>
          ))}
        </Radio.Group>
      </Field>
      {lastChange && <p className="text-sm text-secondary">Changed to {lastChange}</p>}
    </div>
  )
}

export { Example }
