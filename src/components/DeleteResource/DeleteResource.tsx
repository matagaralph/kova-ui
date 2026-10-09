"use client"

import { useEffect, useRef, useState } from "react"
import { copyText } from "../../lib/copyToClipboard.js"
import { Alert } from "../Alert/index.js"
import { Dialog } from "../Dialog/index.js"
import { Check, Copy } from "../Icon/index.js"
import { Input } from "../Input/index.js"
import s from "./DeleteResource.module.css"

const COPY_FEEDBACK_MS = 1500

const WIDTHS = {
  sm: "small",
  base: 384,
} as const

export type DeleteResourceSize = keyof typeof WIDTHS

export type DeleteResourceProps = {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void
  /** The type of resource being deleted (e.g., "Project", "Workspace", "API key") */
  resourceType: string
  /** The name of the specific resource being deleted */
  resourceName: string
  /** Callback when delete is confirmed */
  onDelete: () => void | Promise<void>
  /**
   * Whether the delete action is in progress
   * @default false
   */
  isDeleting?: boolean
  /**
   * Whether the confirmation input should be case-sensitive
   * @default true
   */
  caseSensitive?: boolean
  /** Custom delete button text (defaults to "Delete {resourceType}") */
  deleteButtonText?: string
  /**
   * The width of the dialog
   * @default base
   */
  size?: DeleteResourceSize
  /** Additional className for the dialog */
  className?: string
  /** Error message to display if the delete action fails */
  errorMessage?: string
}

export function DeleteResource({
  open,
  onOpenChange,
  resourceType,
  resourceName,
  onDelete,
  isDeleting = false,
  caseSensitive = true,
  deleteButtonText,
  size = "base",
  errorMessage,
  className,
}: DeleteResourceProps) {
  const [confirmationInput, setConfirmationInput] = useState("")
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Start fresh every time the dialog opens
  useEffect(() => {
    if (!open) {
      setConfirmationInput("")
      setCopied(false)
    }
  }, [open])

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
    return () => clearTimeout(timeout)
  }, [copied])

  if (!open) return null

  const normalize = (value: string) => (caseSensitive ? value : value.toLowerCase())
  const isConfirmed = normalize(confirmationInput) === normalize(resourceName)

  const handleDelete = async () => {
    if (!isConfirmed || isDeleting) return
    await onDelete()
  }

  const handleCopy = async () => {
    if (await copyText(resourceName)) {
      setCopied(true)
    } else {
      // eslint-disable-next-line no-console
      console.warn("Clipboard copy failed")
    }
  }

  // Keep the dialog open while the delete is in progress
  const close = () => {
    if (!isDeleting) onOpenChange(false)
  }

  return (
    <Dialog
      title={`Delete ${resourceName}`}
      width={WIDTHS[size]}
      onClose={close}
      initialFocusRef={inputRef}
      className={className}
      data-component="DeleteResource"
      renderFooter={() => (
        <Dialog.Footer className={s.Footer}>
          <Dialog.Buttons
            buttons={[
              {
                buttonType: "default",
                content: "Cancel",
                disabled: isDeleting,
                onClick: close,
              },
              {
                buttonType: "danger",
                content: deleteButtonText || `Delete ${resourceType}`,
                disabled: !isConfirmed || isDeleting,
                loading: isDeleting,
                onClick: handleDelete,
              },
            ]}
          />
        </Dialog.Footer>
      )}
    >
      <div className={s.Content}>
        <div className={s.Section}>
          {errorMessage && <Alert color="danger" variant="soft" description={errorMessage} />}
          <p className={s.Description}>
            This action cannot be undone. This will permanently delete the{" "}
            <span className={s.ResourceName}>{resourceName}</span> {resourceType.toLowerCase()}.
          </p>
        </div>

        <div className={s.Section}>
          <p className={s.Prompt}>
            Type{" "}
            <button
              type="button"
              className={s.CopyButton}
              onClick={handleCopy}
              aria-label={`Copy ${resourceName} to clipboard`}
            >
              {resourceName}
              {copied ? (
                <Check aria-hidden className={s.CopyIcon} data-copied="" />
              ) : (
                <Copy aria-hidden className={s.CopyIcon} />
              )}
            </button>{" "}
            to confirm:
          </p>
          <Input
            ref={inputRef}
            placeholder={resourceName}
            value={confirmationInput}
            onChange={(event) => setConfirmationInput(event.target.value)}
            disabled={isDeleting}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label={`Type ${resourceName} to confirm deletion`}
          />
        </div>
      </div>
    </Dialog>
  )
}
