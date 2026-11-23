import { Field, Slider } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Slider defaultValue={[5, 15]} max={30} format={(value) => `${value} min`}>
        <Field.Label>Story length</Field.Label>
        <Slider.Value />
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb index={0} aria-label="Shortest story" />
            <Slider.Thumb index={1} aria-label="Longest story" />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </Field>
  )
}

export { Example }
