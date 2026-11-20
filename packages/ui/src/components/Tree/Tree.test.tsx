import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import type { TreeItemData } from "./index.js"
import { Tree } from "./Tree.js"

const items: TreeItemData[] = [
  {
    value: "frontend",
    label: "Frontend",
    children: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
    ],
  },
  { value: "readme", label: "README.md" },
]

function Composed(props: Partial<React.ComponentProps<typeof Tree>>) {
  return (
    <Tree aria-label="Stack" {...props}>
      <Tree.Item value="frontend">
        <Tree.ItemLabel>
          <Tree.ItemIndicator data-testid="indicator" />
          Frontend
        </Tree.ItemLabel>
        <Tree.Group>
          <Tree.Item value="react">
            <Tree.ItemLabel>React</Tree.ItemLabel>
          </Tree.Item>
        </Tree.Group>
      </Tree.Item>
      <Tree.Item value="readme">
        <Tree.ItemLabel>README.md</Tree.ItemLabel>
      </Tree.Item>
    </Tree>
  )
}

describe("Tree", () => {
  it("is a named tree of items with their levels", () => {
    render(<Composed defaultExpanded={["frontend"]} />)

    expect(screen.getByRole("tree", { name: "Stack" })).toBeInTheDocument()
    const branch = screen.getByRole("treeitem", { name: /Frontend/ })
    expect(branch).toHaveAttribute("aria-expanded", "true")
    expect(branch).toHaveAttribute("aria-level", "1")
    expect(screen.getByRole("treeitem", { name: "React" })).toHaveAttribute("aria-level", "2")
  })

  it("draws a hidden chevron in the indicator and marks it expanded", async () => {
    const user = userEvent.setup()
    render(<Composed />)

    const indicator = screen.getByTestId("indicator")
    expect(indicator.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
    expect(indicator).not.toHaveAttribute("data-expanded")

    await user.click(screen.getByRole("treeitem", { name: /Frontend/ }))
    expect(indicator).toHaveAttribute("data-expanded")
  })

  it("expands with Right, enters the branch, and selects with Enter", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Composed onValueChange={onValueChange} />)

    await user.tab()
    expect(screen.getByRole("treeitem", { name: /Frontend/ })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("treeitem", { name: /Frontend/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("treeitem", { name: "React" })).toHaveFocus()
    await user.keyboard("{Enter}")

    expect(onValueChange).toHaveBeenCalledWith("react", expect.anything())
    expect(screen.getByRole("treeitem", { name: "React" })).toHaveAttribute("aria-selected", "true")
  })

  it("renders items as data with Kova's parts when it has no children", async () => {
    const user = userEvent.setup()
    render(<Tree aria-label="Stack" items={items} />)

    const branch = screen.getByRole("treeitem", { name: "Frontend" })
    expect(branch.querySelector('[data-slot="tree-indicator"] svg')).toBeInTheDocument()
    await user.click(branch)
    expect(await screen.findByRole("treeitem", { name: "Vue" })).toBeInTheDocument()
  })

  it("renders file paths with folders first", () => {
    render(<Tree aria-label="Project" paths={["package.json", "src/index.ts"]} />)

    const top = screen.getAllByRole("treeitem").map((item) => item.getAttribute("aria-level"))
    expect(top).toEqual(["1", "1"])
    expect(screen.getAllByRole("treeitem")[0]).toHaveAccessibleName("src")
  })

  it("checks a branch and everything in it with Space", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Tree
        aria-label="Stack"
        mode="none"
        checkable
        items={items}
        onCheckedChange={onCheckedChange}
      >
        {items.map((item) => (
          <Tree.Item key={item.value} value={item.value}>
            <Tree.ItemLabel>
              <Tree.ItemCheckbox data-testid={`check-${item.value}`} />
              {item.label}
            </Tree.ItemLabel>
          </Tree.Item>
        ))}
      </Tree>,
    )

    await user.tab()
    await user.keyboard(" ")

    expect(onCheckedChange).toHaveBeenCalledWith(["react", "vue"], expect.anything())
    await waitFor(() =>
      expect(screen.getByTestId("check-frontend")).toHaveAttribute("data-checked"),
    )
    expect(screen.getByTestId("check-frontend").querySelectorAll("svg")).toHaveLength(2)
  })

  it("merges a className with Kova's class on every part", () => {
    render(<Composed className="root" defaultExpanded={["frontend"]} />)

    for (const slot of ["tree", "tree-item", "tree-label", "tree-indicator", "tree-group"]) {
      expect(document.querySelector(`[data-slot="${slot}"]`)?.className).toMatch(/\S/)
    }
    expect(screen.getByRole("tree")).toHaveClass("root")
  })
})
