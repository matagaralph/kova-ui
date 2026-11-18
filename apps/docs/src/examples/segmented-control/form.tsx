import { Button, Field, SegmentedControl } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("density")))
      }}
    >
      <Field>
        <Field.Label>Density</Field.Label>
        <SegmentedControl name="density" defaultValue="comfortable">
          <SegmentedControl.Indicator />
          <SegmentedControl.Item value="compact">Compact</SegmentedControl.Item>
          <SegmentedControl.Item value="comfortable">Comfortable</SegmentedControl.Item>
        </SegmentedControl>
        <Field.Description>Compact fits more rows on screen.</Field.Description>
      </Field>
      <Button type="submit" size="sm">
        Save
      </Button>
      {submitted && <p className="text-sm text-secondary">Saved density={submitted}</p>}
    </form>
  )
}

export { Example }
