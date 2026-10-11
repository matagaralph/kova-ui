"use client"

import { Check, Copy } from "@kova-ui/icons"
import { type ReactElement, useRef, useState } from "react"
import { copyText } from "../../lib/copyToClipboard.js"
import {
  Tooltip,
  type TooltipAlign,
  type TooltipOpenChangeDetails,
  type TooltipSide,
} from "./Tooltip.js"

export type CopyTooltipProps = {
  children: React.ReactNode
  /** Value to copy to the clipboard */
  copyValue: string
  /**
   * Delay of when the tooltip is shown from first interaction, in milliseconds.
   * @default 150
   */
  openDelay?: number
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
}

export const CopyTooltip = ({
  children,
  copyValue,
  openDelay = 150,
  align = "center",
  alignOffset = 0,
  side = "top",
  sideOffset = 5,
}: CopyTooltipProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = () => {
    setCopied(true)

    // Not currently revealing the slight async nature of this operation,
    // nor indicating the failure state.
    copyText(copyValue)

    // Persist the copied state for a second, then close
    copiedTimerRef.current = setTimeout(() => {
      setOpen(false)
    }, 1000)
  }

  const handleOpenChange = (nextState: boolean, details?: TooltipOpenChangeDetails) => {
    // Clicking the trigger copies the value instead of closing
    if (!nextState && details?.reason === "trigger-press") return

    // When opening, ensure timer and copied state are cleared
    if (nextState) {
      clearTimeout(copiedTimerRef.current)
      setCopied(false)
    }

    setOpen(nextState)
  }

  return (
    <Tooltip.Root
      open={open}
      onOpenChange={handleOpenChange}
      delayDuration={openDelay}
      disableHoverableContent={false}
    >
      <Tooltip.Trigger
        onPointerDown={(evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          copy()
        }}
        onClick={(evt) => {
          evt.preventDefault()
          evt.stopPropagation()
        }}
      >
        {children as ReactElement}
      </Tooltip.Trigger>
      <Tooltip.Content
        compact
        clickable={!copied}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={15}
        onPointerDown={copy}
      >
        {copied ? (
          // The <Check /> SVG canvas whitespace is larger than copy, so we use a smaller flexbox gap
          <div className="flex items-center gap-0.5">
            <Check /> Copied!
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Copy /> Copy
          </div>
        )}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
