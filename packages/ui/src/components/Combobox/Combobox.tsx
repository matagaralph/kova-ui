"use client"

import { Check, ChevronUpDownLg, Minus, Plus, X } from "@kova-ui/icons"
import {
  Combobox as ComboboxPrimitive,
  ComboboxChip as ComboboxChipPrimitive,
  ComboboxChipRemove as ComboboxChipRemovePrimitive,
  ComboboxChips as ComboboxChipsPrimitive,
  ComboboxChipsOverflow as ComboboxChipsOverflowPrimitive,
  ComboboxClear as ComboboxClearPrimitive,
  ComboboxContent as ComboboxContentPrimitive,
  ComboboxCreate as ComboboxCreatePrimitive,
  ComboboxEmpty as ComboboxEmptyPrimitive,
  ComboboxGroup as ComboboxGroupPrimitive,
  ComboboxGroupLabel as ComboboxGroupLabelPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxItem as ComboboxItemPrimitive,
  ComboboxItemIcon as ComboboxItemIconPrimitive,
  ComboboxItemIndicator as ComboboxItemIndicatorPrimitive,
  ComboboxItemText as ComboboxItemTextPrimitive,
  ComboboxLabel as ComboboxLabelPrimitive,
  ComboboxList as ComboboxListPrimitive,
  type ComboboxProps as ComboboxPrimitiveProps,
  ComboboxSelectAll as ComboboxSelectAllPrimitive,
  ComboboxSeparator as ComboboxSeparatorPrimitive,
  ComboboxStatus as ComboboxStatusPrimitive,
  ComboboxTrigger as ComboboxTriggerPrimitive,
  ComboboxValue as ComboboxValuePrimitive,
  ComboboxValueIcon as ComboboxValueIconPrimitive,
} from "@ui-sdk/react/combobox"
import { type ComponentProps, createContext, use, useState } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import type { ControlSize, Sizes, Variants } from "../../types.js"
import fieldStyles from "../Field/Field.module.css"
import listStyles from "../Select/Select.module.css"
import tagStyles from "../TagInput/TagInput.module.css"
import s from "./Combobox.module.css"

const ComboboxAnchorContext = createContext<{
  anchor: HTMLElement | null
  setAnchor: (element: HTMLElement | null) => void
} | null>(null)

export type ComboboxProps<
  T = string,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitiveProps<T, Multiple>

export function Combobox<T = string, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<T, Multiple>,
) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  return (
    <ComboboxAnchorContext value={{ anchor, setAnchor }}>
      <ComboboxPrimitive<T, Multiple> {...props} />
    </ComboboxAnchorContext>
  )
}

export type ComboboxLabelProps = ComponentProps<typeof ComboboxLabelPrimitive>

function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  return (
    <ComboboxLabelPrimitive
      className={mergeClassName(fieldStyles.FieldLabel, className)}
      {...props}
    />
  )
}

export type ComboboxControlProps = ComponentProps<"div"> & {
  /** @default "outline" */
  variant?: Variants<"outline" | "soft">
  /** @default "md" */
  size?: ControlSize
  /** Fully rounded ends. */
  pill?: boolean
}

/**
 * Kova's field frame around a single combobox's input, clear button and trigger. The list opens
 * against it and matches its width.
 */
function ComboboxControl({
  variant = "outline",
  size = "md",
  pill,
  className,
  ref,
  ...props
}: ComboboxControlProps) {
  const context = use(ComboboxAnchorContext)
  return (
    <div
      ref={(element) => {
        context?.setAnchor(element)
        if (typeof ref === "function") return ref(element)
        if (ref) ref.current = element
      }}
      className={cn(s.ComboboxControl, className)}
      data-variant={variant}
      data-size={size}
      data-pill={pill ? "" : undefined}
      {...props}
    />
  )
}

export type ComboboxInputProps = ComponentProps<typeof ComboboxInputPrimitive>

function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return (
    <ComboboxInputPrimitive className={mergeClassName(s.ComboboxInput, className)} {...props} />
  )
}

export type ComboboxTriggerProps = ComponentProps<typeof ComboboxTriggerPrimitive>

/** Shows Kova's dropdown icon when it has no children. */
function ComboboxTrigger({ className, children, ...props }: ComboboxTriggerProps) {
  return (
    <ComboboxTriggerPrimitive className={mergeClassName(s.ComboboxTrigger, className)} {...props}>
      {children ?? <ChevronUpDownLg aria-hidden className={s.ComboboxTriggerIcon} />}
    </ComboboxTriggerPrimitive>
  )
}

export type ComboboxClearProps = ComponentProps<typeof ComboboxClearPrimitive>

