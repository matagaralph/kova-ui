"use client"

import { Check, Minus, Search, X } from "@kova-ui/icons"
import {
  Select as SelectPrimitive,
  SelectClear as SelectClearPrimitive,
  SelectContent as SelectContentPrimitive,
  SelectEmpty as SelectEmptyPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectGroupLabel as SelectGroupLabelPrimitive,
  SelectInput as SelectInputPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectItemIcon as SelectItemIconPrimitive,
  SelectItemIndicator as SelectItemIndicatorPrimitive,
  SelectItemText as SelectItemTextPrimitive,
  SelectLabel as SelectLabelPrimitive,
  SelectList as SelectListPrimitive,
  type SelectProps as SelectPrimitiveProps,
  SelectSelectAll as SelectSelectAllPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectStatus as SelectStatusPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
  SelectValueIcon as SelectValueIconPrimitive,
} from "@ui-sdk/react/select"
import type { ComponentProps } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import fieldStyles from "../Field/Field.module.css"
import { SelectControl, type SelectControlProps } from "../SelectControl/index.js"
import controlStyles from "../SelectControl/SelectControl.module.css"
import s from "./Select.module.css"

export type SelectProps<
  T = string,
  Multiple extends boolean | undefined = false,
> = SelectPrimitiveProps<T, Multiple>

export function Select<T = string, Multiple extends boolean | undefined = false>(
  props: SelectProps<T, Multiple>,
) {
  return <SelectPrimitive<T, Multiple> {...props} />
}

export type SelectLabelProps = ComponentProps<typeof SelectLabelPrimitive>

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectLabelPrimitive
      className={mergeClassName(fieldStyles.FieldLabel, className)}
      {...props}
    />
  )
}

export type SelectTriggerProps = Omit<ComponentProps<typeof SelectTriggerPrimitive>, "render"> &
  Pick<
    SelectControlProps,
    | "variant"
    | "size"
    | "pill"
    | "block"
    | "opticallyAlign"
    | "loading"
    | "dropdownIconType"
    | "StartIcon"
  >

/** Renders Kova's `SelectControl`, with a `SelectValue` inside when it has no children. */
function SelectTrigger({
  variant = "outline",
  size = "md",
  pill,
  block,
  opticallyAlign,
  loading,
  dropdownIconType,
  StartIcon,
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectTriggerPrimitive
      className={className}
      render={
        <SelectControl
          variant={variant}
          size={size}
          pill={pill}
          block={block ?? variant !== "ghost"}
          opticallyAlign={opticallyAlign}
          loading={loading}
          dropdownIconType={dropdownIconType}
          StartIcon={StartIcon}
        />
      }
      {...props}
    >
      {children ?? <SelectValuePrimitive />}
    </SelectTriggerPrimitive>
  )
}

export type SelectValueProps = ComponentProps<typeof SelectValuePrimitive>

function SelectValue(props: SelectValueProps) {
  return <SelectValuePrimitive {...props} />
}

export type SelectValueIconProps = ComponentProps<typeof SelectValueIconPrimitive>

function SelectValueIcon(props: SelectValueIconProps) {
  return <SelectValueIconPrimitive {...props} />
}

export type SelectClearProps = ComponentProps<typeof SelectClearPrimitive>

