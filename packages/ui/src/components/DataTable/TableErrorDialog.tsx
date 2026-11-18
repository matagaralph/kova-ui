"use client"

import { type ReactNode, useRef } from "react"
import { Button } from "../Button/index.js"
import { AlertDialog } from "../Dialog/index.js"

export type TableErrorDialogProps = {
  /** What went wrong. */
  children?: ReactNode
  /**
   * Title of the dialog.
   * @default "Error"
   */
  title?: string
  /**
   * Whether the dialog is open.
   * @default true
   */
  open?: boolean
  /** Runs when Retry is pressed. */
  onRetry?: () => void
  /** Runs when Dismiss is pressed, or Escape closes the dialog. */
  onDismiss?: () => void
}

export function TableErrorDialog({
  title = "Error",
  open = true,
  children,
  onRetry,
  onDismiss,
}: TableErrorDialogProps) {
  const retryRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onDismiss?.()
      }}
    >
      <AlertDialog.Content
        width="medium"
        initialFocus={() => retryRef.current}
        data-component="Table.ErrorDialog"
      >
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
        </AlertDialog.Header>
        {children && (
          <AlertDialog.Body>
            <AlertDialog.Description>{children}</AlertDialog.Description>
          </AlertDialog.Body>
        )}
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button color="secondary" variant="outline" />}>
            Dismiss
          </AlertDialog.Close>
          <Button ref={retryRef} color="primary" onClick={() => onRetry?.()}>
            Retry
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