function ComboboxClear({
  className,
  children,
  "aria-label": ariaLabel = "Clear current value",
  ...props
}: ComboboxClearProps) {
  return (
    <ComboboxClearPrimitive
      className={mergeClassName(s.ComboboxClear, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children ?? <X aria-hidden />}
    </ComboboxClearPrimitive>
  )
}

export type ComboboxChipsProps = ComponentProps<typeof ComboboxChipsPrimitive> & {
  /** @default "md" */
  size?: Sizes<"md" | "lg" | "xl" | "2xl" | "3xl">
}

/** Kova's field frame around the chips and input of a multiple combobox. */
function ComboboxChips({ className, size = "md", ...props }: ComboboxChipsProps) {
  return (
    <ComboboxChipsPrimitive
      className={mergeClassName(cn(tagStyles.TagInputControl, s.ComboboxChips), className)}
      data-size={size}
      {...props}
    />
  )
}

export type ComboboxChipProps<T = string> = ComponentProps<typeof ComboboxChipPrimitive<T>>

function ComboboxChip<T = string>({ className, ...props }: ComboboxChipProps<T>) {
  return (
    <ComboboxChipPrimitive<T>
      className={mergeClassName(tagStyles.TagInputTag, className)}
      {...props}
    />
  )
}

export type ComboboxChipRemoveProps = ComponentProps<typeof ComboboxChipRemovePrimitive>

/** Shows Kova's close icon when it has no children. Name it, like `aria-label="Remove Japan"`. */
function ComboboxChipRemove({ className, children, ...props }: ComboboxChipRemoveProps) {
  return (
    <ComboboxChipRemovePrimitive
      className={mergeClassName(tagStyles.TagInputTagRemove, className)}
      {...props}
    >
      {children ?? <X aria-hidden />}
    </ComboboxChipRemovePrimitive>
  )
}

export type ComboboxChipsOverflowProps = ComponentProps<typeof ComboboxChipsOverflowPrimitive>

function ComboboxChipsOverflow({ className, ...props }: ComboboxChipsOverflowProps) {
  return (
    <ComboboxChipsOverflowPrimitive
      className={mergeClassName(s.ComboboxChipsOverflow, className)}
      {...props}
    />
  )
}

export type ComboboxValueProps = ComponentProps<typeof ComboboxValuePrimitive>

function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxValuePrimitive {...props} />
}

export type ComboboxValueIconProps = ComponentProps<typeof ComboboxValueIconPrimitive>

function ComboboxValueIcon({ className, ...props }: ComboboxValueIconProps) {
  return (
    <ComboboxValueIconPrimitive
      className={mergeClassName(cn(listStyles.SelectItemIcon, s.ComboboxValueIcon), className)}
      {...props}
    />
  )
}

export type ComboboxContentProps = ComponentProps<typeof ComboboxContentPrimitive>

/** Opens against the `ComboboxControl` around the input, when there is one. */
function ComboboxContent({ className, sideOffset = 5, anchor, ...props }: ComboboxContentProps) {
  const context = use(ComboboxAnchorContext)
  return (
    <ComboboxContentPrimitive
      className={mergeClassName(cn(listStyles.SelectContent, s.ComboboxContent), className)}
      sideOffset={sideOffset}
      anchor={anchor ?? context?.anchor ?? undefined}
      {...props}
    />
  )
}

export type ComboboxListProps = ComponentProps<typeof ComboboxListPrimitive>

function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxListPrimitive
      className={mergeClassName(listStyles.SelectList, className)}
      {...props}
    />
  )
}

export type ComboboxEmptyProps = ComponentProps<typeof ComboboxEmptyPrimitive>

function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxEmptyPrimitive
      className={mergeClassName(listStyles.SelectEmpty, className)}
      {...props}
    />
  )
}

export type ComboboxStatusProps = ComponentProps<typeof ComboboxStatusPrimitive>

function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  return (
    <ComboboxStatusPrimitive
      className={mergeClassName(listStyles.SelectStatus, className)}
      {...props}
    />
  )
}

export type ComboboxItemProps<T = string> = ComponentProps<typeof ComboboxItemPrimitive<T>>

function ComboboxItem<T = string>({ className, ...props }: ComboboxItemProps<T>) {
  return (
    <ComboboxItemPrimitive<T>
      className={mergeClassName(listStyles.SelectItem, className)}
      {...props}
    />
  )
}

export type ComboboxItemTextProps = ComponentProps<typeof ComboboxItemTextPrimitive>

function ComboboxItemText({ className, ...props }: ComboboxItemTextProps) {
  return (
    <ComboboxItemTextPrimitive
      className={mergeClassName(listStyles.SelectItemText, className)}
      {...props}
    />
  )
}

export type ComboboxItemDescriptionProps = ComponentProps<"span">

