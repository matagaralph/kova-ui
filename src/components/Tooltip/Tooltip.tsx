"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { useRender } from "@base-ui/react/use-render"
import clsx from "clsx"
import {
  type ComponentProps,
  createContext,
  type MouseEventHandler,
  type PointerEventHandler,
  type ReactElement,
  use,
  useId,
  useMemo,
  useState,
} from "react"
import { useTimeout } from "usehooks-ts"
import { useEscCloseStack } from "../../hooks/useEscCloseStack.js"
import { getAlignOffset } from "../../lib/alignOffset.js"
import s from "./Tooltip.module.css"

export type TooltipSide = "top" | "right" | "bottom" | "left"
export type TooltipAlign = "start" | "center" | "end"
export type TooltipOpenChangeDetails = BaseTooltip.Root.ChangeEventDetails

// Links the trigger to the open tooltip with `aria-describedby`
const TooltipA11yContext = createContext<{ open: boolean; contentId: string } | null>(null)

export type TooltipProps = {
  children: React.ReactNode
  /**
   * The content of the tooltip. If `null`, the tooltip will not render.
   */
  content: React.ReactNode
  /**
   * Defines the `max-width` of the tooltip content. `"none"` creates a single-line, naturally sized tooltip.
   * @default 300
   */
  maxWidth?: number | "none"
  /**
   * Forces the tooltip to remain open or closed
   */
  forceOpen?: boolean
  /**
   * Delay of when the tooltip is shown from first interaction, in milliseconds.
   * @default 150
   */
  openDelay?: number
  /** Indicates that the tooltip has interactive content, and should remain open when hovered. */
  interactive?: boolean
  /**
   * Short, 1-3 word tooltips, stylized inversely from normal tooltips
   */
  compact?: boolean
  /**
   * Prevents the tooltip from closing when the trigger is clicked right after opening
   * @default false
   */
  preventUnintentionalClickToClose?: true
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: TooltipAlign
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default top
   */
  side?: TooltipSide
  /**
   * The distance in pixels from the trigger.
   * @default 5
   */
  sideOffset?: number
  /**
   * Gutter sizing inside the tooltip content
   * @default md
   */
  gutterSize?: "sm" | "md" | "lg"
  /** Ref for the tooltip */
  ref?: React.Ref<HTMLDivElement | null>
  onPointerDown?: PointerEventHandler
  onClick?: MouseEventHandler
  /** Optional class name to apply to the tooltip content */
  contentClassName?: string
}

export const Tooltip = (props: TooltipProps) => {
  const {
    ref: forwardedRef,
    children,
    content,
    forceOpen = content === null ? false : undefined,
    maxWidth = 300,
    openDelay = 150,
    interactive = false,
    compact = false,
    preventUnintentionalClickToClose,
    align,
    alignOffset = 0,
    side,
    sideOffset = 5,
    gutterSize = "md",
    contentClassName,
    onPointerDown,
    onClick,
    ...restProps
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const [temporarilyPreventClickToClose, setTemporarilyPreventClickToClose] =
    useState<boolean>(false)
  useTimeout(
    () => setTemporarilyPreventClickToClose(false),
    temporarilyPreventClickToClose ? 400 : null,
  )
  const open = forceOpen ?? visible

  const handleOpenChange = (nextState: boolean, details?: TooltipOpenChangeDetails) => {
    // When forceOpen is passed, don't manage internal state
    if (typeof forceOpen === "boolean") return

    // Keep the tooltip open when the trigger is clicked right after opening
    if (
      !nextState &&
      details?.reason === "trigger-press" &&
      preventUnintentionalClickToClose &&
      temporarilyPreventClickToClose
    ) {
      return
    }

    setVisible(nextState)

    if (preventUnintentionalClickToClose) {
      setTemporarilyPreventClickToClose(nextState)
    }
  }

  return (
    <Root
      open={open}
      delayDuration={openDelay}
      onOpenChange={handleOpenChange}
      disableHoverableContent={!interactive}
    >
      <Trigger {...restProps} ref={forwardedRef} onPointerDown={onPointerDown} onClick={onClick}>
        {children as ReactElement}
      </Trigger>
      <Content
        maxWidth={maxWidth}
        compact={compact}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        gutterSize={gutterSize}
        className={contentClassName}
      >
        {content}
      </Content>
    </Root>
  )
}

export type TooltipRootProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (nextState: boolean, details?: TooltipOpenChangeDetails) => void
  /**
   * Delay of when the tooltip is shown from first interaction, in milliseconds.
   * @default 700
   */
  delayDuration?: number
  /** Close the tooltip as soon as the pointer leaves the trigger, even when moving onto the tooltip */
  disableHoverableContent?: boolean
}

