// Ported from Primer React's Dialog tests.

import { fireEvent, render, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { Button } from "../Button/index.js"
import classes from "./Dialog.module.css"
import { Dialog } from "./index.js"

describe("Dialog", () => {
  it("renders with the Dialog class and a custom className", () => {
    const { getByRole } = render(
      <Dialog onClose={() => {}} className="test-class">
        Content
      </Dialog>,
    )
    expect(getByRole("dialog")).toHaveClass(classes.Dialog)
    expect(getByRole("dialog")).toHaveClass("test-class")
  })
  it('renders with role "dialog" by default', () => {
    const { getByRole } = render(<Dialog onClose={() => {}}>Pay attention to me</Dialog>)

    expect(getByRole("dialog")).toBeInTheDocument()
  })

  it('renders with role "alertdialog" when passed', () => {
    const { getByRole } = render(
      <Dialog role="alertdialog" onClose={() => {}}>
        Definitely pay attention to me
      </Dialog>,
    )

    expect(getByRole("alertdialog")).toBeInTheDocument()
  })
  it("automatically focuses the footer button when `autoFocus` is true", async () => {
    const { getByRole } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[{ buttonType: "primary", content: "Footer button", autoFocus: true }]}
      >
        Pay attention to me
      </Dialog>,
    )

    await waitFor(() => expect(getByRole("button", { name: "Footer button" })).toHaveFocus())
  })

  it("sets data-has-footer when footerButtons are provided", () => {
    const { getByRole } = render(
      <Dialog onClose={() => {}} footerButtons={[{ buttonType: "primary", content: "OK" }]}>
        Content
      </Dialog>,
    )
    expect(getByRole("dialog")).toHaveAttribute("data-has-footer", "")
  })

  it("does not set data-has-footer when no footer is rendered", () => {
    const { getByRole } = render(
      <Dialog onClose={() => {}} renderFooter={() => null}>
        Content
      </Dialog>,
    )
    expect(getByRole("dialog")).not.toHaveAttribute("data-has-footer")
  })

  it("renders data-component attribute", () => {
    const { getByRole } = render(<Dialog onClose={() => {}}>Content</Dialog>)
    expect(getByRole("dialog")).toHaveAttribute("data-component", "Dialog")
  })

  it("allows overriding the root data-component attribute", () => {
    const { getByRole } = render(
      <Dialog data-component="ConfirmationDialog" onClose={() => {}}>
        Content
      </Dialog>,
    )
    expect(getByRole("dialog")).toHaveAttribute("data-component", "ConfirmationDialog")
  })

  it("renders data-component hooks for Dialog subcomponents", () => {
    const { getByRole } = render(
      <Dialog
        onClose={() => {}}
        title="Title"
        subtitle="Subtitle"
        renderHeader={(props) => (
          <Dialog.Header>
            <Dialog.Title id={props.dialogLabelId}>{props.title}</Dialog.Title>
            <Dialog.Subtitle id={props.dialogDescriptionId}>{props.subtitle}</Dialog.Subtitle>
            <Dialog.CloseButton onClose={() => {}} />
          </Dialog.Header>
        )}
        renderBody={() => <Dialog.Body>Body</Dialog.Body>}
        renderFooter={() => <Dialog.Footer>Footer</Dialog.Footer>}
      />,
    )

    const dialog = getByRole("dialog")

    expect(dialog.querySelector('[data-component="Dialog.Header"]')).toBeInTheDocument()
    expect(dialog.querySelector('[data-component="Dialog.Title"]')).toBeInTheDocument()
    expect(dialog.querySelector('[data-component="Dialog.Subtitle"]')).toBeInTheDocument()
    expect(dialog.querySelector('[data-component="Dialog.CloseButton"]')).toBeInTheDocument()
    expect(dialog.querySelector('[data-component="Dialog.Body"]')).toBeInTheDocument()
    expect(dialog.querySelector('[data-component="Dialog.Footer"]')).toBeInTheDocument()
  })

  it("adds a Dialog-scoped data-component hook for footer buttons (and not for body buttons)", () => {
    const { getByRole, getByText } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[
          { buttonType: "primary", content: "Submit" },
          { buttonType: "default", content: "Cancel" },
        ]}
      >
        <Button color="secondary">Body button</Button>
      </Dialog>,
    )

    const dialog = getByRole("dialog")

    // ensure footer buttons have the data-component hook
    const footerButtonHooks = dialog.querySelectorAll('[data-component="Dialog.FooterButton"]')
    expect(footerButtonHooks).toHaveLength(2)

    // ensure we're targeting the correct buttons
    expect(footerButtonHooks[0]).toHaveTextContent("Submit")
    expect(footerButtonHooks[1]).toHaveTextContent("Cancel")

    // ensure we're not targeting other buttons
    const bodyButton = getByText("Body button").closest("button")
    expect(bodyButton).toBeTruthy()
    expect(bodyButton?.closest('[data-component="Dialog.FooterButton"]')).toBeNull()
  })

  it("calls `onClose` when clicking the close button", async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { getByLabelText } = render(<Dialog onClose={onClose}>Pay attention to me</Dialog>)

    expect(onClose).not.toHaveBeenCalled()

    await user.click(getByLabelText("Close"))

    expect(onClose).toHaveBeenCalledWith("close-button")
    expect(onClose).toHaveBeenCalledTimes(1) // Ensure it's not called with a backdrop gesture as well
  })

  it("calls `onClose` when clicking the backdrop", async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { getByRole } = render(<Dialog onClose={onClose}>Pay attention to me</Dialog>)

    expect(onClose).not.toHaveBeenCalled()

    const dialog = getByRole("dialog")
    const backdrop = dialog.parentElement!
    await user.click(backdrop)

    expect(onClose).toHaveBeenCalledWith("escape")
  })

  it("does not call `onClose` when click was not originated from backdrop", async () => {
    const onClose = vi.fn()

    const { getByRole } = render(<Dialog onClose={onClose}>Pay attention to me</Dialog>)

    expect(onClose).not.toHaveBeenCalled()

    const dialog = getByRole("dialog")
    const backdrop = dialog.parentElement!

    fireEvent.mouseDown(dialog)
    fireEvent.mouseUp(backdrop)
    // trigger the click on the backdrop, mouseUp doesn't do it for us
    fireEvent.click(backdrop)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls `onClose` when keying "Escape"', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Dialog onClose={onClose}>Pay attention to me</Dialog>)

    expect(onClose).not.toHaveBeenCalled()

    await user.keyboard("{Escape}")

    expect(onClose).toHaveBeenCalledWith("escape")
  })

  it('calls `onClose` with a single "Escape" keypress when multiple dialogs can be opened', async () => {
    const user = userEvent.setup()

    function ButtonWithDialog({ label, onClose }: { label: string; onClose: () => void }) {
      const [isOpen, setIsOpen] = React.useState(false)
      const buttonRef = React.useRef<HTMLButtonElement>(null)
      return (
        <>
          <Button color="primary" ref={buttonRef} onClick={() => setIsOpen(true)}>
            {label}
          </Button>
          {isOpen && (
            <Dialog
              title={label}
              onClose={() => {
                onClose()
                setIsOpen(false)
              }}
              returnFocusRef={buttonRef}
            >
              body
            </Dialog>
          )}
        </>
      )
    }

    const onCloseFirst = vi.fn()
    const onCloseSecond = vi.fn()
    const { getByText } = render(
      <>
        <ButtonWithDialog label="Dialog 1" onClose={onCloseFirst} />
        <ButtonWithDialog label="Dialog 2" onClose={onCloseSecond} />
      </>,
    )

    await user.click(getByText("Dialog 1"))
    await user.keyboard("{Escape}")

    expect(onCloseFirst).toHaveBeenCalled()
    expect(onCloseSecond).not.toHaveBeenCalled()
  })

  it('changes the <body> style for `overflow` if it is not set to "hidden"', () => {
    document.body.style.overflow = "scroll"

    const { container } = render(<Dialog onClose={() => {}}>Pay attention to me</Dialog>)

    expect(container.ownerDocument.body).toHaveStyle("overflow: hidden")
  })

  it('does not attempt to change the <body> style for `overflow` if it is already set to "hidden"', () => {
    document.body.style.overflow = "hidden"

    const { container } = render(<Dialog onClose={() => {}}>Pay attention to me</Dialog>)

    expect(container.ownerDocument.body).toHaveStyle("overflow: hidden")
  })

  it('renders with data-position-regular="left" when position="left"', () => {
    const { getByRole } = render(<Dialog onClose={() => {}} position="left" />)
    expect(getByRole("dialog")).toHaveAttribute("data-position-regular", "left")
  })

  it('renders with data-position-regular="right" when position="right"', () => {
    const { getByRole } = render(<Dialog onClose={() => {}} position="right" />)
    expect(getByRole("dialog")).toHaveAttribute("data-position-regular", "right")
  })

  it('renders with data-position-narrow="fullscreen" when narrow position is fullscreen', () => {
    const { getByRole } = render(<Dialog onClose={() => {}} position={{ narrow: "fullscreen" }} />)
    expect(getByRole("dialog")).toHaveAttribute("data-position-narrow", "fullscreen")
  })

  it('renders with data-position-narrow="bottom" when narrow position is bottom and data-position-regular="center" when regular is center', () => {
    const { getByRole } = render(
      <Dialog onClose={() => {}} position={{ narrow: "bottom", regular: "center" }} />,
    )
    expect(getByRole("dialog")).toHaveAttribute("data-position-narrow", "bottom")
    expect(getByRole("dialog")).toHaveAttribute("data-position-regular", "center")
  })

  describe("align prop", () => {
    it('sets data-align="top" on both dialog and backdrop', () => {
      const { getByRole } = render(<Dialog onClose={() => {}} align="top" />)
      const dialog = getByRole("dialog")
      expect(dialog).toHaveAttribute("data-align", "top")
      expect(dialog.parentElement).toHaveAttribute("data-align", "top")
    })

    it('sets data-align="bottom" when align is bottom', () => {
      const { getByRole } = render(<Dialog onClose={() => {}} align="bottom" />)
      expect(getByRole("dialog")).toHaveAttribute("data-align", "bottom")
    })

    it('sets data-align="center" when align is center', () => {
      const { getByRole } = render(<Dialog onClose={() => {}} align="center" />)
      expect(getByRole("dialog")).toHaveAttribute("data-align", "center")
    })

    it("omits data-align when align is not provided", () => {
      const { getByRole } = render(<Dialog onClose={() => {}} />)
      expect(getByRole("dialog")).not.toHaveAttribute("data-align")
    })

    it("emits data-align attribute even when position is non-center", () => {
      const { getByRole } = render(<Dialog onClose={() => {}} position="left" align="top" />)
      const dialog = getByRole("dialog")
      expect(dialog).toHaveAttribute("data-position-regular", "left")
      expect(dialog).toHaveAttribute("data-align", "top")
    })
  })

  it("automatically returns focus to the trigger element when the dialog closes", async () => {
    const Fixture = () => {
      const [isOpen, setIsOpen] = React.useState(false)

      return (
        <>
          <Button color="primary" onClick={() => setIsOpen(true)}>
            Open dialog
          </Button>
          {isOpen && (
            <Dialog title="title" onClose={() => setIsOpen(false)}>
              body
            </Dialog>
          )}
        </>
      )
    }

    const { getByRole, getByLabelText, queryByRole } = render(<Fixture />)
    const triggerButton = getByRole("button", { name: "Open dialog" })

    const user = userEvent.setup()
    await user.tab() // tab into the story, this should focus on the first button
    expect(triggerButton).toHaveFocus()

    await user.click(triggerButton)
    await waitFor(() => expect(getByRole("dialog")).toBeInTheDocument())

    await user.click(getByLabelText("Close"))

    expect(queryByRole("dialog")).toBeNull()
    expect(triggerButton).toHaveFocus()
  })

  it("returns focus to the element passed in returnFocusRef when the dialog closes", async () => {
    const Fixture = () => {
      const [isOpen, setIsOpen] = React.useState(false)
      const triggerRef = React.useRef<HTMLButtonElement>(null)

      return (
        <>
          <Button color="primary" onClick={() => setIsOpen(true)}>
            Show dialog (button 1)
          </Button>
          <Button color="primary" ref={triggerRef}>
            return focus to (button 2)
          </Button>

          {isOpen && (
            <Dialog title="title" onClose={() => setIsOpen(false)} returnFocusRef={triggerRef}>
              body
            </Dialog>
          )}
        </>
      )
    }

    const { getByRole, getByLabelText } = render(<Fixture />)
    const triggerButton = getByRole("button", { name: "Show dialog (button 1)" })

    const user = userEvent.setup()
    await user.tab() // tab into the story, this should focus on the first button
    expect(triggerButton).toHaveFocus()

    await user.click(triggerButton)
    await user.click(getByLabelText("Close"))

    expect(getByRole("button", { name: "return focus to (button 2)" })).toHaveFocus()
  })

  it("should support `className` on the Dialog element", async () => {
    const Fixture = () => {
      // Starts closed: an open modal hides the content behind it from assistive technology
      const [isOpen, setIsOpen] = React.useState(false)
      const triggerRef = React.useRef<HTMLButtonElement>(null)

      return (
        <>
          <Button color="primary" onClick={() => setIsOpen(true)}>
            Show dialog
          </Button>
          {isOpen && (
            <Dialog
              title="title"
              onClose={() => setIsOpen(false)}
              returnFocusRef={triggerRef}
              className="custom-class"
            >
              body
            </Dialog>
          )}
        </>
      )
    }

    const user = userEvent.setup()

    const component = render(<Fixture />)
    const triggerButton = component.getByRole("button", { name: "Show dialog" })
    await user.click(triggerButton)
    expect(component.getByRole("dialog")).toHaveClass("custom-class")
    component.unmount()
  })
})

