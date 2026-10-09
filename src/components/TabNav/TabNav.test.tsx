// Ported from Primer React's TabNav tests.

import { render, screen, within } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import clsx from "clsx"
import type React from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import {
  Chart as GraphIcon,
  Chat as CommentDiscussionIcon,
  Code as CodeIcon,
  Comment as IssueOpenedIcon,
  Folder as ProjectIcon,
  Play as GitPullRequestIcon,
  ShieldLock as ShieldLockIcon,
} from "../Icon/index.js"
import { TabNav } from "./index.js"

const withExpectedConsoleError = (fn: () => void) => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {})
  try {
    fn()
  } finally {
    spy.mockRestore()
  }
}

const ReactRouterLikeLink = ({
  to,
  ...props
}: { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={to} {...props} />

const ResponsiveTabNav = ({
  selectedItemText = "Code",
  loadingCounters = false,
  displayExtraEl = false,
  className,
}: {
  selectedItemText?: string
  loadingCounters?: boolean
  displayExtraEl?: boolean
  className?: string
}) => {
  const items: { navigation: string; icon?: React.ReactElement; counter?: number }[] = [
    { navigation: "Code", icon: <CodeIcon /> },
    { navigation: "Issues", icon: <IssueOpenedIcon />, counter: 120 },
    { navigation: "Pull Requests", icon: <GitPullRequestIcon />, counter: 13 },
    { navigation: "Discussions", icon: <CommentDiscussionIcon />, counter: 5 },
    { navigation: "Actions", counter: 4 },
    { navigation: "Projects", icon: <ProjectIcon />, counter: 9 },
    { navigation: "Insights", icon: <GraphIcon /> },
    { navigation: "Settings", counter: 10 },
    { navigation: "Security", icon: <ShieldLockIcon /> },
  ]

  return (
    <div>
      <TabNav
        aria-label="Repository"
        className={clsx("foo", className)}
        loadingCounters={loadingCounters}
      >
        {items.map((item) => (
          <TabNav.Item
            key={item.navigation}
            leadingVisual={item.icon}
            aria-current={item.navigation === selectedItemText ? "page" : undefined}
            counter={item.counter}
          >
            {item.navigation}
          </TabNav.Item>
        ))}
      </TabNav>
      {displayExtraEl && <button type="button">Custom button</button>}
    </div>
  )
}

describe("TabNav", () => {
  it("renders an item with a custom className", () => {
    render(<TabNav.Item className="test-class">Hi</TabNav.Item>)
    expect(screen.getByRole("link", { name: "Hi" })).toHaveClass("test-class")
  })

  it("defaults href for native anchor items", () => {
    render(
      <TabNav aria-label="Repository">
        <TabNav.Item>Code</TabNav.Item>
      </TabNav>,
    )

    expect(screen.getByRole("link", { name: "Code" })).toHaveAttribute("href", "#")
  })

  it("does not default href for custom link components", () => {
    render(
      <TabNav aria-label="Repository">
        <TabNav.Item as={ReactRouterLikeLink} to="/issues">
          Issues
        </TabNav.Item>
      </TabNav>,
    )

    expect(screen.getByRole("link", { name: "Issues" })).toHaveAttribute("href", "/issues")
  })

  it("renders aria-current attribute to be pages when an item is selected", () => {
    const { getByRole } = render(<ResponsiveTabNav />)
    const selectedNavLink = getByRole("link", { name: "Code" })
    expect(selectedNavLink.getAttribute("aria-current")).toBe("page")
  })

  it("renders aria-label attribute correctly", () => {
    const { container, getByRole } = render(<ResponsiveTabNav />)
    expect(container.getElementsByTagName("nav").length).toEqual(1)
    const nav = getByRole("navigation")
    expect(nav.getAttribute("aria-label")).toBe("Repository")
  })

  it("renders icons correctly", () => {
    const { getByRole } = render(<ResponsiveTabNav />)
    const nav = getByRole("navigation")
    const list = within(nav).getByRole("list")
    expect(list.getElementsByTagName("svg").length).toEqual(7)
  })

  it("hides icons below the medium breakpoint by default", () => {
    render(<ResponsiveTabNav />)
    expect(screen.getByRole("navigation")).toHaveAttribute("data-hide-icons-breakpoint", "medium")
  })

  it("supports customizing when icons are hidden", () => {
    render(
      <TabNav aria-label="Repository" hideIconsBreakpoint="medium">
        <TabNav.Item>Code</TabNav.Item>
      </TabNav>,
    )
    expect(screen.getByRole("navigation")).toHaveAttribute("data-hide-icons-breakpoint", "medium")
  })

  it("supports always showing icons", () => {
    render(
      <TabNav aria-label="Repository" hideIconsBreakpoint={null}>
        <TabNav.Item>Code</TabNav.Item>
      </TabNav>,
    )
    expect(screen.getByRole("navigation")).not.toHaveAttribute("data-hide-icons-breakpoint")
  })

  it("fires onSelect on click", async () => {
    const onSelect = vi.fn()
    const { getByRole } = render(
      <TabNav aria-label="Test Navigation">
        <TabNav.Item onSelect={onSelect}>Item 1</TabNav.Item>
        <TabNav.Item onSelect={onSelect}>Item 2</TabNav.Item>
        <TabNav.Item onSelect={onSelect}>Item 3</TabNav.Item>
      </TabNav>,
    )
    const item = getByRole("link", { name: "Item 1" })
    const user = userEvent.setup()
    await user.click(item)
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it("fires onSelect on keypress", async () => {
    const onSelect = vi.fn()
    const { getByRole } = render(
      <TabNav aria-label="Test Navigation">
        <TabNav.Item onSelect={onSelect}>Item 1</TabNav.Item>
        <TabNav.Item onSelect={onSelect}>Item 2</TabNav.Item>
        <TabNav.Item aria-current="page" onSelect={onSelect}>
          Item 3
        </TabNav.Item>
      </TabNav>,
    )
    const item = getByRole("link", { name: "Item 1" })
    const user = userEvent.setup()
    await user.tab() // tab into the story, this should focus on the first link
    expect(item).toEqual(document.activeElement)
    await user.keyboard("{Enter}")
    // Enter keypress fires both click and keypress events
    expect(onSelect).toHaveBeenCalledTimes(2)
    await user.keyboard(" ") // space
    expect(onSelect).toHaveBeenCalledTimes(3)
  })

  it("respects counter prop", () => {
    const { getByRole } = render(<ResponsiveTabNav />)
    const item = getByRole("link", { name: "Issues (120)" })
    const counter = item.getElementsByTagName("span")[3]
    expect(counter.textContent).toBe("120")
    expect(counter).toHaveAttribute("aria-hidden", "true")
  })

  it("adds className prop to base wrapper classes", () => {
    const { getByRole } = render(<ResponsiveTabNav />)
    const nav = getByRole("navigation")
    expect(nav.className).toContain("foo")
    expect(nav.className).toContain("TabNav")
  })

  it("renders the content of visually hidden span properly for screen readers", () => {
    const { getByRole } = render(<ResponsiveTabNav />)
    const item = getByRole("link", { name: "Issues (120)" })
    const counter = item.getElementsByTagName("span")[4]
    // non breaking space unified code
    expect(counter.textContent).toBe("\u00A0(120)")
  })

  it("respects loadingCounters prop", async () => {
    const { getByRole } = render(<ResponsiveTabNav loadingCounters />)
    const item = getByRole("link", { name: "Actions", hidden: true })
    const loadingCounter = item.getElementsByTagName("span")[2]
    expect(loadingCounter.className).toContain("LoadingCounter")
    expect(loadingCounter.textContent).toBe("")
  })

  it("renders a visually hidden h2 heading for screen readers when aria-label is present", () => {
    const { getByRole } = render(<ResponsiveTabNav />)
    const heading = getByRole("heading", { name: "Repository navigation" })
    // check if heading is h2 tag
    expect(heading.tagName).toBe("H2")
    expect(heading.textContent).toBe("Repository navigation")
  })

  it("throws an error when there are multiple items that have aria-current", () => {
    withExpectedConsoleError(() => {
      expect(() => {
        render(
          <TabNav aria-label="Test Navigation">
            <TabNav.Item aria-current="page">Item 1</TabNav.Item>
            <TabNav.Item aria-current="page">Item 2</TabNav.Item>
          </TabNav>,
        )
      }).toThrow("Only one current element is allowed")
    })
  })

  it("should support icons passed in as an element", () => {
    render(
      <TabNav aria-label="Repository">
        <TabNav.Item aria-current="page" leadingVisual={<CodeIcon aria-label="Page one icon" />}>
          Page one
        </TabNav.Item>
        <TabNav.Item leadingVisual={<IssueOpenedIcon aria-label="Page two icon" />}>
          Page two
        </TabNav.Item>
        <TabNav.Item leadingVisual={<GitPullRequestIcon aria-label="Page three icon" />}>
          Page three
        </TabNav.Item>
      </TabNav>,
    )

    expect(screen.getByLabelText("Page one icon")).toBeInTheDocument()
    expect(screen.getByLabelText("Page two icon")).toBeInTheDocument()
    expect(screen.getByLabelText("Page three icon")).toBeInTheDocument()
  })

  it("adds className prop to item classes", () => {
    render(
      <TabNav aria-label="Repository">
        <TabNav.Item className="custom-class">Item 1</TabNav.Item>
      </TabNav>,
    )
    const item = screen.getByRole("link", { name: "Item 1" })
    expect(item).toHaveClass("custom-class")
    expect(item.className).toContain("Tab")
  })

  it("supports the deprecated `icon` prop", () => {
    render(
      <TabNav aria-label="Test">
        <TabNav.Item icon={<CodeIcon data-testid="jsx-element" />}>as jsx element</TabNav.Item>
        <TabNav.Item icon={(props) => <CodeIcon {...props} data-testid="functional-component" />}>
          as functional component
        </TabNav.Item>
      </TabNav>,
    )

    expect(screen.getByTestId("jsx-element")).toBeInTheDocument()
    expect(screen.getByTestId("functional-component")).toBeInTheDocument()
  })

  it("extracts only direct text content for data-content attribute, ignoring nested elements", () => {
    render(
      <TabNav aria-label="Test">
        <TabNav.Item>
          Tab Label
          <span style={{ position: "absolute" }}>Hidden element</span>
        </TabNav.Item>
      </TabNav>,
    )

    const item = screen.getByRole("link", { name: /Tab Label/ })
    const textSpan = item.querySelector('[data-component="text"]')
    // data-content should only have the content of the Text and not the nested span
    expect(textSpan).toHaveAttribute("data-content", "Tab Label")
  })

  it("handles string children correctly for data-content attribute", () => {
    render(
      <TabNav aria-label="Test">
        <TabNav.Item>Simple Text</TabNav.Item>
      </TabNav>,
    )

    const item = screen.getByRole("link", { name: "Simple Text" })
    const textSpan = item.querySelector('[data-component="text"]')
    expect(textSpan).toHaveAttribute("data-content", "Simple Text")
  })
})

describe("Keyboard Navigation", () => {
  it("should move focus to the next/previous item on the list with the tab key", async () => {
    const { getByRole } = render(
      <TabNav aria-label="Repository">
        <TabNav.Item aria-current="page">Code</TabNav.Item>
        <TabNav.Item counter={120}>Issues</TabNav.Item>
      </TabNav>,
    )
    const item = getByRole("link", { name: "Code" })
    const nextItem = getByRole("link", { name: "Issues (120)" })
    const user = userEvent.setup()
    await user.tab() // tab into the story, this should focus on the first link
    expect(item).toEqual(document.activeElement) // check if the first item is focused
    await user.tab()
    // focus should be on the next item
    expect(nextItem).toHaveFocus()
  })
})
