"use client"

import { Check, Copy } from "@kova-ui/icons"
import { useEffect, useState } from "react"
import { copyText } from "../../lib/copy-to-clipboard.js"
import {
  Tooltip,
  type TooltipContentProps,
  type TooltipProps,
  type TooltipTriggerProps,
} from "./tooltip.js"
import s from "./tooltip.module.css"

const COPIED_MS = 1000

export type CopyTooltipProps = TooltipTriggerProps &
  Pick<TooltipProps, "delay"> &
  Pick<TooltipContentProps, "side" | "align" | "sideOffset" | "alignOffset"> & {
    /** The text a press copies to the clipboard. */
    copyValue: string
  }

export function CopyTooltip({
  copyValue,
  delay,
  side,
  align,
  sideOffset,
  alignOffset,
  onClick,
  ...props
}: CopyTooltipProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setOpen(false), COPIED_MS)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Tooltip
      open={open}
      onOpenChange={(next) => {
        if (next) setCopied(false)
        setOpen(next)
      }}
      delay={delay}
      closeOnPress={false}
    >
      <Tooltip.Trigger
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          void copyText(copyValue)
          setCopied(true)
          setOpen(true)
        }}
        {...props}
      />
      <Tooltip.Content
        compact
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <span className={s.CopyTooltipLabel} data-copied={copied ? "" : undefined}>
          {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
          {copied ? "Copied!" : "Copy"}
        </span>
      </Tooltip.Content>
    </Tooltip>
  )
}
