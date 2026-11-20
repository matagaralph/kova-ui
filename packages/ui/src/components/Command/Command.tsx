"use client"

import { Search } from "@kova-ui/icons"
import {
  Command as CommandPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandGroupLabel as CommandGroupLabelPrimitive,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandItemIcon as CommandItemIconPrimitive,
  CommandItemText as CommandItemTextPrimitive,
  CommandList as CommandListPrimitive,
  CommandPage as CommandPagePrimitive,
  CommandSeparator as CommandSeparatorPrimitive,
  CommandShortcut as CommandShortcutPrimitive,
  CommandStatus as CommandStatusPrimitive,
  type CommandData,
  type CommandDataItem,
} from "@ui-sdk/react/command"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./Command.module.css"

export type CommandProps = ComponentProps<typeof CommandPrimitive>

export function Command({ className, ...props }: CommandProps) {
  return <CommandPrimitive className={mergeClassName(s.Command, className)} {...props} />
}

export type CommandInputProps = ComponentProps<typeof CommandInputPrimitive>

/** The search field, with Kova's search icon before it. */
function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div className={s.CommandSearch}>
      <Search aria-hidden="true" className={s.CommandSearchIcon} />
      <CommandInputPrimitive className={mergeClassName(s.CommandInput, className)} {...props} />
    </div>
  )
}

export type CommandListProps = ComponentProps<typeof CommandListPrimitive>

/** Renders the command's `items` with Kova's parts when it has no children. */
function CommandList({ className, children, ...props }: CommandListProps) {
  return (
    <CommandListPrimitive className={mergeClassName(s.CommandList, className)} {...props}>
      {children ?? ((state) => <CommandItems items={state.items} />)}
    </CommandListPrimitive>
  )
}

export type CommandItemProps = ComponentProps<typeof CommandItemPrimitive>

function CommandItem({ className, ...props }: CommandItemProps) {
  return <CommandItemPrimitive className={mergeClassName(s.CommandItem, className)} {...props} />
}

export type CommandItemTextProps = ComponentProps<typeof CommandItemTextPrimitive>

function CommandItemText({ className, ...props }: CommandItemTextProps) {
  return (
    <CommandItemTextPrimitive className={mergeClassName(s.CommandItemText, className)} {...props} />
  )
}

export type CommandItemIconProps = ComponentProps<typeof CommandItemIconPrimitive>

function CommandItemIcon({ className, ...props }: CommandItemIconProps) {
  return (
    <CommandItemIconPrimitive className={mergeClassName(s.CommandItemIcon, className)} {...props} />
  )
}

export type CommandShortcutProps = ComponentProps<typeof CommandShortcutPrimitive>

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <CommandShortcutPrimitive className={mergeClassName(s.CommandShortcut, className)} {...props} />
  )
}

export type CommandGroupProps = ComponentProps<typeof CommandGroupPrimitive>

function CommandGroup({ className, ...props }: CommandGroupProps) {
  return <CommandGroupPrimitive className={mergeClassName(s.CommandGroup, className)} {...props} />
}

export type CommandGroupLabelProps = ComponentProps<typeof CommandGroupLabelPrimitive>

function CommandGroupLabel({ className, ...props }: CommandGroupLabelProps) {
  return (
    <CommandGroupLabelPrimitive
      className={mergeClassName(s.CommandGroupLabel, className)}
      {...props}
    />
  )
}

export type CommandSeparatorProps = ComponentProps<typeof CommandSeparatorPrimitive>

function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  return (
    <CommandSeparatorPrimitive
      className={mergeClassName(s.CommandSeparator, className)}
      {...props}
    />
  )
}

export type CommandEmptyProps = ComponentProps<typeof CommandEmptyPrimitive>

function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return <CommandEmptyPrimitive className={mergeClassName(s.CommandEmpty, className)} {...props} />
}

export type CommandStatusProps = ComponentProps<typeof CommandStatusPrimitive>

function CommandStatus({ className, ...props }: CommandStatusProps) {
  return (
    <CommandStatusPrimitive className={mergeClassName(s.CommandStatus, className)} {...props} />
  )
}

export type CommandPageProps = ComponentProps<typeof CommandPagePrimitive>

function CommandPage(props: CommandPageProps) {
  return <CommandPagePrimitive {...props} />
}

export type CommandItemsProps = {
  /** Commands, groups and separators, like the list's ranked `state.items`. */
  items: CommandData
}

/** Renders commands as data with Kova's parts: matched text, shortcuts, groups and separators. */
function CommandItems({ items }: CommandItemsProps) {
  return items.map((item, index) => {
    if (typeof item === "string") {
      return (
        <CommandItem key={item} value={item}>
          <CommandItemText>{item}</CommandItemText>
        </CommandItem>
      )
    }
    if ("type" in item && item.type === "separator") {
      return <CommandSeparator key={`separator-${index}`} />
    }
    if ("type" in item && item.type === "group") {
      return (
        <CommandGroup key={item.label}>
          <CommandGroupLabel>{item.label}</CommandGroupLabel>
          <CommandItems items={item.items} />
        </CommandGroup>
      )
    }
    const command = item as CommandDataItem
    return (
      <CommandItem
        key={command.value}
        value={command.value}
        label={command.label}
        keywords={command.keywords}
        disabled={command.disabled}
        shortcut={command.shortcut}
      >
        <CommandItemText>{command.label}</CommandItemText>
        {command.shortcut && <CommandShortcut />}
      </CommandItem>
    )
  })
}

Command.Item = CommandItem
Command.List = CommandList
Command.Page = CommandPage
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Input = CommandInput
Command.Items = CommandItems
Command.Status = CommandStatus
Command.ItemIcon = CommandItemIcon
Command.ItemText = CommandItemText
Command.Shortcut = CommandShortcut
Command.Separator = CommandSeparator
Command.GroupLabel = CommandGroupLabel
