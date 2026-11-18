"use client"

import { X } from "@kova-ui/icons"
import {
  Combobox as ComboboxPrimitive,
  ComboboxChip as ComboboxChipPrimitive,
  ComboboxChipRemove as ComboboxChipRemovePrimitive,
  ComboboxChips as ComboboxChipsPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  type ComboboxProps,
  ComboboxValue as ComboboxValuePrimitive,
  createComboboxController,
} from "@ui-sdk/react/combobox"
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  type ReactNode,
  use,
  useState,
} from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import type { Sizes } from "../../types.js"
import s from "./TagInput.module.css"

const DEFAULT_DELIMITERS = [",", " "]
const SHAKE_DURATION_MS = 500

type TagInputContextValue = {
  addTags: (texts: string[], event?: Event) => void
  isValid: (tag: string) => boolean
  isDuplicate: (tag: string) => boolean
  delimiters: string[]
  maxTags: number | undefined
}

const TagInputContext = createContext<TagInputContextValue | null>(null)

const useTagInputContext = () => {
  const context = use(TagInputContext)
  if (!context) throw new Error("TagInput parts must be inside a <TagInput>")
  return context
}

export type TagInputProps = Omit<
  ComboboxProps<string, true>,
  | "multiple"
  | "maxSelected"
  | "items"
  | "emptyItems"
  | "filter"
  | "allowCustomValue"
  | "keepQuery"
  | "autoHighlight"
  | "presentation"
> & {
  /**
   * Whether a tag is valid. Invalid tags stay in the value and show in red, so people can see and
   * fix them.
   */
  validator?: (tag: string) => boolean
  /**
   * Keys that turn the typed text into a tag, besides Enter. Pasted text is split on them too.
   * @default [",", " "]
   */
  delimiters?: string[]
  /** How many tags it accepts. `TagInputCount` shows the count against it. */
  maxTags?: number
}

/**
 * A multiple `Combobox` whose values are the tags people type. It holds the value, and turns text
 * into tags on Enter, a delimiter, Tab, paste and blur.
 */
export function TagInput({
  validator,
  delimiters = DEFAULT_DELIMITERS,
  maxTags,
  controller: controllerProp,
  onOpenChange,
  children,
  ...props
}: TagInputProps) {
  const [ownController] = useState(() => createComboboxController<string, true>())
  const controller = controllerProp ?? ownController
  const [duplicates, setDuplicates] = useState<ReadonlySet<string>>(() => new Set())

  const flagDuplicate = (tag: string) => {
    setDuplicates((current) => new Set(current).add(tag))
    setTimeout(() => {
      setDuplicates((current) => {
        const next = new Set(current)
        next.delete(tag)
        return next
      })
    }, SHAKE_DURATION_MS)
  }

  const addTags = (texts: string[], event?: Event) => {
    const current = controller.getValue() ?? []
    const next = [...current]
    for (const text of texts) {
      const tag = text.trim()
      if (!tag) continue
      if (next.includes(tag)) {
        flagDuplicate(tag)
        continue
      }
      if (maxTags !== undefined && next.length >= maxTags) break
      next.push(tag)
    }
    if (next.length !== current.length) {
      controller.setValue(next, { reason: "input-change", event })
    }
    controller.setQuery("", { reason: "input-change", event })
  }

  return (
    <TagInputContext
      value={{
        addTags,
        isValid: (tag) => validator?.(tag) ?? true,
        isDuplicate: (tag) => duplicates.has(tag),
        delimiters,
        maxTags,
      }}
    >
      <ComboboxPrimitive<string, true>
        multiple
        maxSelected={maxTags}
        controller={controller}
        // Tags come from typing only, so there is no list to open.
        onOpenChange={(open, details) => {
          if (open) details.cancel()
          else onOpenChange?.(open, details)
        }}
        {...props}
      >
        {children}
      </ComboboxPrimitive>
    </TagInputContext>
  )
}

export type TagInputControlProps = ComponentProps<typeof ComboboxChipsPrimitive> & {
  /**
   * Matches the height of an `Input` of the same size, for one row.
   * @default "xl"
   */
  size?: Sizes<"md" | "lg" | "xl" | "2xl" | "3xl">
  /**
   * How many rows of tags it is tall at least.
   * @default 1
   */
  rows?: number
}

/** The field's frame, holding the tags and the input. */
function TagInputControl({ size = "xl", rows, className, style, ...props }: TagInputControlProps) {
  const rowsStyle = rows === undefined ? undefined : ({ "--tag-input-rows": rows } as CSSProperties)
  return (
    <ComboboxChipsPrimitive
      className={mergeClassName(s.TagInputControl, className)}
      data-size={size}
      style={
        typeof style === "function"
          ? (state) => ({ ...rowsStyle, ...style(state) })
          : { ...rowsStyle, ...style }
      }
      {...props}
    />
  )
}

