import { fireEvent, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../field/index.js"
import { TagInput } from "./tag-input.js"

type Props = Partial<Parameters<typeof TagInput>[0]>

function Tags(props: Props) {
  return (
    <form data-testid="form">
      <Field>
        <Field.Label>Recipients</Field.Label>
        <TagInput name="to" {...props}>
          <TagInput.Control data-testid="control" size="lg" rows={2}>
            <TagInput.Value />
            <TagInput.Input placeholder="Add people" />
          </TagInput.Control>
          <TagInput.Count />
        </TagInput>
      </Field>
    </form>
  )
}

const tagNames = () =>
  [...document.querySelectorAll("[data-slot='combobox-chip']")].map((tag) => tag.textContent)

describe("TagInput", () => {
  it("turns text into tags on Enter and delimiters, and submits them", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Tags onValueChange={onValueChange} />)

    const input = screen.getByRole("combobox", { name: "Recipients" })
    await user.type(input, "ada{Enter}grace,linus ")
    expect(tagNames()).toEqual(["ada", "grace", "linus"])
    expect(onValueChange).toHaveBeenLastCalledWith(["ada", "grace", "linus"], expect.anything())
    expect(input).toHaveValue("")
    expect(new FormData(screen.getByTestId("form") as HTMLFormElement).getAll("to")).toEqual([
      "ada",
      "grace",
      "linus",
    ])
  })

  it("splits pasted text on the delimiters", async () => {
    const user = userEvent.setup()
    render(<Tags delimiters={[";"]} />)

    const input = screen.getByRole("combobox", { name: "Recipients" })
    await user.click(input)
    await user.paste("one;two\nthree")
    expect(tagNames()).toEqual(["one", "two", "three"])
  })

  it("adds the text on blur and Tab", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Tags />
        <button type="button">Next</button>
      </>,
    )

    const input = screen.getByRole("combobox", { name: "Recipients" })
    await user.type(input, "ada")
    await user.tab()
    expect(tagNames()).toEqual(["ada"])
    expect(input).toHaveFocus()

    await user.type(input, "grace")
    await user.click(screen.getByRole("button", { name: "Next" }))
    expect(tagNames()).toEqual(["ada", "grace"])
  })

  it("ignores duplicates and marks the existing tag", async () => {
    const user = userEvent.setup()
    render(<Tags defaultValue={["ada"]} />)

    await user.type(screen.getByRole("combobox", { name: "Recipients" }), "ada{Enter}")
    expect(tagNames()).toEqual(["ada"])
    expect(screen.getByRole("group", { name: "ada" })).toHaveAttribute("data-duplicate")
  })

  it("marks tags the validator rejects", async () => {
    const user = userEvent.setup()
    render(<Tags validator={(tag) => tag.includes("@")} />)

    await user.type(screen.getByRole("combobox", { name: "Recipients" }), "a@b.co nope ")
    expect(screen.getByRole("group", { name: "a@b.co" })).not.toHaveAttribute("data-invalid")
    expect(screen.getByRole("group", { name: "nope" })).toHaveAttribute("data-invalid")
  })

  it("stops at maxTags and counts against it", async () => {
    const user = userEvent.setup()
    render(<Tags maxTags={2} />)

    await user.type(screen.getByRole("combobox", { name: "Recipients" }), "a b c ")
    expect(tagNames()).toEqual(["a", "b"])
    expect(screen.getByText("/").parentElement).toHaveTextContent("2/2")
  })

  it("removes tags with their button and with Backspace", async () => {
    const user = userEvent.setup()
    render(<Tags defaultValue={["ada", "grace", "linus"]} />)

    await user.click(screen.getByRole("button", { name: "Remove grace", hidden: true }))
    expect(tagNames()).toEqual(["ada", "linus"])

    const input = screen.getByRole("combobox", { name: "Recipients" })
    await user.click(input)
    await user.keyboard("{Backspace}")
    expect(tagNames()).toEqual(["ada"])
  })

  it("never opens a popup and writes Kova props", () => {
    render(<Tags />)

    const input = screen.getByRole("combobox", { name: "Recipients" })
    fireEvent.keyDown(input, { key: "ArrowDown" })
    expect(input).toHaveAttribute("aria-expanded", "false")
    const control = screen.getByTestId("control")
    expect(control).toHaveAttribute("data-size", "lg")
    expect(control.style.getPropertyValue("--tag-input-rows")).toBe("2")
  })

  it("adds tags to a controlled value", async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [tags, setTags] = useState<string[]>(["bug"])
      return (
        <>
          <TagInput value={tags} onValueChange={setTags}>
            <TagInput.Control>
              <TagInput.Value />
              <TagInput.Input aria-label="Labels" />
            </TagInput.Control>
          </TagInput>
          <output data-testid="out">{tags.join("|")}</output>
        </>
      )
    }
    render(<Controlled />)

    await user.type(screen.getByRole("combobox", { name: "Labels" }), "ui{Enter}")
    expect(screen.getByTestId("out")).toHaveTextContent("bug|ui")
    expect(tagNames()).toEqual(["bug", "ui"])
  })
})
