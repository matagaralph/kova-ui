import { Field, Slider } from "kova-ui/components"

function Example() {
  return (
    <Field className="w-72">
      <Slider
        defaultValue={[25, 75]}
        step={5}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      >
        <Field.Label>Price</Field.Label>
        <Slider.Value />
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb index={0} aria-label="Minimum price" />
            <Slider.Thumb index={1} aria-label="Maximum price" />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </Field>
  )
}

export { Example }
