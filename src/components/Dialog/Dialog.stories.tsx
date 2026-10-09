import { type Meta } from "@storybook/react-vite"
import { useCallback, useRef, useState } from "react"
import { Button } from "../Button/index.js"
import { Input } from "../Input/index.js"
import { Dialog, type DialogHeaderProps, type DialogProps } from "./index.js"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Dialog>

export default meta

const lipsum = (
  <>
    <p className="mb-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin mauris maximus
      elit sagittis, nec lobortis ligula elementum. Nam iaculis, urna nec lobortis posuere, eros
      urna venenatis eros, vel accumsan turpis nunc vitae enim. Maecenas et lorem lectus. Vivamus
      iaculis tortor eget ante placerat, nec posuere nisl tincidunt.
    </p>
    <p className="mb-3">
      Curabitur scelerisque bibendum faucibus. Duis rhoncus nunc est, at pharetra eros tristique a.
      Nam sodales turpis lectus, quis faucibus felis fermentum in. Curabitur vel velit vel eros
      laoreet pharetra. Aenean in facilisis sapien, eu porttitor ex.
    </p>
    <p>
      Sed fringilla est ac urna aliquet, eget condimentum felis vulputate. Sed sagittis eros non
      mauris sodales molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia curae.
    </p>
  </>
)

const Trigger = (props: { onClick: () => void; buttonRef?: React.Ref<HTMLButtonElement> }) => (
  <Button color="secondary" variant="outline" ref={props.buttonRef} onClick={props.onClick}>
    Show dialog
  </Button>
)

export const Base = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog title="My Dialog" onClose={onDialogClose} returnFocusRef={buttonRef}>
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const WithSubtitle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          subtitle="This is a description of the dialog."
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const WithFooterButtons = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          footerButtons={[
            { buttonType: "default", content: "Cancel", onClick: onDialogClose },
            { buttonType: "danger", content: "Delete the universe", onClick: onDialogClose },
            { buttonType: "primary", content: "Continue", onClick: onDialogClose },
          ]}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const SideSheet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          position="right"
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const BottomSheetNarrow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          position={{ narrow: "bottom", regular: "center" }}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const FullScreenNarrow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          position={{ narrow: "fullscreen", regular: "center" }}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const SizeVariant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          width="small"
          height="small"
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const CustomWidth = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="Custom Width Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          width="400px"
        >
          This dialog has a custom width of 400px.
        </Dialog>
      )}
    </>
  )
}

export const AlignTop = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog title="My Dialog" onClose={onDialogClose} returnFocusRef={buttonRef} align="top">
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const AlignBottom = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog title="My Dialog" onClose={onDialogClose} returnFocusRef={buttonRef} align="bottom">
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const NestedDialogs = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const onSecondDialogClose = useCallback(() => setSecondOpen(false), [])
  const openSecondDialog = useCallback(() => setSecondOpen(true), [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          footerButtons={[
            { buttonType: "default", content: "Open Second Dialog", onClick: openSecondDialog },
            { buttonType: "danger", content: "Delete the universe", onClick: onDialogClose },
            { buttonType: "primary", content: "Proceed", onClick: openSecondDialog },
          ]}
        >
          {lipsum}
          {secondOpen && (
            <Dialog title="Inner dialog!" onClose={onSecondDialogClose} width="small">
              Hello world
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}

export const LoadingFooterButtons = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onDialogClose = useCallback(() => {
    setIsOpen(false)
    setIsSubmitting(false)
    setIsDeleting(false)
  }, [])

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsOpen(false)
    }, 2000)
  }, [])

  const handleDelete = useCallback(() => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setIsOpen(false)
    }, 3000)
  }, [])

  return (
    <>
      <Trigger buttonRef={buttonRef} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="Dialog title"
          onClose={onDialogClose}
          returnFocusRef={buttonRef}
          footerButtons={[
            { buttonType: "default", content: "Cancel", onClick: onDialogClose },
            {
              buttonType: "danger",
              content: "Delete project",
              onClick: handleDelete,
              loading: isDeleting,
            },
            {
              buttonType: "primary",
              content: "Save & Delete",
              onClick: handleSubmit,
              loading: isSubmitting,
              autoFocus: true,
            },
          ]}
        >
          This is some text
        </Dialog>
      )}
    </>
  )
}

export const InitialFocus = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const initialFocusRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Trigger onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Dialog
          title="New project"
          width="large"
          initialFocusRef={initialFocusRef}
          onClose={onDialogClose}
          footerButtons={[
            { buttonType: "default", content: "Cancel", onClick: onDialogClose },
            { buttonType: "primary", content: "Create project", onClick: onDialogClose },
          ]}
        >
          <Input ref={initialFocusRef} placeholder="Project name" />
        </Dialog>
      )}
    </>
  )
}

export const ReturnFocusRef = () => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <div className="flex gap-2">
      <Button color="secondary" variant="outline" onClick={() => setIsOpen(true)}>
        Show dialog (button 1)
      </Button>
      <Button color="secondary" variant="outline" ref={triggerRef}>
        Return focus to (button 2)
      </Button>
      {isOpen && (
        <Dialog title="title" onClose={onDialogClose} returnFocusRef={triggerRef}>
          Closing this dialog returns focus to button 2.
        </Dialog>
      )}
    </div>
  )
}

const CustomHeader = ({
  title,
  subtitle,
  dialogLabelId,
  dialogDescriptionId,
  onClose,
}: DialogHeaderProps) => {
  if (typeof title === "string" && typeof subtitle === "string") {
    return (
      <div className="flex items-start gap-2 bg-(--color-background-info-soft) p-4">
        <div className="grow">
          <h1 id={dialogLabelId} className="heading-sm">
            {title.toUpperCase()}
          </h1>
          <h2 id={dialogDescriptionId} className="text-sm">
            {subtitle.toLowerCase()}
          </h2>
        </div>
        <Dialog.CloseButton onClose={() => onClose("close-button")} />
      </div>
    )
  }
  return null
}

const CustomBody = ({ children }: DialogProps) => (
  <Dialog.Body className="bg-(--color-background-danger-soft)">{children}</Dialog.Body>
)

const CustomFooter = ({ footerButtons }: DialogProps) => (
  <Dialog.Footer className="bg-(--color-background-warning-soft)">
    {footerButtons ? <Dialog.Buttons buttons={footerButtons} /> : null}
  </Dialog.Footer>
)

export const WithCustomRenderers = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog
          title="My Dialog"
          subtitle="This is a subtitle!"
          renderHeader={CustomHeader}
          renderBody={CustomBody}
          renderFooter={CustomFooter}
          onClose={onDialogClose}
          footerButtons={[
            { buttonType: "danger", content: "Delete the universe", onClick: onDialogClose },
            { buttonType: "primary", content: "Proceed" },
          ]}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}

export const WithDirectSubcomponents = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Trigger onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Dialog title="My Dialog" onClose={onDialogClose}>
          <Dialog.Header>My dialog</Dialog.Header>
          <Dialog.Body>{lipsum}</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Buttons
              buttons={[
                { buttonType: "danger", content: "Delete the universe", onClick: onDialogClose },
                { buttonType: "primary", content: "Proceed" },
              ]}
            />
          </Dialog.Footer>
        </Dialog>
      )}
    </>
  )
}