it("automatically focuses the element that is specified as initialFocusRef", async () => {
  const initialFocusRef = React.createRef<HTMLAnchorElement>()
  const { getByRole } = render(
    <Dialog
      initialFocusRef={initialFocusRef}
      onClose={() => {}}
      title="New issue"
      renderBody={() => (
        <a ref={initialFocusRef} href="https://example.com">
          Item 1
        </a>
      )}
    ></Dialog>,
  )

  // Base UI moves focus into the dialog on the next frame
  await waitFor(() => expect(getByRole("link")).toHaveFocus())
})

describe("Footer button loading states", () => {
  it("applies loading state to footer buttons", () => {
    const { getByRole } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[
          { buttonType: "primary", content: "Submit", loading: true },
          { buttonType: "default", content: "Cancel", loading: false },
        ]}
      >
        Dialog content
      </Dialog>,
    )

    const submitButton = getByRole("button", { name: "Submit" })
    const cancelButton = getByRole("button", { name: "Cancel" })

    expect(submitButton).toHaveAttribute("data-loading")
    expect(cancelButton).not.toHaveAttribute("data-loading")
  })

  it("shows loading spinner in button when loading", () => {
    const { getByRole, baseElement } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[{ buttonType: "primary", content: "Processing...", loading: true }]}
      >
        Dialog content
      </Dialog>,
    )

    const button = getByRole("button", { name: "Processing..." })
    const spinner = baseElement.querySelector('[class*="LoadingIndicator"]') as HTMLElement

    expect(spinner).toBeInTheDocument()
    expect(button.contains(spinner)).toBe(true)
  })

  it("disables button clicks when loading", async () => {
    const mockOnClick = vi.fn()
    const { getByRole } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[
          { buttonType: "primary", content: "Submit", loading: true, onClick: mockOnClick },
        ]}
      >
        Dialog content
      </Dialog>,
    )

    const button = getByRole("button", { name: "Submit" })

    fireEvent.click(button)

    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it("maintains focus management when button is loading", async () => {
    const { getByRole } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[
          { buttonType: "default", content: "Cancel", autoFocus: true },
          { buttonType: "primary", content: "Submit", loading: true },
        ]}
      >
        Dialog content
      </Dialog>,
    )

    const cancelButton = getByRole("button", { name: "Cancel" })

    await waitFor(() => expect(cancelButton).toHaveFocus())
  })

  it("handles multiple loading buttons correctly", () => {
    const { getByRole } = render(
      <Dialog
        onClose={() => {}}
        footerButtons={[
          { buttonType: "default", content: "Save Draft", loading: true },
          { buttonType: "primary", content: "Publish", loading: true },
          { buttonType: "danger", content: "Delete", loading: false },
        ]}
      >
        Dialog content
      </Dialog>,
    )

    const saveDraftButton = getByRole("button", { name: "Save Draft" })
    const publishButton = getByRole("button", { name: "Publish" })
    const deleteButton = getByRole("button", { name: "Delete" })

    expect(saveDraftButton).toHaveAttribute("data-loading")
    expect(publishButton).toHaveAttribute("data-loading")
    expect(deleteButton).not.toHaveAttribute("data-loading")
  })

  describe("scroll disable behavior", () => {
    it("sets data-dialog-scroll-disabled on body when dialog mounts", () => {
      const { unmount } = render(<Dialog onClose={() => {}}>Dialog content</Dialog>)

      expect(document.body.hasAttribute("data-dialog-scroll-disabled")).toBe(true)

      unmount()

      expect(document.body.hasAttribute("data-dialog-scroll-disabled")).toBe(false)
    })

    it("handles multiple dialogs with ref counting", () => {
      const { unmount: unmount1 } = render(<Dialog onClose={() => {}}>Dialog 1</Dialog>)

      expect(document.body.hasAttribute("data-dialog-scroll-disabled")).toBe(true)

      const { unmount: unmount2 } = render(<Dialog onClose={() => {}}>Dialog 2</Dialog>)

      expect(document.body.hasAttribute("data-dialog-scroll-disabled")).toBe(true)

      // Unmount first dialog - attribute should still be present
      unmount1()
      expect(document.body.hasAttribute("data-dialog-scroll-disabled")).toBe(true)

      // Unmount second dialog - attribute should be removed
      unmount2()
      expect(document.body.hasAttribute("data-dialog-scroll-disabled")).toBe(false)
    })
  })

  describe("width prop", () => {
    it("sets data-width for named sizes", () => {
      const { getByRole } = render(
        <Dialog onClose={() => {}} width="small">
          Content
        </Dialog>,
      )
      const dialog = getByRole("dialog")
      expect(dialog).toHaveAttribute("data-width", "small")
      expect(dialog.style.width).toBe("")
    })

    it("sets an inline width for custom width values", () => {
      const { getByRole } = render(
        <Dialog onClose={() => {}} width="400px">
          Content
        </Dialog>,
      )
      const dialog = getByRole("dialog")
      expect(dialog).not.toHaveAttribute("data-width")
      expect(dialog.style.width).toBe("400px")
    })

    it("sets an inline width for numeric width values", () => {
      const { getByRole } = render(
        <Dialog onClose={() => {}} width={400}>
          Content
        </Dialog>,
      )
      const dialog = getByRole("dialog")
      expect(dialog).not.toHaveAttribute("data-width")
      expect(dialog.style.width).toBe("400px")
    })
  })
})
