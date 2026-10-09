"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import clsx from "clsx"
import {
  Children,
  type ComponentProps,
  type CSSProperties,
  isValidElement,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { Button, type ButtonProps } from "../Button/index.js"
import { X } from "../Icon/index.js"
import { useResizeObserver } from "../Tabs/useResizeObserver.js"
import s from "./Dialog.module.css"

// Number of open dialogs, so page scroll is restored only when the last one closes
let dialogScrollDisabledCount = 0
let previousBodyStyles = { overflow: "", paddingRight: "" }

/**
 * Props that characterize a button to be rendered into the footer of a Dialog.
 */
export type DialogButtonProps = Omit<ButtonProps, "content" | "color" | "variant" | "children"> & {
  /**
   * The variant of Button to use
   * @default "default"
   */
  buttonType?: "default" | "primary" | "danger" | "normal"
  /**
   * The Button's inner text
   */
  content: ReactNode
  /**
   * If true, and if this is the only button with autoFocus set to true, focus this button
   * automatically when the dialog appears.
   */
  autoFocus?: boolean
}

export type DialogWidth = "small" | "medium" | "large" | "xlarge" | (string & {}) | number
export type DialogHeight = "small" | "large" | "auto"
export type DialogPosition = "left" | "right" | "bottom" | "fullscreen" | "center"

/**
 * Props to customize the rendering of the Dialog.
 */
export type DialogProps = {
  "data-component"?: string
  /**
   * Title of the Dialog. Also serves as the aria-label for this Dialog.
   * @default "Dialog"
   */
  "title"?: ReactNode
  /**
   * The Dialog's subtitle, rendered below the title in smaller type with less contrast. Also serves
   * as the aria-describedby for this Dialog.
   */
  "subtitle"?: ReactNode
  /**
   * Provide a custom renderer for the dialog header. This content is rendered directly into the
   * dialog, full bleed from edge to edge, top to the start of the body element.
   */
  "renderHeader"?: (props: DialogHeaderProps) => ReactNode
  /**
   * Provide a custom render function for the dialog body. This content is rendered directly into the
   * dialog body area, full bleed from edge to edge, header to footer.
   */
  "renderBody"?: (props: DialogProps) => ReactNode
  /**
   * Provide a custom render function for the dialog footer. This content is rendered directly into
   * the dialog footer area, full bleed from edge to edge, end of the body element to bottom.
   */
  "renderFooter"?: (props: DialogProps) => ReactNode
  /**
   * Specifies the buttons to be rendered in the Dialog footer.
   */
  "footerButtons"?: DialogButtonProps[]
  /**
   * Invoked when a gesture to close the dialog is used: an Escape key press, clicking the backdrop,
   * or clicking the close button. The gesture argument indicates the gesture that was used.
   */
  "onClose": (gesture: "close-button" | "escape") => void
  /**
   * The ARIA role to assign to this dialog.
   * @default "dialog"
   */
  "role"?: "dialog" | "alertdialog"
  /**
   * The width of the dialog. `small`: 296px, `medium`: 320px, `large`: 480px, `xlarge`: 640px. Also
   * accepts any valid CSS width value (e.g. `"400px"`, `"80rem"`) or a number of pixels.
   * @default "xlarge"
   */
  "width"?: DialogWidth
  /**
   * The height of the dialog. `small`: 480px, `large`: 640px, `auto`: based on its contents.
   * @default "auto"
   */
  "height"?: DialogHeight
  /**
   * The position of the dialog. Pass an object to set a different position on narrow (below 768px),
   * regular, and wide screens.
   * @default { narrow: "center", regular: "center" }
   */
  "position"?:
    | "center"
    | "left"
    | "right"
    | { narrow?: DialogPosition; regular?: DialogPosition; wide?: DialogPosition }
  /**
   * The vertical alignment of the dialog. Only applies when `position` is `"center"`.
   */
  "align"?: "top" | "center" | "bottom"
  /**
   * Return focus to this element when the Dialog closes, instead of the element that had focus
   * immediately before the Dialog opened
   */
  "returnFocusRef"?: RefObject<HTMLElement | null>
  /**
   * The element to focus when the Dialog opens
   */
  "initialFocusRef"?: RefObject<HTMLElement | null>
  /**
   * Additional class names to apply to the dialog
   */
  "className"?: string
  /**
   * Additional styles to apply to the dialog
   */
  "style"?: CSSProperties
  "children"?: ReactNode
}

/**
 * Props that are passed to a component that serves as a dialog header
 */
export type DialogHeaderProps = DialogProps & {
  /**
   * ID used for the dialog's `aria-labelledby`. Set it on the element that renders the title.
   */
  dialogLabelId: string
  /**
   * ID used for the dialog's `aria-describedby`. Set it on the element that renders the subtitle.
   */
  dialogDescriptionId: string
}

const NAMED_WIDTHS = ["small", "medium", "large", "xlarge"]

const isNamedWidth = (width: DialogWidth): width is "small" | "medium" | "large" | "xlarge" =>
  typeof width === "string" && NAMED_WIDTHS.includes(width)

const DEFAULT_POSITION = { narrow: "center", regular: "center" } as const
const DEFAULT_FOOTER_BUTTONS: DialogButtonProps[] = []

// Minimum room needed for body content before forcing footer buttons into horizontal scroll
const MIN_BODY_HEIGHT = 48

const DefaultHeader = ({
  dialogLabelId,
  title,
  subtitle,
  dialogDescriptionId,
  onClose,
}: DialogHeaderProps) => (
  <Header>
    <div className={s.HeaderInner}>
      <div className={s.HeaderContent}>
        <Title id={dialogLabelId}>{title ?? "Dialog"}</Title>
        {subtitle && <Subtitle id={dialogDescriptionId}>{subtitle}</Subtitle>}
      </div>
      <CloseButton onClose={() => onClose("close-button")} />
    </div>
  </Header>
)

const DefaultBody = ({ children }: DialogProps) => <Body>{children}</Body>

const DefaultFooter = ({ footerButtons }: DialogProps) =>
  footerButtons && footerButtons.length > 0 ? (
    <Footer>
      <Buttons buttons={footerButtons} />
    </Footer>
  ) : null

const findSlot = (children: ReactNode, type: unknown) =>
  Children.toArray(children).find(
    (child): child is ReactElement => isValidElement(child) && child.type === type,
  )

const DialogRoot = (props: DialogProps) => {
  const {
    "data-component": dataComponent = "Dialog",
    title = "Dialog",
    subtitle = "",
    renderHeader,
    renderBody,
    renderFooter,
    onClose,
    role = "dialog",
    width = "xlarge",
    height = "auto",
    footerButtons = DEFAULT_FOOTER_BUTTONS,
    position = DEFAULT_POSITION,
    align,
    returnFocusRef,
    initialFocusRef,
    className,
    style,
    children,
  } = props
  const dialogLabelId = useId()
  const dialogDescriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const [lastMouseDownIsBackdrop, setLastMouseDownIsBackdrop] = useState(false)
  const [footerButtonLayout, setFooterButtonLayout] = useState<"scroll" | "wrap">("wrap")
  const [bodyCanScroll, setBodyCanScroll] = useState(false)

  const defaultedProps = {
    ...props,
    title,
    subtitle,
    role,
    footerButtons,
    dialogLabelId,
    dialogDescriptionId,
  }

  const slots = {
    header: findSlot(children, Header),
    body: findSlot(children, Body),
    footer: findSlot(children, Footer),
  }
  const childrenWithoutSlots = Children.toArray(children).filter(
    (child) => !isValidElement(child) || ![Header, Body, Footer].includes(child.type as never),
  )

  useEffect(() => {
    const { body } = document

    if (dialogScrollDisabledCount === 0) {
      // Keep the page from shifting when its scrollbar disappears
      const scrollbarWidth = window.innerWidth - body.clientWidth
      previousBodyStyles = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
      body.style.overflow = "hidden"
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`
      }
      body.setAttribute("data-dialog-scroll-disabled", "")
    }
    dialogScrollDisabledCount++

    return () => {
      dialogScrollDisabledCount--
      if (dialogScrollDisabledCount === 0) {
        body.style.overflow = previousBodyStyles.overflow
        body.style.paddingRight = previousBodyStyles.paddingRight
        body.removeAttribute("data-dialog-scroll-disabled")
      }
    }
  }, [])

  const header = slots.header ?? (renderHeader ?? DefaultHeader)(defaultedProps)
  const body =
    slots.body ?? (renderBody ?? DefaultBody)({ ...defaultedProps, children: childrenWithoutSlots })
  const footer = slots.footer ?? (renderFooter ?? DefaultFooter)(defaultedProps)
  const hasFooter = footer != null

  const updateLayout = useCallback(() => {
    const bodyWrapper = dialogRef.current?.querySelector<HTMLElement>(`.${s.DialogOverflowWrapper}`)
    if (!hasFooter || !bodyWrapper) {
      return
    }

    // Measure the body with wrapping footer buttons to decide which layout leaves it enough room
    dialogRef.current?.setAttribute("data-footer-button-layout", "wrap")
    const nextLayout = bodyWrapper.clientHeight >= MIN_BODY_HEIGHT ? "wrap" : "scroll"
    dialogRef.current?.setAttribute("data-footer-button-layout", nextLayout)
    setFooterButtonLayout(nextLayout)
    setBodyCanScroll(bodyWrapper.scrollHeight > bodyWrapper.clientHeight)
  }, [hasFooter])

  useResizeObserver(updateLayout, backdropRef)

  const positionDataAttributes =
    typeof position === "string"
      ? { "data-position-regular": position }
      : Object.fromEntries(
          Object.entries(position).map(([key, value]) => [`data-position-${key}`, value]),
        )

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && lastMouseDownIsBackdrop) {
      onClose("escape")
    }
  }

  return (
    <BaseDialog.Root
      open
      // The backdrop blocks the page and `aria-modal` marks the dialog as modal; Base UI traps focus
      modal="trap-focus"
      disablePointerDismissal
      onOpenChange={(open, details) => {
        if (!open && details.reason === "escape-key") {
          onClose("escape")
        }
      }}
    >
      <BaseDialog.Portal>
        <div
          ref={backdropRef}
          className={s.Backdrop}
          {...positionDataAttributes}
          {...(align && { "data-align": align })}
          onClick={handleBackdropClick}
          onMouseDown={(event) => setLastMouseDownIsBackdrop(event.target === event.currentTarget)}
        >
          <BaseDialog.Popup
            ref={dialogRef}
            role={role}
            aria-labelledby={dialogLabelId}
            aria-describedby={dialogDescriptionId}
            aria-modal
            initialFocus={
              initialFocusRef ??
              (() => dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]") ?? true)
            }
            finalFocus={returnFocusRef ?? true}
            {...positionDataAttributes}
            {...(align && { "data-align": align })}
            data-width={isNamedWidth(width) ? width : undefined}
            data-height={height}
            data-has-footer={hasFooter ? "" : undefined}
            data-footer-button-layout={hasFooter ? footerButtonLayout : undefined}
            data-body-can-scroll={hasFooter && bodyCanScroll ? "" : undefined}
            data-component={dataComponent}
            className={clsx(className, s.Dialog)}
            style={{
              ...style,
              ...(!isNamedWidth(width) && {
                width: typeof width === "number" ? `${width}px` : width,
              }),
            }}
          >
            {header}
            <div className={s.DialogOverflowWrapper}>{body}</div>
            {footer}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export const Header = ({ className, ...rest }: ComponentProps<"div">) => (
  <div className={clsx(className, s.Header)} {...rest} data-component="Dialog.Header" />
)
Header.displayName = "Dialog.Header"

export const Title = ({ className, ...rest }: ComponentProps<"h1">) => (
  <h1 className={clsx(className, s.Title)} {...rest} data-component="Dialog.Title" />
)
Title.displayName = "Dialog.Title"

export const Subtitle = ({ className, ...rest }: ComponentProps<"h2">) => (
  <h2 className={clsx(className, s.Subtitle)} {...rest} data-component="Dialog.Subtitle" />
)
Subtitle.displayName = "Dialog.Subtitle"

export const Body = ({ className, ...rest }: ComponentProps<"div">) => (
  <div className={clsx(className, s.Body)} {...rest} data-component="Dialog.Body" />
)
Body.displayName = "Dialog.Body"

export const Footer = ({ className, onKeyDown, ...rest }: ComponentProps<"div">) => {
  // Arrow keys move focus between the footer buttons
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

    const buttons = [...event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled)")]
    const index = buttons.indexOf(document.activeElement as HTMLElement)
    if (index === -1) return

    event.preventDefault()
    const offset = event.key === "ArrowRight" ? 1 : -1
    buttons[(index + offset + buttons.length) % buttons.length]?.focus()
  }

  return (
    <div
      className={clsx(className, s.Footer)}
      {...rest}
      onKeyDown={handleKeyDown}
      data-component="Dialog.Footer"
    />
  )
}
Footer.displayName = "Dialog.Footer"

const BUTTON_TYPES: Record<
  NonNullable<DialogButtonProps["buttonType"]>,
  Pick<ButtonProps, "color" | "variant">
> = {
  default: { color: "secondary", variant: "outline" },
  normal: { color: "secondary", variant: "outline" },
  primary: { color: "primary", variant: "solid" },
  danger: { color: "danger", variant: "solid" },
}

export const Buttons = ({ buttons }: { buttons: DialogButtonProps[] }) => {
  const autoFocusIndex = buttons.findIndex((button) => button.autoFocus)

  return (
    <>
      {buttons.map(({ content, buttonType = "default", autoFocus: _, ...buttonProps }, index) => (
        <Button
          key={index}
          data-component="Dialog.FooterButton"
          data-autofocus={index === autoFocusIndex ? "" : undefined}
          {...BUTTON_TYPES[buttonType]}
          {...buttonProps}
        >
          {content}
        </Button>
      ))}
    </>
  )
}
Buttons.displayName = "Dialog.Buttons"

export const CloseButton = ({
  onClose,
  onKeyDown,
}: {
  onClose: () => void
  onKeyDown?: KeyboardEventHandler
}) => (
  <Button
    color="secondary"
    variant="ghost"
    size="sm"
    uniform
    aria-label="Close"
    onClick={onClose}
    onKeyDown={onKeyDown}
    data-component="Dialog.CloseButton"
  >
    <X />
  </Button>
)
CloseButton.displayName = "Dialog.CloseButton"

DialogRoot.displayName = "Dialog"

/**
 * A dialog is a type of overlay that can be used for confirming actions, asking for
 * disambiguation, and presenting small forms. Dialogs are modal: they can be dismissed with the
 * close button, the Escape key, clicking the backdrop, or another button in the dialog.
 *
 * The sub components (e.g. `Header`, `Title`) are available for custom renderers.
 */
const Dialog = Object.assign(DialogRoot, {
  Header,
  Title,
  Subtitle,
  Body,
  Footer,
  Buttons,
  CloseButton,
})

export { Dialog }
