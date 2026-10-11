"use client"

import type { ReactNode } from "react"
import { Dialog } from "../Dialog/index.js"

export type TableErrorDialogProps = {
  children?: ReactNode

  /**
   * Provide an optional title for the dialog
   * @default Error
   */
  title?: string

  /**
   * Provide an optional handler to be called when the user confirms to retry
   */
  onRetry?: () => void

  /**
   * Provide an optional handler to be called when the user dismisses the dialog
   */
  onDismiss?: () => void
}

export function ErrorDialog({
  title = "Error",
  children,
  onRetry,
  onDismiss,
}: TableErrorDialogProps) {
  return (
    <Dialog
      role="alertdialog"
      title={title}
      width="medium"
      onClose={() => onDismiss?.()}
      footerButtons={[
        { buttonType: "default", content: "Dismiss", onClick: () => onDismiss?.() },
        { buttonType: "primary", content: "Retry", onClick: () => onRetry?.(), autoFocus: true },
      ]}
      data-component="Table.ErrorDialog"
    >
      {children}
    </Dialog>
  )
}
