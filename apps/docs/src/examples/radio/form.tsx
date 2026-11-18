import { Button, Field, Label, Radio } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <form
      className="flex flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(String(new FormData(event.currentTarget).get("size")))
      }}
    >
      <Field>
        <Field.Label>T-shirt size</Field.Label>
        <Radio.Group name="size" required>
          {["S", "M", "L", "XL"].map((size) => (
            <Label key={size}>
              <Radio value={size}>
                <Radio.Indicator />
              </Radio>
              {size}
            </Label>
          ))}
        </Radio.Group>
        <Field.Error match="valueMissing">Choose a size.</Field.Error>
      </Field>
      <Button type="submit" size="sm">
        Order
      </Button>
      {submitted && <p className="text-sm text-secondary">Ordered size {submitted}</p>}
    </form>
  )
}

export { Example }
