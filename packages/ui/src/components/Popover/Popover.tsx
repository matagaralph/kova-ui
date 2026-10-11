"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import clsx from "clsx"
import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type PointerEventHandler,
  type ReactNode,
} from "react"
import { useLatestValue } from "../../hooks/useLatestValue.js"
import { getAlignOffset } from "../../lib/alignOffset.js"
import { focusableElements, toCssVariables } from "../../lib/helpers.js"
import s from "./Popover.module.css"
import { PopoverContext, usePopoverContext, type PopoverContextValue } from "./usePopoverContext.js"

export type PopoverProps = {
  /** Sets controlled visibility state */
  open?: boolean
  /** Callback invoked when visibility state changes */
  onOpenChange?: (nextState: boolean) => void
  showOnHover?: boolean
  hoverOpenDelay?: number
  children: React.ReactNode
}

export const Popover = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  showOnHover = false,
  hoverOpenDelay = 150,
  children,
}: PopoverProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [shake, setShake] = useState<boolean>(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const hoverOpenFocusedWithTab = useRef<boolean>(false)
  const isOpen = controlledOpen ?? open

  const latestOpenChange = useLatestValue(controlledOnOpenChange)

  const handleOpenChangeImpl = useLatestValue((nextState: boolean) => {
    // No-op if the state is not changing
    if (isOpen === nextState) {
      return
    }

    if (!nextState) {
      // clear any running shake animation on close
      setShake(false)

      // Check for specific hover conditions where focus should be
      // immediately restored to the trigger before closing
      if (showOnHover && hoverOpenFocusedWithTab.current) {
        triggerRef.current?.focus()
      }

      // Always cleanup this state
      hoverOpenFocusedWithTab.current = false
    }

    latestOpenChange.current?.(nextState)
    setOpen(nextState)
  })

  const handleOpenChange = useCallback(
    (nextState: boolean) => {
      handleOpenChangeImpl.current(nextState)
    },
    [handleOpenChangeImpl],
  )

  const store = useMemo<PopoverContextValue>(
    () => ({
      open: isOpen,
      setOpen: handleOpenChange,
      shake,
      setShake,
      showOnHover,
      hoverOpenDelay,
      triggerRef,
      contentRef,
      hoverOpenFocusedWithTab,
    }),
    [
      isOpen,
      handleOpenChange,
      shake,
      setShake,
      showOnHover,
      hoverOpenDelay,
      hoverOpenFocusedWithTab,
    ],
  )

  return (
    <PopoverContext value={store}>
      <BasePopover.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
        {children}
      </BasePopover.Root>
    </PopoverContext>
  )
}

export type PopoverTriggerProps = {
  /** The element that opens the popover. Its props are merged with the trigger's. */
  children: ReactElement
  onPointerDown?: PointerEventHandler
  onClick?: MouseEventHandler
  /**
   * Whether the trigger renders a native `<button>`. Set to `false` when the child renders another element.
   * @default true
   */
  nativeButton?: boolean
  /** Prevents the popover from opening */
  disabled?: boolean
}

const Trigger = ({
  children,
  onPointerDown,
  onClick,
  nativeButton = true,
  disabled,
}: PopoverTriggerProps) => {
  const { setOpen, showOnHover, hoverOpenDelay, triggerRef, contentRef } = usePopoverContext()

  return (
    <BasePopover.Trigger
      render={children}
      nativeButton={nativeButton}
      disabled={disabled}
      ref={triggerRef}
      onPointerDown={onPointerDown}
      onClick={onClick}
      openOnHover={showOnHover}
      delay={hoverOpenDelay}
      onFocus={showOnHover ? () => setOpen(true) : undefined}
      onBlur={
        showOnHover
          ? () => {
              setTimeout(() => {
                // Ignore this handler if focus has moved into the popover
                if (contentRef.current?.contains(document.activeElement)) {
                  return
                }

                setOpen(false)
              }, 50)
            }
          : undefined
      }
    />
  )
}

