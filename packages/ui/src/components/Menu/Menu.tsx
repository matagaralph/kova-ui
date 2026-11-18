"use client"

import { Check, ChevronRight } from "@kova-ui/icons"
import {
  Menu as MenuPrimitive,
  MenuCheckboxItem as MenuCheckboxItemPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuContextTrigger as MenuContextTriggerPrimitive,
  MenuGroup as MenuGroupPrimitive,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuItemIcon as MenuItemIconPrimitive,
  MenuItemIndicator as MenuItemIndicatorPrimitive,
  MenuRadioGroup as MenuRadioGroupPrimitive,
  MenuRadioItem as MenuRadioItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuShortcut as MenuShortcutPrimitive,
  MenuSub as MenuSubPrimitive,
  MenuSubContent as MenuSubContentPrimitive,
  MenuSubTrigger as MenuSubTriggerPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
} from "@ui-sdk/react/menu"
import { type ComponentProps, createElement, type ElementType } from "react"
import { getAlignOffset } from "../../lib/alignOffset.js"
import { mergeClassName } from "../../lib/cn.js"
import { toCssVariables } from "../../lib/helpers.js"
import { mergeStyle } from "../../lib/mergeStyle.js"
import { useLinkComponent } from "../KovaProvider/internal.js"
import s from "./Menu.module.css"

export type MenuProps = ComponentProps<typeof MenuPrimitive>

export function Menu(props: MenuProps) {
  return <MenuPrimitive {...props} />
}

export type MenuTriggerProps = ComponentProps<typeof MenuTriggerPrimitive>

function MenuTrigger(props: MenuTriggerProps) {
  return <MenuTriggerPrimitive {...props} />
}

export type MenuContextTriggerProps = ComponentProps<typeof MenuContextTriggerPrimitive>

function MenuContextTrigger(props: MenuContextTriggerProps) {
  return <MenuContextTriggerPrimitive {...props} />
}

type MenuSizeProps = {
  /** The menu's width, in pixels. Fits the items by default. */
  width?: number | "auto"
  /** The menu's minimum width, in pixels. */
  minWidth?: number | "auto"
  /** The menu's maximum height, in pixels. Never taller than the space beside the trigger. */
  maxHeight?: number
}

const sizeVariables = ({ width, minWidth, maxHeight }: MenuSizeProps) =>
  toCssVariables({
    "menu-width": width,
    "menu-min-width": minWidth,
    "menu-max-height": maxHeight,
  })

export type MenuContentProps = ComponentProps<typeof MenuContentPrimitive> &
  MenuSizeProps & {
    /** @default 300 */
    minWidth?: number | "auto"
  }

