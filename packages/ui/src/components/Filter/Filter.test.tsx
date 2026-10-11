import { render, screen, waitFor, within } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { createRef, useState } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import {
  Filter,
  type FilterProvider,
  type FilterRef,
  FilterRevert,
  parseFilterQuery,
} from "./index.js"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    type: "select",
    options: [{ value: "open" }, { value: "closed" }, { value: "in-review", label: "In review" }],
  },
  {
    key: "label",
    displayName: "Label",
    type: "select",
    allowsMultiple: true,
    options: [{ value: "bug" }, { value: "docs" }, { value: "design system" }],
  },
  { key: "owner", displayName: "Owner", aliases: ["assignee"] },
  { key: "priority", displayName: "Priority", type: "number", negatable: false },
  { key: "created", displayName: "Created", type: "date" },
]

const getInput = () => screen.getByRole("combobox", { name: "Filter tasks" })

describe("parseFilterQuery", () => {
  it("splits qualifiers and free text", () => {
    const query = parseFilterQuery('status:open label:bug,"design system" fix login', providers)
    expect(query.text).toBe("fix login")
    expect(query.qualifiers.map((q) => [q.key, q.values])).toEqual([
      ["status", ["open"]],
      ["label", ["bug", "design system"]],
    ])
    expect(query.isValid).toBe(true)
  })

  it("parses negated qualifiers and aliases", () => {
    const [qualifier] = parseFilterQuery("-assignee:sam", providers).qualifiers
    expect(qualifier.negated).toBe(true)
    expect(qualifier.provider?.key).toBe("owner")
  })

  it("records block positions", () => {
    const query = parseFilterQuery("  status:open  text", providers)
    expect(query.blocks.map(({ start, end }) => [start, end])).toEqual([
      [2, 13],
      [15, 19],
    ])
  })

  it.each([
    ["unknown:value", '"unknown" is not a valid filter'],
    ["status:", '"status" needs a value'],
    ["status:open,closed", '"status" accepts only one value'],
    ["status:merged", '"merged" is not a valid value for "status"'],
    ["-priority:1", '"priority" can\'t be excluded'],
    ["priority:high", '"high" is not a number for "priority"'],
    ["created:2024-13-01", '"2024-13-01" is not a date for "created". Use YYYY-MM-DD'],
  ])("validates %s", (value, message) => {
    expect(parseFilterQuery(value, providers).validationMessages).toEqual([message])
  })

  it.each([
    "priority:>3",
    "priority:1..5",
    "created:>=2024-01-31",
    "created:2024-01-01..2024-02-01",
  ])("accepts %s", (value) => {
    expect(parseFilterQuery(value, providers).isValid).toBe(true)
  })

  it("runs custom validation", () => {
    const query = parseFilterQuery("owner:x", [
      { key: "owner", validate: ([value]) => (value.length < 2 ? "Too short" : undefined) },
    ])
    expect(query.validationMessages).toEqual(["Too short"])
  })
})

