import { Button, Field, Label, Radio } from "kova-ui/components"
import { useId, useState } from "react"

const speeds = [
  { value: "standard", label: "Standard", detail: "Free, 5 to 7 days" },
  { value: "express", label: "Express", detail: "$9, 2 days" },
  { value: "overnight", label: "Overnight", detail: "$24, next day" },
]

function Example() {
  const id = useId()
  const [submitted, setSubmitted] = useState("")

  return (
    <div className="flex flex-col items-start gap-4">
      <Field>
        <Field.Label>Shipping speed</Field.Label>
        <Radio.Group
          name="shipping"
          form={`${id}-checkout`}
          required
          defaultValue="standard"
          direction="col"
        >
          {speeds.map((speed) => (
            <Label key={speed.value}>
              <Radio value={speed.value}>
                <Radio.Indicator />
              </Radio>
              {speed.label}
              <span className="text-secondary">({speed.detail})</span>
            </Label>
          ))}
        </Radio.Group>
      </Field>
      <form
        id={`${id}-checkout`}
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(String(new FormData(event.currentTarget).get("shipping")))
        }}
      >
        <Button type="submit" size="sm">
          Continue
        </Button>
        <Button type="reset" color="secondary" variant="outline" size="sm">
          Reset
        </Button>
      </form>
      {submitted && <p className="text-sm text-secondary">Submitted shipping={submitted}</p>}
    </div>
  )
}

export { Example }