export type PopoverContentProps = {
  children: ReactNode
  /**
   * Whether to avoid collisions with vieport/scroll containersw.
   * @default true
   */
  avoidCollisions?: boolean
  /**
   * Set the `width` of the popover, in pixels.
   * @default auto
   */
  width?: number | "auto"
  /**
   * Set the `min-width` of the popover, in pixels.
   * @default 300
   */
  minWidth?: number | "auto"
  /**
   * Set the `max-width` of the popover, in pixels.
   */
  maxWidth?: number
  /**
   * Background style for the popover
   * @default default
   */
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default bottom
   */
  side?: "top" | "right" | "bottom" | "left"
  /**
   * The distance in pixels from the trigger.
   * @default 8
   */
  sideOffset?: number
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: "start" | "center" | "end"
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number
  /**
   * Whether the popover surface should be translucent.
   * @default false
   */
  translucent?: boolean
  /** Additional class name to apply to the popover content, you usually don't want to set this, but ag-grid needs it to render a custom editor properly */
  className?: string
  /**
   * Auto focus the popover content when it is opened.
   * @default true
   */
  autoFocus?: boolean
}

const ContentImpl = ({
  children,
  avoidCollisions,
  width,
  minWidth,
  maxWidth,
  side,
  sideOffset = 8,
  align,
  alignOffset,
  translucent,
  className,
  autoFocus = true,
}: PopoverContentProps) => {
  const { showOnHover, shake, contentRef } = usePopoverContext()

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (evt) => {
    const contentElement = contentRef.current

    if (
      // When the current target is our container
      contentElement &&
      evt.target === contentElement &&
      // We know that shift key tabs will lead to closing the popover (because we don't use `modal`)
      evt.key === "Tab" &&
      evt.shiftKey
    ) {
      // Prevent that from happening
      evt.preventDefault()
      evt.stopPropagation()

      // Move focus to the last focusable element, placing the user in the focus loop
      const focusable = focusableElements(contentElement)
      const lastFocusable = focusable[focusable.length - 1]
      lastFocusable?.focus()
    }
  }

  // Important that we send initial focus into the popover, placing it onto the container.
  // This allows focus looping to begin, as well as capturing scoped key presses.
  // Base UI's default of focusing the first tabbable element is disabled, because this can have adverse side-effects.
  useEffect(() => {
    const contentElement = contentRef.current

    if (!contentElement || !autoFocus) {
      return
    }

    // If we're already focused within the content area, no-op.
    // This would be true if some inner component declares autoFocus
    if (contentElement?.contains(document.activeElement)) {
      return
    }

    // Our focus isn't in the content area - move it there.
    // NOTE: Don't automatically shift focus on hover popovers
    if (!showOnHover) {
      contentElement.focus({ preventScroll: true })
    }
  }, [contentRef, showOnHover, autoFocus])

  return (
    <BasePopover.Positioner
      className={s.Positioner}
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={getAlignOffset(align, alignOffset ?? -5)}
      collisionAvoidance={avoidCollisions === false ? NO_COLLISION_AVOIDANCE : undefined}
      collisionPadding={20}
    >
      <BasePopover.Popup
        ref={contentRef}
        className={clsx(s.Popover, className)}
        style={toCssVariables({
          "popover-width": width,
          "popover-min-width": minWidth,
          "popover-max-width": maxWidth,
        })}
        initialFocus={false}
        finalFocus={showOnHover ? false : undefined}
        data-animate={shake ? "shake" : undefined}
        data-translucent={translucent ? "true" : undefined}
        onKeyDown={handleKeyDown}
      >
        {children}
      </BasePopover.Popup>
    </BasePopover.Positioner>
  )
}

const NO_COLLISION_AVOIDANCE = { side: "none", align: "none" } as const

const ContentHoverable = (props: PopoverContentProps) => {
  const { contentRef, hoverOpenFocusedWithTab } = usePopoverContext()

  // Hoverable doesn't place focus in the popover by default
  // If this is open, and tab is pressed, and focusableElements() has an element, prevent default behavior and focus it
  // Then set a flag (probably in context) that tells us to restore focus to the trigger on close (e.g., not execute the onCloseAutoFocus handler)

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (!contentRef.current) {
        return
      }

      // Only assume forward tab is attempting to move into the popup
      if (evt.key === "Tab" && !evt.shiftKey) {
        const [firstFocusable] = focusableElements(contentRef.current)
        if (firstFocusable) {
          evt.preventDefault()
          firstFocusable.focus()
          hoverOpenFocusedWithTab.current = true
          document.removeEventListener("keydown", handleKeyDown)
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [contentRef, hoverOpenFocusedWithTab])

  return <ContentImpl {...props} />
}

const Content = (props: PopoverContentProps) => {
  const { showOnHover } = usePopoverContext()

  return (
    <BasePopover.Portal>
      {showOnHover ? <ContentHoverable {...props} /> : <ContentImpl {...props} />}
    </BasePopover.Portal>
  )
}

Popover.Trigger = Trigger
Popover.Content = Content