describe("Filter", () => {
  it("labels the input", () => {
    render(<Filter label="Filter tasks" providers={providers} />)
    expect(getInput()).toBeInTheDocument()
    expect(screen.getByText("Filter tasks")).not.toHaveClass("sr-only")
  })

  it("can visually hide the label", () => {
    render(<Filter label="Filter tasks" visuallyHideLabel providers={providers} />)
    expect(screen.getByText("Filter tasks")).toHaveClass("sr-only")
  })

  it("renders the input and filter button by default", () => {
    render(<Filter label="Filter tasks" providers={providers} />)
    expect(getInput()).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument()
  })

  it("renders only the input with variant input", () => {
    render(<Filter label="Filter tasks" variant="input" providers={providers} />)
    expect(screen.queryByRole("button", { name: "Filter" })).not.toBeInTheDocument()
  })

  it("renders only the button with variant button", () => {
    render(
      <Filter
        label="Filter tasks"
        variant="button"
        initialFilterValue="status:open label:bug"
        providers={providers}
      />,
    )
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Filter/ })).toHaveTextContent("(2)")
  })

  it("renders an icon only button with filterButtonVariant compact", () => {
    render(<Filter label="Filter tasks" filterButtonVariant="compact" providers={providers} />)
    expect(screen.getByRole("button", { name: "Advanced filter" })).not.toHaveTextContent("Filter")
  })

  it("suggests qualifiers and then values", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Filter label="Filter tasks" providers={providers} onChange={onChange} />)

    await user.type(getInput(), "sta")
    const qualifier = await screen.findByRole("option", { name: /Status/ })
    expect(screen.getAllByRole("option")).toHaveLength(1)

    await user.click(qualifier)
    expect(getInput()).toHaveValue("status:")

    const value = await screen.findByRole("option", { name: "In review" })
    expect(screen.getAllByRole("option")).toHaveLength(3)

    await user.click(value)
    expect(getInput()).toHaveValue("status:in-review ")
    expect(onChange).toHaveBeenLastCalledWith("status:in-review ")
  })

  it("filters value suggestions by the typed text", async () => {
    const user = userEvent.setup()
    render(<Filter label="Filter tasks" providers={providers} />)
    await user.type(getInput(), "status:clo")
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1))
    expect(screen.getByRole("option")).toHaveTextContent("closed")
  })

  it("appends to multiple values and skips chosen ones", async () => {
    const user = userEvent.setup()
    render(<Filter label="Filter tasks" providers={providers} />)
    await user.type(getInput(), "label:bug,")
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2))

    await user.click(screen.getByRole("option", { name: "design system" }))
    expect(getInput()).toHaveValue('label:bug,"design system" ')
  })

  it("keeps the leading minus of an excluded qualifier", async () => {
    const user = userEvent.setup()
    render(<Filter label="Filter tasks" providers={providers} />)
    await user.type(getInput(), "-own")
    await user.click(await screen.findByRole("option", { name: /Owner/ }))
    expect(getInput()).toHaveValue("-owner:")
  })

  it("loads async suggestions", async () => {
    const user = userEvent.setup()
    const getSuggestions = vi.fn(async (query: string) =>
      ["sam", "sasha", "alex"].filter((name) => name.startsWith(query)).map((value) => ({ value })),
    )
    render(
      <Filter
        label="Filter tasks"
        providers={[{ key: "owner", getSuggestions }]}
        context={{ team: "web" }}
      />,
    )
    await user.type(getInput(), "owner:sa")
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(2))
    expect(getSuggestions).toHaveBeenLastCalledWith("sa", { team: "web" })
  })

  it("submits with Enter", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<Filter label="Filter tasks" providers={providers} onSubmit={onSubmit} />)
    await user.type(getInput(), "fix login{Enter}")
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].text).toBe("fix login")
    expect(onSubmit.mock.calls[0][1]).toBe("enter")
  })

  it("shows validation messages after submitting", async () => {
    const user = userEvent.setup()
    const onValidation = vi.fn()
    render(
      <Filter
        label="Filter tasks"
        providers={providers}
        onValidation={onValidation}
        aria-describedby="hint"
      />,
    )
    await user.type(getInput(), "status:merged{Escape}{Enter}")

    expect(getInput()).toHaveAttribute("aria-invalid", "true")
    expect(getInput()).toHaveAccessibleDescription('"merged" is not a valid value for "status"')
    expect(getInput().getAttribute("aria-describedby")).toContain("hint")
    expect(onValidation).toHaveBeenLastCalledWith(
      ['"merged" is not a valid value for "status"'],
      expect.objectContaining({ raw: "status:merged" }),
    )
  })

  it("validates the initial value", () => {
    render(<Filter label="Filter tasks" providers={providers} initialFilterValue="nope:x" />)
    expect(screen.getByText('"nope" is not a valid filter')).toBeInTheDocument()
  })

  it("hides validation messages with showValidationMessage false", () => {
    render(
      <Filter
        label="Filter tasks"
        providers={providers}
        initialFilterValue="nope:x"
        showValidationMessage={false}
      />,
    )
    expect(screen.queryByText('"nope" is not a valid filter')).not.toBeInTheDocument()
    expect(getInput()).not.toHaveAttribute("aria-invalid")
  })

  it("clears the query", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <Filter
        label="Filter tasks"
        providers={providers}
        initialFilterValue="status:open"
        onSubmit={onSubmit}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Clear filter" }))
    expect(getInput()).toHaveValue("")
    expect(getInput()).toHaveFocus()
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ raw: "" }), "clear")
    expect(screen.queryByRole("button", { name: "Clear filter" })).not.toBeInTheDocument()
  })

  it("hides the clear button with showClearButton false", () => {
    render(
      <Filter
        label="Filter tasks"
        providers={providers}
        initialFilterValue="status:open"
        showClearButton={false}
      />,
    )
    expect(screen.queryByRole("button", { name: "Clear filter" })).not.toBeInTheDocument()
  })

  it("renders a trailing visual", () => {
    render(<Filter label="Filter tasks" providers={providers} trailingVisual="12 results" />)
    expect(screen.getByText("12 results")).toBeInTheDocument()
  })

  it("supports a controlled value", async () => {
    const user = userEvent.setup()
    const Controlled = () => {
      const [value, setValue] = useState("status:open")
      return (
        <>
          <Filter
            label="Filter tasks"
            providers={providers}
            filterValue={value}
            onChange={setValue}
          />
          <output>{value}</output>
        </>
      )
    }
    render(<Controlled />)
    expect(getInput()).toHaveValue("status:open")
    await user.type(getInput(), " bug")
    expect(screen.getByRole("status")).toHaveTextContent("status:open bug")
  })

  it("calls onParse with the parsed query", async () => {
    const user = userEvent.setup()
    const onParse = vi.fn()
    render(<Filter label="Filter tasks" providers={providers} onParse={onParse} />)
    await user.type(getInput(), "a")
    expect(onParse).toHaveBeenLastCalledWith(expect.objectContaining({ raw: "a", text: "a" }))
  })

  it("uses a custom parser", () => {
    const customParser = vi.fn(parseFilterQuery)
    render(
      <Filter
        label="Filter tasks"
        providers={providers}
        initialFilterValue="x"
        customParser={customParser}
      />,
    )
    expect(customParser).toHaveBeenCalledWith("x", providers)
  })

  it("exposes an imperative ref", () => {
    const ref = createRef<FilterRef>()
    const onChange = vi.fn()
    render(<Filter ref={ref} label="Filter tasks" providers={providers} onChange={onChange} />)
    ref.current?.setValue("status:closed")
    ref.current?.focus()
    return waitFor(() => {
      expect(getInput()).toHaveValue("status:closed")
      expect(getInput()).toHaveFocus()
      expect(onChange).toHaveBeenCalledWith("status:closed")
    })
  })

  it("forwards inputRef and onKeyDown", async () => {
    const user = userEvent.setup()
    const inputRef = createRef<HTMLInputElement>()
    const onKeyDown = vi.fn()
    render(
      <Filter
        label="Filter tasks"
        providers={providers}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
      />,
    )
    expect(inputRef.current).toBe(getInput())
    await user.type(getInput(), "a")
    expect(onKeyDown).toHaveBeenCalled()
  })

  describe("advanced filter dialog", () => {
    it("edits qualifiers and applies them", async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn()
      render(
        <Filter
          label="Filter tasks"
          providers={providers}
          initialFilterValue="status:open owner:sam fix"
          onSubmit={onSubmit}
        />,
      )
      await user.click(screen.getByRole("button", { name: "Filter" }))
      const dialog = await screen.findByRole("dialog", { name: "Advanced filters" })
      expect(within(dialog).getAllByRole("listitem")).toHaveLength(2)
      expect(within(dialog).getByRole("combobox", { name: "Qualifier 1" })).toHaveTextContent(
        "Status",
      )
      expect(within(dialog).getByRole("textbox", { name: "Value 2" })).toHaveValue("sam")

      await user.click(within(dialog).getByRole("button", { name: "Remove filter 1" }))
      await user.clear(within(dialog).getByRole("textbox", { name: "Value 1" }))
      await user.type(within(dialog).getByRole("textbox", { name: "Value 1" }), "alex")
      await user.click(within(dialog).getByRole("button", { name: "Apply" }))

      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
      expect(getInput()).toHaveValue("owner:alex fix")
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ raw: "owner:alex fix" }),
        "dialog",
      )
    })

    it("adds a filter", async () => {
      const user = userEvent.setup()
      render(<Filter label="Filter tasks" providers={providers} />)
      await user.click(screen.getByRole("button", { name: "Filter" }))
      const dialog = await screen.findByRole("dialog")
      expect(within(dialog).getByText(/No filters applied/)).toBeInTheDocument()

      await user.click(within(dialog).getByRole("button", { name: "Add a filter" }))
      expect(within(dialog).getByRole("combobox", { name: "Qualifier 1" })).toBeInTheDocument()
      expect(within(dialog).getByRole("textbox", { name: "Value 1" })).toBeDisabled()
    })

    it("closes without changes on cancel", async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn()
      render(
        <Filter
          label="Filter tasks"
          providers={providers}
          initialFilterValue="status:open"
          onSubmit={onSubmit}
        />,
      )
      await user.click(screen.getByRole("button", { name: "Filter" }))
      const dialog = await screen.findByRole("dialog")
      await user.click(within(dialog).getByRole("button", { name: "Cancel" }))
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
      expect(getInput()).toHaveValue("status:open")
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })
})

describe("FilterRevert", () => {
  it("renders a link with href", () => {
    render(<FilterRevert href="/tasks" />)
    expect(
      screen.getByRole("link", { name: "Clear current search query and filters" }),
    ).toHaveAttribute("href", "/tasks")
  })

  it("renders a button with onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<FilterRevert onClick={onClick}>Reset filters</FilterRevert>)
    await user.click(screen.getByRole("button", { name: "Reset filters" }))
    expect(onClick).toHaveBeenCalled()
  })

  it("is available as Filter.Revert", () => {
    expect(Filter.Revert).toBe(FilterRevert)
  })
})
