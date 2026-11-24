"use client"

import { Check, Copy } from "@kova-ui/icons"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { type ClipboardContent, copyToClipboard } from "../../lib/copy-to-clipboard.js"
import { Animate } from "../transition/index.js"
import { Button, type ButtonProps } from "./button.js"

export type CopyButtonProps = Omit<ButtonProps, "children"> & {
  /** What to copy, or a function that returns it when pressed. */
  copyValue: string | ClipboardContent | (() => string) | (() => ClipboardContent)
  /** Content after the icon. Without it, the button is named "Copy"; pass `aria-label` to change that. */
  children?: ReactNode | ((state: { copied: boolean }) => ReactNode)
}

export function CopyButton({ children, copyValue, onClick, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const copiedTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current)
    }
  }, [])

  return (
    <Button
      aria-label={children == null ? "Copy" : undefined}
      {...props}
      onClick={(event, details) => {
        if (copied) return
        setCopied(true)
        copyToClipboard(typeof copyValue === "function" ? copyValue() : copyValue)
        copiedTimeout.current = window.setTimeout(() => setCopied(false), 1300)
        return onClick?.(event, details)
      }}
    >
      <Animate
        className="h-[var(--button-icon-size)] w-[var(--button-icon-size)]"
        initial={{ scale: 0.6 }}
        enter={{ scale: 1, delay: 150, duration: 300 }}
        exit={{ scale: 0.6, duration: 150 }}
        forceCompositeLayer
      >
        {copied ? <Check key="copied-icon" /> : <Copy key="copy-icon" />}
      </Animate>
      {typeof children === "function" ? children({ copied }) : children}
    </Button>
  )
}