/**
 * Secondary text on its own line under the item's label. Give the item a `label` so filtering
 * and the input use only the label.
 */
function ComboboxItemDescription({ className, ...props }: ComboboxItemDescriptionProps) {
  return <span className={cn(listStyles.SelectItemDescription, className)} {...props} />
}

export type ComboboxItemIndicatorProps = ComponentProps<typeof ComboboxItemIndicatorPrimitive>

/** Kova's check mark, at the start of a selected item. */
function ComboboxItemIndicator({ className, children, ...props }: ComboboxItemIndicatorProps) {
  return (
    <ComboboxItemIndicatorPrimitive
      className={mergeClassName(listStyles.SelectItemIndicator, className)}
      {...props}
    >
      {children ?? <Check aria-hidden />}
    </ComboboxItemIndicatorPrimitive>
  )
}

export type ComboboxItemIconProps = ComponentProps<typeof ComboboxItemIconPrimitive>

function ComboboxItemIcon({ className, ...props }: ComboboxItemIconProps) {
  return (
    <ComboboxItemIconPrimitive
      className={mergeClassName(listStyles.SelectItemIcon, className)}
      {...props}
    />
  )
}

export type ComboboxSelectAllProps = ComponentProps<typeof ComboboxSelectAllPrimitive>

/** Shows a check while every item is selected and a dash while some are. Its text defaults to "Select all". */
function ComboboxSelectAll({ className, children, ...props }: ComboboxSelectAllProps) {
  return (
    <ComboboxSelectAllPrimitive
      className={mergeClassName(listStyles.SelectItem, className)}
      {...props}
    >
      {(state) => (
        <>
          <span className={listStyles.SelectItemIndicator}>
            {state.checked ? (
              <Check aria-hidden />
            ) : state.indeterminate ? (
              <Minus aria-hidden />
            ) : null}
          </span>
          {typeof children === "function" ? children(state) : (children ?? "Select all")}
        </>
      )}
    </ComboboxSelectAllPrimitive>
  )
}

export type ComboboxCreateProps = ComponentProps<typeof ComboboxCreatePrimitive>

/** Shows a plus and `Create "query"` when it has no children. */
function ComboboxCreate({ className, children, ...props }: ComboboxCreateProps) {
  return (
    <ComboboxCreatePrimitive
      className={mergeClassName(cn(listStyles.SelectItem, s.ComboboxCreate), className)}
      {...props}
    >
      {(state) => (
        <>
          <span className={listStyles.SelectItemIndicator}>
            <Plus aria-hidden />
          </span>
          {typeof children === "function"
            ? children(state)
            : (children ?? `Create “${state.query}”`)}
        </>
      )}
    </ComboboxCreatePrimitive>
  )
}

export type ComboboxGroupProps = ComponentProps<typeof ComboboxGroupPrimitive>

function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxGroupPrimitive
      className={mergeClassName(listStyles.SelectGroup, className)}
      {...props}
    />
  )
}

export type ComboboxGroupLabelProps = ComponentProps<typeof ComboboxGroupLabelPrimitive>

function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return (
    <ComboboxGroupLabelPrimitive
      className={mergeClassName(listStyles.SelectGroupLabel, className)}
      {...props}
    />
  )
}

export type ComboboxSeparatorProps = ComponentProps<typeof ComboboxSeparatorPrimitive>

function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  return (
    <ComboboxSeparatorPrimitive
      className={mergeClassName(listStyles.SelectSeparator, className)}
      {...props}
    />
  )
}

Combobox.Chip = ComboboxChip
Combobox.Item = ComboboxItem
Combobox.List = ComboboxList
Combobox.Chips = ComboboxChips
Combobox.Clear = ComboboxClear
Combobox.Empty = ComboboxEmpty
Combobox.Group = ComboboxGroup
Combobox.Input = ComboboxInput
Combobox.Label = ComboboxLabel
Combobox.Value = ComboboxValue
Combobox.Create = ComboboxCreate
Combobox.Status = ComboboxStatus
Combobox.Content = ComboboxContent
Combobox.Control = ComboboxControl
Combobox.Trigger = ComboboxTrigger
Combobox.ItemIcon = ComboboxItemIcon
Combobox.ItemText = ComboboxItemText
Combobox.SelectAll = ComboboxSelectAll
Combobox.Separator = ComboboxSeparator
Combobox.ValueIcon = ComboboxValueIcon
Combobox.ChipRemove = ComboboxChipRemove
Combobox.GroupLabel = ComboboxGroupLabel
Combobox.ChipsOverflow = ComboboxChipsOverflow
Combobox.ItemIndicator = ComboboxItemIndicator
Combobox.ItemDescription = ComboboxItemDescription
