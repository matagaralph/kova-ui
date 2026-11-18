import { Button, Field, Slider } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [saved, setSaved] = useState<string | null>(null)

  return (
    <form
      className="flex w-72 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSaved(String(new FormData(event.currentTarget).get("budget")))
      }}
    >
      <Field>
        <Slider
          name="budget"
          defaultValue={40}
          step={10}
          format={{ style: "currency", currency: "USD" }}
        >
          <Field.Label>Monthly budget</Field.Label>
          <Slider.Value />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      </Field>
      <Button type="submit" size="sm">
        Save
      </Button>
      {saved && <p className="text-sm text-secondary">Saved a budget of ${saved}</p>}
    </form>
  )
}

export { Example }