export type TagInputValueProps = {
  /** Each tag, or a function of the tags. Defaults to a `TagInputTag` per tag. */
  children?: ReactNode | ((tags: string[]) => ReactNode)
}

/** Renders a `TagInputTag` for each tag. */
function TagInputValue({ children }: TagInputValueProps) {
  return (
    <ComboboxValuePrimitive>
      {(state) => {
        const tags = (state.value as string[] | null) ?? []
        if (typeof children === "function") return children(tags)
        return children ?? tags.map((tag) => <TagInputTag key={tag} value={tag} />)
      }}
    </ComboboxValuePrimitive>
  )
}

export type TagInputTagProps = ComponentProps<typeof ComboboxChipPrimitive<string>>

/** One tag. Shows its text and a remove button when it has no children. */
function TagInputTag({ value, className, children, ...props }: TagInputTagProps) {
  const { isValid, isDuplicate } = useTagInputContext()
  return (
    <ComboboxChipPrimitive<string>
      value={value}
      className={mergeClassName(s.TagInputTag, className)}
      data-invalid={isValid(value) ? undefined : ""}
      data-duplicate={isDuplicate(value) ? "" : undefined}
      {...props}
    >
      {children ?? (
        <>
          <span className={s.TagInputTagLabel} title={value}>
            {value}
          </span>
          <TagInputTagRemove aria-label={`Remove ${value}`} />
        </>
      )}
    </ComboboxChipPrimitive>
  )
}

export type TagInputTagRemoveProps = ComponentProps<typeof ComboboxChipRemovePrimitive>

function TagInputTagRemove({ className, children, ...props }: TagInputTagRemoveProps) {
  return (
    <ComboboxChipRemovePrimitive
      className={mergeClassName(s.TagInputTagRemove, className)}
      {...props}
    >
      {children ?? <X aria-hidden />}
    </ComboboxChipRemovePrimitive>
  )
}

export type TagInputInputProps = ComponentProps<typeof ComboboxInputPrimitive>

const splitOn = (text: string, delimiters: string[]) =>
  [...delimiters, "\n"].reduce<string[]>(
    (parts, delimiter) => parts.flatMap((part) => part.split(delimiter)),
    [text],
  )

/** The text field new tags are typed in. */
function TagInputInput({ className, onKeyDown, onPaste, onBlur, ...props }: TagInputInputProps) {
  const { addTags, delimiters } = useTagInputContext()

  return (
    <ComboboxInputPrimitive
      className={mergeClassName(s.TagInputInput, className)}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        const text = event.currentTarget.value
        if (event.key === "Enter" || delimiters.includes(event.key)) {
          event.preventDefault()
          addTags([text], event.nativeEvent)
        } else if (event.key === "Tab" && !event.shiftKey && text.trim()) {
          event.preventDefault()
          addTags([text], event.nativeEvent)
        }
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (event.defaultPrevented) return
        const parts = splitOn(event.clipboardData.getData("text"), delimiters).filter((part) =>
          part.trim(),
        )
        if (parts.length > 1) {
          event.preventDefault()
          addTags(parts, event.nativeEvent)
        }
      }}
      onBlur={(event) => {
        onBlur?.(event)
        const chips = event.currentTarget.closest("[data-slot='combobox-chips']")
        const next = event.relatedTarget
        if (next instanceof Node && chips?.contains(next)) return
        if (event.currentTarget.value.trim())
          addTags([event.currentTarget.value], event.nativeEvent)
      }}
      {...props}
    />
  )
}

export type TagInputCountProps = Omit<ComponentProps<"div">, "children">

/** Shows how many tags there are, against `maxTags` when it's set, like "3 / 10". */
function TagInputCount({ className, ...props }: TagInputCountProps) {
  const { maxTags } = useTagInputContext()
  return (
    <ComboboxValuePrimitive>
      {(state) => (
        <div className={cn(s.TagInputCount, className)} {...props}>
          {((state.value as string[] | null) ?? []).length}
          {maxTags !== undefined && (
            <>
              <span className="mx-px">/</span>
              {maxTags}
            </>
          )}
        </div>
      )}
    </ComboboxValuePrimitive>
  )
}

TagInput.Tag = TagInputTag
TagInput.Count = TagInputCount
TagInput.Input = TagInputInput
TagInput.Value = TagInputValue
TagInput.Control = TagInputControl
TagInput.TagRemove = TagInputTagRemove
