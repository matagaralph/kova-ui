import { Field, Slider } from "kova-ui/components"

const labels = ["Easy", "Medium", "Hard"]

function Example() {
  return (
    <Field className="w-72">
      <Slider
        defaultValue={1}
        min={0}
        max={2}
        step={1}
        format={(value) => labels[value] ?? String(value)}
      >
        <Field.Label>Quiz difficulty</Field.Label>
        <Slider.Value />
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
        <Slider.Marks>
          {labels.map((label, index) => (
            <Slider.Mark key={label} value={index}>
              {label}
            </Slider.Mark>
          ))}
        </Slider.Marks>
      </Slider>
    </Field>
  )
}

export { Example }
