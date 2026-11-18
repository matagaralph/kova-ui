import { Field, Slider } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Slider defaultValue={50}>
        <Field.Label>Volume</Field.Label>
        <Slider.Value />
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </Field>
  )
}

export { Example }