/** Sits inside the end of the trigger right before it. Render it as the trigger's next sibling. */
function SelectClear({
  className,
  children,
  "aria-label": ariaLabel = "Clear current value",
  ...props
}: SelectClearProps) {
  return (
    <SelectClearPrimitive
      className={mergeClassName(controlStyles.SelectControlClear, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children ?? <X aria-hidden />}
    </SelectClearPrimitive>
  )
}

export type SelectContentProps = ComponentProps<typeof SelectContentPrimitive>

function SelectContent({ className, sideOffset = 5, ...props }: SelectContentProps) {
  return (
    <SelectContentPrimitive
      className={mergeClassName(s.SelectContent, className)}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export type SelectListProps = ComponentProps<typeof SelectListPrimitive>

function SelectList({ className, ...props }: SelectListProps) {
  return <SelectListPrimitive className={mergeClassName(s.SelectList, className)} {...props} />
}

export type SelectInputProps = ComponentProps<typeof SelectInputPrimitive>

/** A search field at the top of the content, with Kova's search icon before it. */
function SelectInput({ className, ...props }: SelectInputProps) {
  return (
    <div className={s.SelectSearch}>
      <Search aria-hidden className={s.SelectSearchIcon} />
      <SelectInputPrimitive className={mergeClassName(s.SelectInput, className)} {...props} />
    </div>
  )
}

export type SelectEmptyProps = ComponentProps<typeof SelectEmptyPrimitive>

function SelectEmpty({ className, ...props }: SelectEmptyProps) {
  return <SelectEmptyPrimitive className={mergeClassName(s.SelectEmpty, className)} {...props} />
}

export type SelectStatusProps = ComponentProps<typeof SelectStatusPrimitive>

function SelectStatus({ className, ...props }: SelectStatusProps) {
  return <SelectStatusPrimitive className={mergeClassName(s.SelectStatus, className)} {...props} />
}

export type SelectItemProps<T = string> = ComponentProps<typeof SelectItemPrimitive<T>>

function SelectItem<T = string>({ className, ...props }: SelectItemProps<T>) {
  return <SelectItemPrimitive<T> className={mergeClassName(s.SelectItem, className)} {...props} />
}

export type SelectItemTextProps = ComponentProps<typeof SelectItemTextPrimitive>

function SelectItemText({ className, ...props }: SelectItemTextProps) {
  return (
    <SelectItemTextPrimitive className={mergeClassName(s.SelectItemText, className)} {...props} />
  )
}

export type SelectItemDescriptionProps = ComponentProps<"span">

/**
 * Secondary text on its own line under the item's label. Give the item a `label` so typeahead and
 * the trigger use only the label.
 */
function SelectItemDescription({ className, ...props }: SelectItemDescriptionProps) {
  return <span className={cn(s.SelectItemDescription, className)} {...props} />
}

export type SelectItemIndicatorProps = ComponentProps<typeof SelectItemIndicatorPrimitive>

/** Kova's check mark, at the start of a selected item. */
function SelectItemIndicator({ className, children, ...props }: SelectItemIndicatorProps) {
  return (
    <SelectItemIndicatorPrimitive
      className={mergeClassName(s.SelectItemIndicator, className)}
      {...props}
    >
      {children ?? <Check aria-hidden />}
    </SelectItemIndicatorPrimitive>
  )
}

export type SelectItemIconProps = ComponentProps<typeof SelectItemIconPrimitive>

function SelectItemIcon({ className, ...props }: SelectItemIconProps) {
  return (
    <SelectItemIconPrimitive className={mergeClassName(s.SelectItemIcon, className)} {...props} />
  )
}

export type SelectSelectAllProps = ComponentProps<typeof SelectSelectAllPrimitive>

/** Shows a check while every item is selected and a dash while some are. Its text defaults to "Select all". */
function SelectSelectAll({ className, children, ...props }: SelectSelectAllProps) {
  return (
    <SelectSelectAllPrimitive className={mergeClassName(s.SelectItem, className)} {...props}>
      {(state) => (
        <>
          <span className={s.SelectItemIndicator}>
            {state.checked ? (
              <Check aria-hidden />
            ) : state.indeterminate ? (
              <Minus aria-hidden />
            ) : null}
          </span>
          {typeof children === "function" ? children(state) : (children ?? "Select all")}
        </>
      )}
    </SelectSelectAllPrimitive>
  )
}

export type SelectGroupProps = ComponentProps<typeof SelectGroupPrimitive>

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return <SelectGroupPrimitive className={mergeClassName(s.SelectGroup, className)} {...props} />
}

export type SelectGroupLabelProps = ComponentProps<typeof SelectGroupLabelPrimitive>

function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <SelectGroupLabelPrimitive
      className={mergeClassName(s.SelectGroupLabel, className)}
      {...props}
    />
  )
}

export type SelectSeparatorProps = ComponentProps<typeof SelectSeparatorPrimitive>

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectSeparatorPrimitive className={mergeClassName(s.SelectSeparator, className)} {...props} />
  )
}

Select.Item = SelectItem
Select.List = SelectList
Select.Clear = SelectClear
Select.Empty = SelectEmpty
Select.Group = SelectGroup
Select.Input = SelectInput
Select.Label = SelectLabel
Select.Value = SelectValue
Select.Status = SelectStatus
Select.Content = SelectContent
Select.Trigger = SelectTrigger
Select.ItemIcon = SelectItemIcon
Select.ItemText = SelectItemText
Select.SelectAll = SelectSelectAll
Select.Separator = SelectSeparator
Select.ValueIcon = SelectValueIcon
Select.GroupLabel = SelectGroupLabel
Select.ItemIndicator = SelectItemIndicator
Select.ItemDescription = SelectItemDescription
