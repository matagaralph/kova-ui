import { Slider } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-72 flex-col gap-4">
      <Slider defaultValue={60} rangeColor="var(--color-background-success-solid)">
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Health" />
          </Slider.Track>
        </Slider.Control>
      </Slider>
      <Slider defaultValue={30} rangeColor="var(--color-background-danger-solid)">
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Risk" />
          </Slider.Track>
        </Slider.Control>
      </Slider>
    </div>
  )
}

export { Example }
