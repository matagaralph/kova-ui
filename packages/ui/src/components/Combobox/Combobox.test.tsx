import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../Field/index.js"
import { Combobox } from "./Combobox.js"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "astro", label: "Astro" },
]

const labelOf = (value: string) => frameworks.find((f) => f.value === value)?.label ?? value

function Items() {
  return frameworks.map((framework) => (
    <Combobox.Item key={framework.value} value={framework.value} label={framework.label}>
      {framework.label}
      <Combobox.ItemIndicator />
    </Combobox.Item>
  ))
}

describe("Combobox", () => {
  it("is named by a Field.Label, filters as you type and chooses with Enter", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Field>
        <Field.Label>Framework</Field.Label>
        <Combobox onValueChange={onValueChange}>
          <Combobox.Control data-testid="control" size="lg">
            <Combobox.Input placeholder="Select a framework" />
            <Combobox.Trigger aria-label="Show frameworks" />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Empty>No frameworks found.</Combobox.Empty>
            <Combobox.List>
              <Items />
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
      </Field>,
    )

    const input = screen.getByRole("combobox", { name: "Framework" })
    expect(screen.getByTestId("control")).toHaveAttribute("data-size", "lg")

    await user.type(input, "sv")
    expect(screen.getByRole("option", { name: "SvelteKit" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Nuxt" })).toBeNull()

    await user.keyboard("{ArrowDown}{Enter}")
    expect(onValueChange).toHaveBeenCalledWith("sveltekit", expect.anything())
    expect(input).toHaveValue("SvelteKit")
  })

  it("opens from the trigger, which shows Kova's icon by default", async () => {
    const user = userEvent.setup()
    render(
      <Combobox>
        <Combobox.Control>
          <Combobox.Input aria-label="Framework" />
          <Combobox.Trigger aria-label="Show frameworks" />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.List>
            <Items />
          </Combobox.List>
        </Combobox.Content>
      </Combobox>,
    )

    const trigger = screen.getByRole("button", { name: "Show frameworks", hidden: true })
    expect(trigger.querySelector("svg")).not.toBeNull()
    await user.click(trigger)
    expect(screen.getAllByRole("option")).toHaveLength(4)
  })

  it("adds and removes chips with multiple", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        multiple
        defaultValue={["next"]}
        itemToLabel={labelOf}
        onValueChange={onValueChange}
      >
        <Combobox.Chips size="xl" data-testid="chips">
          <Combobox.Value>
            {(state) =>
              (state.value as string[]).map((value, index) => (
                <Combobox.Chip key={value} value={value}>
                  {state.labels[index]}
                  <Combobox.ChipRemove aria-label={`Remove ${state.labels[index]}`} />
                </Combobox.Chip>
              ))
            }
          </Combobox.Value>
          <Combobox.Input aria-label="Frameworks" />
        </Combobox.Chips>
        <Combobox.Content>
          <Combobox.List>
            <Items />
          </Combobox.List>
        </Combobox.Content>
      </Combobox>,
    )

    expect(screen.getByTestId("chips")).toHaveAttribute("data-size", "xl")
    await user.type(screen.getByRole("combobox", { name: "Frameworks" }), "astro")
    await user.keyboard("{ArrowDown}{Enter}")
    expect(onValueChange).toHaveBeenLastCalledWith(["next", "astro"], expect.anything())

    await user.click(screen.getByRole("button", { name: "Remove Next.js", hidden: true }))
    expect(onValueChange).toHaveBeenLastCalledWith(["astro"], expect.anything())
  })

  it("offers to create an option for a new query", async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()
    render(
      <Combobox>
        <Combobox.Control>
          <Combobox.Input aria-label="Label" />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.List>
            <Items />
            <Combobox.Create onCreate={onCreate} />
          </Combobox.List>
        </Combobox.Content>
      </Combobox>,
    )

    await user.type(screen.getByRole("combobox", { name: "Label" }), "Qwik")
    const create = screen.getByRole("option", { name: "Create “Qwik”" })
    await user.click(create)
    expect(onCreate).toHaveBeenCalledWith("Qwik")
  })
})
