import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../field/index.js"
import { Slider } from "./index.js"

function Volume(props: React.ComponentProps<typeof Slider<number>>) {
  return (
    <Field>
      <Slider<number> {...props}>
        <Field.Label>Volume</Field.Label>
        <Slider.Value />
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
        <Slider.Marks>
          <Slider.Mark value={0}>Quiet</Slider.Mark>
          <Slider.Mark value={50}>Loud</Slider.Mark>
        </Slider.Marks>
      </Slider>
    </Field>
  )
}

describe("Slider", () => {
  it("names the thumb from a Field and shows the formatted value", () => {
    render(<Volume defaultValue={0.3} min={0} max={1} step={0.1} format={{ style: "percent" }} />)

    const thumb = screen.getByRole("slider", { name: "Volume" })
    expect(thumb).toHaveValue("0.3")
    expect(screen.getByRole("status")).toHaveTextContent("30%")
  })

  it("steps with arrow keys and reports the value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Volume defaultValue={20} step={5} onValueChange={onValueChange} />)

    screen.getByRole("slider", { name: "Volume" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(onValueChange).toHaveBeenLastCalledWith(25, expect.anything())
    await user.keyboard("{End}")
    expect(onValueChange).toHaveBeenLastCalledWith(100, expect.anything())
  })

  it("sets track and range colors as CSS variables, keeping the caller's style", () => {
    render(
      <Volume defaultValue={20} trackColor="gray" rangeColor="tomato" style={{ width: 240 }} />,
    )

    const root = screen.getByRole("group")
    expect(root.className).toMatch(/Slider/)
    expect(root.style.getPropertyValue("--slider-track-color")).toBe("gray")
    expect(root.style.getPropertyValue("--slider-range-color")).toBe("tomato")
    expect(root.style.width).toBe("240px")
  })

  it("places marks along the slider's range", () => {
    render(<Volume defaultValue={20} min={0} max={200} />)

    expect(screen.getByText("Quiet").style.getPropertyValue("--slider-mark-position")).toBe("0")
    expect(screen.getByText("Loud").style.getPropertyValue("--slider-mark-position")).toBe("0.25")
  })

  it("puts Kova's class on every part", () => {
    const { container } = render(<Volume defaultValue={20} />)

    for (const slot of ["slider-value", "slider-control", "slider-track", "slider-indicator"]) {
      const part = container.querySelector(`[data-slot="${slot}"]`)
      expect(part?.className).toMatch(/Slider/)
    }
    expect(container.querySelector('[data-slot="slider-thumb"]')?.className).toMatch(/SliderThumb/)
  })
})