const Root = ({
  children,
  open,
  onOpenChange,
  delayDuration = 700,
  disableHoverableContent = false,
}: TooltipRootProps) => {
  useEscCloseStack(open, () => {
    onOpenChange(false)
  })

  const contentId = useId()
  const a11y = useMemo(() => ({ open, contentId }), [open, contentId])

  return (
    <TooltipA11yContext value={a11y}>
      <BaseTooltip.Provider delay={delayDuration} closeDelay={0}>
        <BaseTooltip.Root
          open={open}
          disableHoverablePopup={disableHoverableContent}
          onOpenChange={(nextState, details) => {
            // Escape is handled by the shared close stack, so nested layers close one at a time
            if (details.reason === "escape-key") {
              details.allowPropagation()
              return
            }
            onOpenChange(nextState, details)
          }}
        >
          {children}
        </BaseTooltip.Root>
      </BaseTooltip.Provider>
    </TooltipA11yContext>
  )
}

export type TooltipContentProps = Omit<ComponentProps<"div">, "children"> & {
  children: React.ReactNode
  /**
   * Defines the `max-width` of the tooltip content. `"none"` creates a single-line, naturally sized tooltip.
   * @default 300
   */
  maxWidth?: number | "none"
  /**
   * Short, 1-3 word tooltips, stylized inversely from normal tooltips
   */
  compact?: boolean
  /**
   * Gutter sizing inside the tooltip content
   * @default md
   */
  gutterSize?: "sm" | "md" | "lg"
  /** Determines if the tooltip content should respond to click events */
  clickable?: boolean
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default top
   */
  side?: TooltipSide
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: TooltipAlign
  /**
   * The distance in pixels from the trigger.
   * @default 5
   */
  sideOffset?: number
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number
  /**
   * The distance in pixels from the viewport edges where collision detection should occur.
   * @default 15
   */
  collisionPadding?: number
}

export const Content = ({
  children,
  maxWidth = 300,
  compact = false,
  clickable = undefined,
  side = "top",
  align = "center",
  alignOffset = 0,
  sideOffset = 5,
  collisionPadding = 15,
  gutterSize = "md",
  className,
  style,
  ...restProps
}: TooltipContentProps) => {
  const a11y = use(TooltipA11yContext)

  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        className={s.Positioner}
        side={side}
        align={align}
        alignOffset={getAlignOffset(align, alignOffset)}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <BaseTooltip.Popup
          id={a11y?.contentId}
          role="tooltip"
          {...restProps}
          className={clsx(s.Tooltip, className)}
          data-compact={compact}
          data-clickable={clickable}
          data-gutter-size={gutterSize}
          style={{
            ...style,
            maxWidth,
          }}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export type TooltipTriggerProps = Omit<ComponentProps<"button">, "children" | "ref"> & {
  /** The element that opens the tooltip. Its props are merged with the trigger's. */
  children: ReactElement
  ref?: React.Ref<HTMLElement | null>
}

export const Trigger = ({ children, ref, ...restProps }: TooltipTriggerProps) => {
  const a11y = use(TooltipA11yContext)

  return (
    <BaseTooltip.Trigger
      aria-describedby={a11y?.open ? a11y.contentId : undefined}
      {...restProps}
      ref={ref as React.Ref<HTMLButtonElement>}
      render={children}
    />
  )
}

type TooltipTriggerDecoratorProps = Omit<ComponentProps<"span">, "children"> & {
  children: React.ReactNode
  /**
   * Determines if `tabindex=0` is applied to the trigger
   * @default true
   */
  focusable?: boolean
  /**
   * Optional class name to apply to the trigger
   */
  className?: string
  /** Ref for the trigger */
  ref?: React.Ref<HTMLSpanElement | null>
}

// Optional wrapper for tooltip trigger, if the visual content isn't already accessible or with built-in visual indications
export const TriggerDecorator = (props: TooltipTriggerDecoratorProps) => {
  const { children, className, focusable = true, ref, ...restProps } = props
  const isPlainText = typeof children === "string"

  return useRender({
    render: isPlainText ? <span>{children}</span> : (children as ReactElement),
    ref,
    props: {
      ...restProps,
      className: clsx(s.TriggerDecorator, className),
      tabIndex: focusable ? 0 : undefined,
    },
  })
}

// Building advanced tooltip behaviors can be achieved by using the
// composed components, and wiring up bespoke behaviors.
Tooltip.Root = Root
Tooltip.Content = Content
Tooltip.Trigger = Trigger
// Basic <Tooltip> usage can be done with the component directly,
// without requiring controlled component composition.
// <TriggerDecorator> is a helper component that creates an accessible trigger with a visual effect
Tooltip.TriggerDecorator = TriggerDecorator
