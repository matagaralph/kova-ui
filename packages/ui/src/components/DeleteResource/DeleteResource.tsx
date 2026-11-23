"use client"

import { Check, Copy } from "@kova-ui/icons"
import { type ReactNode, type RefObject, useEffect, useRef, useState } from "react"
import { copyText } from "../../lib/copyToClipboard.js"
import { Alert } from "../Alert/index.js"
import { Button } from "../Button/index.js"
import { AlertDialog, type AlertDialogProps } from "../Dialog/index.js"
import { Input } from "../Input/index.js"
import s from "./DeleteResource.module.css"

const COPY_FEEDBACK_MS = 1500

const WIDTHS = {
  sm: "small",
  base: 384,
} as const

export type DeleteResourceSize = keyof typeof WIDTHS

export type DeleteResourceProps = Pick<
  AlertDialogProps,
  "open" | "defaultOpen" | "onOpenChange" | "onOpenChangeComplete" | "controller"
> & {
  /** Rendered inside the dialog's root, like an `AlertDialogTrigger` that opens it. */
  children?: ReactNode
  /** The kind of resource, like "Project", "Workspace" or "API key". */
  resourceType: string
  /** The name of the resource, which the user types to confirm. */
  resourceName: string
  /**
   * Runs when the user confirms. Return a Promise to keep the dialog open and pending until it
   * settles: it closes once the Promise resolves, and stays open when it rejects.
   */
  onDelete: () => unknown
  /**
   * Locks the dialog while a delete you track yourself is in progress.
   * @default false
   */
  isDeleting?: boolean
  /**
   * Whether the typed name must match the case of `resourceName`.
   * @default true
   */
  caseSensitive?: boolean
  /** The delete button's text. Defaults to "Delete {resourceType}". */
  deleteButtonText?: string
  /**
   * The dialog's width. `sm` is 296px and `base` 384px.
   * @default base
   */
  size?: DeleteResourceSize
  className?: string
  /** A message shown above the description, like why the last attempt failed. */
  errorMessage?: string
}

export function DeleteResource({
  open,
  defaultOpen,
  onOpenChange,
  onOpenChangeComplete,
  controller,
  children,
  isDeleting = false,
  size = "base",
  className,
  ...props
}: DeleteResourceProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <AlertDialog
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      controller={controller}
      dismissible={!isDeleting}
    >
      {children}
      <AlertDialog.Backdrop />
      <AlertDialog.Content
        width={WIDTHS[size]}
        className={className}
        initialFocus={() => inputRef.current}
        data-component="DeleteResource"
      >
        {(state) => (
          <DeleteResourceForm {...props} inputRef={inputRef} busy={isDeleting || state.pending} />
        )}
      </AlertDialog.Content>
    </AlertDialog>
  )
}

type DeleteResourceFormProps = Pick<
  DeleteResourceProps,
  | "resourceType"
  | "resourceName"
  | "onDelete"
  | "caseSensitive"
  | "deleteButtonText"
  | "errorMessage"
> & {
  inputRef: RefObject<HTMLInputElement | null>
  busy: boolean
}

function DeleteResourceForm({
  resourceType,
  resourceName,
  onDelete,
  caseSensitive = true,
  deleteButtonText,
  errorMessage,
  inputRef,
  busy,
}: DeleteResourceFormProps) {
  const [confirmation, setConfirmation] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
    return () => clearTimeout(timeout)
  }, [copied])

  const normalize = (value: string) => (caseSensitive ? value : value.toLowerCase())
  const isConfirmed = normalize(confirmation) === normalize(resourceName)

  const handleCopy = async () => {
    if (await copyText(resourceName)) {
      setCopied(true)
    } else {
      // eslint-disable-next-line no-console
      console.warn("Clipboard copy failed")
    }
  }

  return (
    <>
      <AlertDialog.Header>
        <AlertDialog.Title>Delete {resourceName}</AlertDialog.Title>
      </AlertDialog.Header>
      <AlertDialog.Body className={s.Content}>
        <div className={s.Section}>
          {errorMessage && <Alert color="danger" variant="soft" description={errorMessage} />}
          <AlertDialog.Description className={s.Description}>
            This action cannot be undone. This will permanently delete the{" "}
            <span className={s.ResourceName}>{resourceName}</span> {resourceType.toLowerCase()}.
          </AlertDialog.Description>
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
            value={confirmation}
            onValueChange={setConfirmation}
            disabled={busy}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label={`Type ${resourceName} to confirm deletion`}
          />
        </div>
      </AlertDialog.Body>
      <AlertDialog.Footer className={s.Footer}>
        <AlertDialog.Close disabled={busy} render={<Button variant="outline" />}>
          Cancel
        </AlertDialog.Close>
        <AlertDialog.Close
          value="confirm"
          disabled={!isConfirmed || busy}
          action={() => onDelete()}
          render={<Button variant="destructive" loading={busy} />}
        >
          {deleteButtonText || `Delete ${resourceType}`}
        </AlertDialog.Close>
      </AlertDialog.Footer>
    </>
  )
}
