import { Reload } from "@kova-ui/icons"
import { Button, Field, Slider } from "kova-ui/components"
import { useState } from "react"

const DEFAULT_SPEED = 1

function Example() {
  const [speed, setSpeed] = useState(DEFAULT_SPEED)

  return (
    <Field className="w-72">
      <Slider
        value={speed}
        onValueChange={setSpeed}
        min={0.5}
        max={2}
        step={0.25}
        format={(value) => `${value}×`}
      >
        <div className="flex items-center gap-1">
          <Field.Label>Playback speed</Field.Label>
          {speed !== DEFAULT_SPEED && (
            <Button
              size="2xs"
              variant="ghost"
              color="secondary"
              uniform
              aria-label="Reset playback speed"
              onClick={() => setSpeed(DEFAULT_SPEED)}
            >
              <Reload />
            </Button>
          )}
        </div>
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
