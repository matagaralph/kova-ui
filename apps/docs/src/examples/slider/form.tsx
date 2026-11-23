import { Button, Field, Slider } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [saved, setSaved] = useState<string | null>(null)

  return (
    <form
      className="flex w-72 flex-col items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setSaved(String(new FormData(event.currentTarget).get("goal")))
      }}
    >
      <Field>
        <Slider name="goal" defaultValue={20} max={60} step={5} format={(value) => `${value} min`}>
          <Field.Label>Daily practice</Field.Label>
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
      {saved && <p className="text-sm text-secondary">Saved a daily goal of {saved} min</p>}
    </form>
  )
}

export { Example }
