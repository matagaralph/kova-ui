import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { ComponentProps } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { Pagination } from "./Pagination.js"

function Example(props: Partial<ComponentProps<typeof Pagination>>) {
  return (
    <Pagination aria-label="Results" total={120} pageSize={10} {...props}>
      <Pagination.Range />
      <Pagination.List>
        {({ items }) => (
          <>
            <Pagination.Item>
              <Pagination.Previous />
            </Pagination.Item>
            {items.map((item) => (
              <Pagination.Item key={item}>
                {typeof item === "number" ? (
                  <Pagination.Link page={item} />
                ) : (
                  <Pagination.Ellipsis />
                )}
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next />
            </Pagination.Item>
          </>
        )}
      </Pagination.List>
    </Pagination>
  )
}

describe("Pagination", () => {
  it("is a named navigation landmark with named pages and steps", () => {
    render(<Example />)

    expect(screen.getByRole("navigation", { name: "Results" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("button", { name: "Previous page" })).toHaveAttribute(
      "aria-disabled",
      "true",
    )
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument()
  })

  it("shows two pages on each side of the current one by default", () => {
    render(<Example defaultPage={6} />)

    for (const page of [1, 4, 5, 6, 7, 8, 12]) {
      expect(screen.getByRole("button", { name: `Page ${page}` })).toBeInTheDocument()
    }
    expect(screen.queryByRole("button", { name: "Page 3" })).not.toBeInTheDocument()
  })

  it("pages with Next and updates the range", async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Example onPageChange={onPageChange} />)

    expect(screen.getByText("1‒10 of 120")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Next page" }))

    expect(onPageChange).toHaveBeenCalledWith(2, expect.objectContaining({ reason: "next-press" }))
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("data-current")
    expect(screen.getByText("11‒20 of 120")).toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveTextContent("Showing 11 through 20 of 120")
  })

  it("keeps the range on the page when a change is canceled", async () => {
    const user = userEvent.setup()
    render(<Example onPageChange={(_page, details) => details.cancel()} />)

    await user.click(screen.getByRole("button", { name: "Page 2" }))
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByText("1‒10 of 120")).toBeInTheDocument()
  })

  it("follows a controlled page", () => {
    render(<Example page={12} />)

    expect(screen.getByText("111‒120 of 120")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next page" })).toHaveAttribute("data-disabled")
  })

  it("writes which viewports hide the page links", () => {
    const { rerender } = render(<Example />)
    const nav = screen.getByRole("navigation", { name: "Results" })
    expect(nav).toHaveAttribute("data-hide-pages", "narrow")

    rerender(<Example showPages />)
    expect(nav).not.toHaveAttribute("data-hide-pages")

    rerender(<Example showPages={false} />)
    expect(nav).toHaveAttribute("data-hide-pages", "narrow regular wide")
  })

  it("renders links with getHref", () => {
    render(<Example getHref={(page) => `?page=${page}`} />)

    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute("href", "?page=2")
  })
})
