import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { FileInput } from "./file-input.js"
import { formatFileSize } from "./index.js"

function Example(props: Partial<React.ComponentProps<typeof FileInput>>) {
  return (
    <FileInput multiple {...props}>
      <FileInput.Dropzone data-testid="dropzone">
        <p>Drag and drop files here</p>
        <FileInput.Trigger>Browse files</FileInput.Trigger>
      </FileInput.Dropzone>
      <FileInput.List aria-label="Files">
        <FileInput.Item>
          {({ file }) => (
            <>
              <span>{file.name}</span>
              <span>{formatFileSize(file.size)}</span>
              <FileInput.ItemRemove />
            </>
          )}
        </FileInput.Item>
      </FileInput.List>
    </FileInput>
  )
}

const report = new File(["report"], "report.pdf", { type: "application/pdf" })
const photo = new File(["photo"], "photo.png", { type: "image/png" })

function picker() {
  const input = document.querySelector<HTMLInputElement>('input[type="file"]')
  if (!input) throw new Error("No file input")
  return input
}

describe("FileInput", () => {
  it("lists chosen files, each with a remove button named for it", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const onValueChange = vi.fn()
    render(<Example onValueChange={onValueChange} />)

    expect(screen.getByRole("button", { name: "Browse files" })).toBeInTheDocument()
    await user.upload(picker(), [report, photo])

    expect(onValueChange).toHaveBeenCalledWith([report, photo], expect.anything())
    const list = screen.getByRole("list", { name: "Files" })
    expect(list).toHaveTextContent("report.pdf")
    expect(list).toHaveTextContent("photo.png")

    const remove = screen
      .getAllByRole("button")
      .find((button) => button.getAttribute("aria-label")?.includes("report.pdf"))
    expect(remove).toBeDefined()
    expect(remove?.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
    await user.click(remove!)
    await waitFor(() => expect(list).not.toHaveTextContent("report.pdf"))
    expect(list).toHaveTextContent("photo.png")
  })

  it("removes the focused file with Delete", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(<Example />)
    await user.upload(picker(), [report, photo])

    const items = screen.getAllByRole("listitem")
    items[0]?.focus()
    await user.keyboard("{Delete}")

    await waitFor(() =>
      expect(screen.getByRole("list", { name: "Files" })).not.toHaveTextContent("report.pdf"),
    )
  })

  it("rejects files that accept rules out", async () => {
    const user = userEvent.setup({ applyAccept: false, pointerEventsCheck: 0 })
    const onReject = vi.fn()
    render(<Example accept="image/*" onReject={onReject} />)

    await user.upload(picker(), [report, photo])

    expect(onReject).toHaveBeenCalledWith(
      [expect.objectContaining({ file: report, reasons: ["file-type"] })],
      expect.anything(),
    )
    expect(screen.getByRole("list", { name: "Files" })).not.toHaveTextContent("report.pdf")
  })

  it("merges a className with Kova's class on every styled part", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(<Example className="root" />)
    await user.upload(picker(), [report])

    for (const slot of [
      "file-input",
      "file-input-trigger",
      "file-input-dropzone",
      "file-input-list",
      "file-input-item",
      "file-input-item-remove",
    ]) {
      expect(document.querySelector(`[data-slot="${slot}"]`)?.className).toMatch(/\S/)
    }
    expect(document.querySelector('[data-slot="file-input"]')).toHaveClass("root")
  })
})