function MenuContent({
  className,
  style,
  width,
  minWidth,
  maxHeight,
  align,
  alignOffset,
  sideOffset = 5,
  collisionPadding = 12,
  ...props
}: MenuContentProps) {
  return (
    <MenuContentPrimitive
      className={mergeClassName(s.MenuContent, className)}
      style={mergeStyle(sizeVariables({ width, minWidth, maxHeight }), style)}
      align={align}
      alignOffset={getAlignOffset(align ?? "start", alignOffset ?? -5)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

export type MenuItemProps = ComponentProps<typeof MenuItemPrimitive> & {
  /**
   * Renders the item as a link to this URL, with KovaProvider's link component, or an `<a>` for
   * external links.
   */
  href?: string
  /** Opens the link in a new tab. Detected from an `http(s)://` `href` when not set. */
  external?: boolean
}

function MenuItem({ className, href, external, render, ...props }: MenuItemProps) {
  const LinkComponent = useLinkComponent() as ElementType
  const isExternal = external ?? /^https?:\/\//.test(href ?? "")
  const link =
    href === undefined ? undefined : isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" />
    ) : (
      createElement(LinkComponent, { href })
    )

  return (
    <MenuItemPrimitive
      className={mergeClassName(s.MenuItem, className)}
      render={render ?? link}
      {...props}
    />
  )
}

export type MenuCheckboxItemProps = ComponentProps<typeof MenuCheckboxItemPrimitive>

function MenuCheckboxItem({ className, ...props }: MenuCheckboxItemProps) {
  return <MenuCheckboxItemPrimitive className={mergeClassName(s.MenuItem, className)} {...props} />
}

export type MenuRadioGroupProps = ComponentProps<typeof MenuRadioGroupPrimitive>

function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <MenuRadioGroupPrimitive {...props} />
}

export type MenuRadioItemProps = ComponentProps<typeof MenuRadioItemPrimitive>

function MenuRadioItem({ className, ...props }: MenuRadioItemProps) {
  return <MenuRadioItemPrimitive className={mergeClassName(s.MenuItem, className)} {...props} />
}

export type MenuItemIndicatorProps = ComponentProps<typeof MenuItemIndicatorPrimitive> & {
  /**
   * `solid` draws a ring that fills with the primary color when checked. `ghost` shows only the
   * check mark.
   * @default solid
   */
  variant?: "solid" | "ghost"
}

function MenuItemIndicator({
  className,
  variant = "solid",
  keepMounted = true,
  children = <Check />,
  ...props
}: MenuItemIndicatorProps) {
  return (
    <MenuItemIndicatorPrimitive
      className={mergeClassName(s.MenuItemIndicator, className)}
      data-variant={variant}
      keepMounted={keepMounted}
      {...props}
    >
      {children}
    </MenuItemIndicatorPrimitive>
  )
}

export type MenuItemIconProps = ComponentProps<typeof MenuItemIconPrimitive>

function MenuItemIcon({ className, ...props }: MenuItemIconProps) {
  return <MenuItemIconPrimitive className={mergeClassName(s.MenuItemIcon, className)} {...props} />
}

export type MenuShortcutProps = ComponentProps<typeof MenuShortcutPrimitive>

function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return <MenuShortcutPrimitive className={mergeClassName(s.MenuShortcut, className)} {...props} />
}

export type MenuGroupProps = ComponentProps<typeof MenuGroupPrimitive>

function MenuGroup(props: MenuGroupProps) {
  return <MenuGroupPrimitive {...props} />
}

export type MenuGroupLabelProps = ComponentProps<typeof MenuGroupLabelPrimitive>

function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  return (
    <MenuGroupLabelPrimitive className={mergeClassName(s.MenuGroupLabel, className)} {...props} />
  )
}

export type MenuSeparatorProps = ComponentProps<typeof MenuSeparatorPrimitive>

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <MenuSeparatorPrimitive className={mergeClassName(s.MenuSeparator, className)} {...props} />
  )
}

export type MenuSubProps = ComponentProps<typeof MenuSubPrimitive>

function MenuSub(props: MenuSubProps) {
  return <MenuSubPrimitive {...props} />
}

export type MenuSubTriggerProps = ComponentProps<typeof MenuSubTriggerPrimitive>

function MenuSubTrigger({ className, children, ...props }: MenuSubTriggerProps) {
  return (
    <MenuSubTriggerPrimitive className={mergeClassName(s.MenuItem, className)} {...props}>
      {(state) => (
        <>
          {typeof children === "function" ? children(state) : children}
          <ChevronRight aria-hidden className={s.MenuSubTriggerIcon} />
        </>
      )}
    </MenuSubTriggerPrimitive>
  )
}

export type MenuSubContentProps = ComponentProps<typeof MenuSubContentPrimitive> & MenuSizeProps

function MenuSubContent({
  className,
  style,
  width,
  minWidth = "auto",
  maxHeight,
  sideOffset = 4,
  collisionPadding = 12,
  ...props
}: MenuSubContentProps) {
  return (
    <MenuSubContentPrimitive
      className={mergeClassName(s.MenuContent, className)}
      style={mergeStyle(sizeVariables({ width, minWidth, maxHeight }), style)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

Menu.Sub = MenuSub
Menu.Item = MenuItem
Menu.Group = MenuGroup
Menu.Content = MenuContent
Menu.Trigger = MenuTrigger
Menu.ItemIcon = MenuItemIcon
Menu.Shortcut = MenuShortcut
Menu.RadioItem = MenuRadioItem
Menu.Separator = MenuSeparator
Menu.GroupLabel = MenuGroupLabel
Menu.RadioGroup = MenuRadioGroup
Menu.SubContent = MenuSubContent
Menu.SubTrigger = MenuSubTrigger
Menu.CheckboxItem = MenuCheckboxItem
Menu.ItemIndicator = MenuItemIndicator
Menu.ContextTrigger = MenuContextTrigger
