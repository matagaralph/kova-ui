import { Field, Slider } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-5">
      <Field>
        <Slider defaultValue={1.5} min={1} max={2} step={0.1} format={{ maximumFractionDigits: 1 }}>
          <Field.Label>Line spacing</Field.Label>
          <Slider.Value />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      </Field>
      <Field>
        <Slider defaultValue={300} min={0} max={2000} step={50} format={(value) => `${value} ms`}>
          <Field.Label>Pause between words</Field.Label>
          <Slider.Value />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
              <Slider.Thumb />
            </Slider.Track>
          </Slider.Control>
        </Slider>
      </Field>
    </div>
  )
}

export { Example }
