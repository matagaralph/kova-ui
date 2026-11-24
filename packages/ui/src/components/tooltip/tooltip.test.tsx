import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Button } from "../button/index.js"
import { CopyTooltip, Tooltip } from "./index.js"

describe("Tooltip", () => {
  it("names an icon-only trigger and opens on focus", async () => {
    const user = userEvent.setup()
    render(
      <Tooltip>
        <Tooltip.Trigger render={<Button variant="secondary" uniform />}>
          <svg aria-hidden="true" />
        </Tooltip.Trigger>
        <Tooltip.Content>Archive</Tooltip.Content>
      </Tooltip>,
    )

    await user.tab()
    const trigger = screen.getByRole("button", { name: "Archive" })
    expect(trigger).toHaveFocus()
    await waitFor(() => expect(screen.getByRole("tooltip")).toHaveAttribute("data-open"))

    await user.keyboard("{Escape}")
    await waitFor(() =>
      expect(screen.getByRole("tooltip", { hidden: true })).not.toHaveAttribute("data-open"),
    )
  })

  it("describes a trigger that has its own name", () => {
    render(
      <Tooltip>
        <Tooltip.Trigger>Deploy</Tooltip.Trigger>
        <Tooltip.Content>Ships the main branch</Tooltip.Content>
      </Tooltip>,
    )

    expect(screen.getByRole("button", { name: "Deploy" })).toHaveAccessibleDescription(
      "Ships the main branch",
    )
  })

  it("writes its Kova props to the content", () => {
    render(
      <Tooltip defaultOpen>
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Content compact gutterSize="lg" maxWidth="none">
          Saved
        </Tooltip.Content>
      </Tooltip>,
    )

    const content = screen.getByRole("tooltip")
    expect(content).toHaveAttribute("data-compact")
    expect(content).toHaveAttribute("data-gutter-size", "lg")
    expect(content.style.maxWidth).toBe("none")
    expect(content.className).toMatch(/TooltipContent/)
  })
})

describe("CopyTooltip", () => {
  it("copies its value on press and says so", async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    render(<CopyTooltip copyValue="sk_live_123">sk_live_123</CopyTooltip>)

    const trigger = screen.getByRole("button", { name: "sk_live_123" })
    await user.click(trigger)

    expect(writeText).toHaveBeenCalledWith("sk_live_123")
    await waitFor(() => expect(screen.getByRole("tooltip")).toHaveTextContent("Copied!"))
    writeText.mockRestore()
  })

  it("offers to copy before it's pressed", async () => {
    const user = userEvent.setup()
    render(<CopyTooltip copyValue="abc">abc</CopyTooltip>)

    await user.tab()
    await waitFor(() => expect(screen.getByRole("tooltip")).toHaveTextContent("Copy"))
    expect(screen.getByRole("button", { name: "abc" })).toHaveAccessibleDescription("Copy")
  })
})
