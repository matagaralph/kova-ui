/// <reference path="../../global.ts" preserve="true" />
"use client"

import { Menu as BaseMenu } from "@base-ui/react/menu"
import React, {
  type ComponentProps,
  type ComponentType,
  createContext,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { Check, ChevronRight } from "@kova-ui/icons"
import clsx from "clsx"
import { useLatestValue } from "../../hooks/useLatestValue.js"
import { getAlignOffset } from "../../lib/alignOffset.js"
import { toCssVariables } from "../../lib/helpers.js"
import { Button } from "../Button/index.js"
import { useLinkComponent } from "../KovaProvider/internal.js"
import s from "./Menu.module.css"

type MenuContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

const useMenuContext = () => {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error("Menu components must be wrapped in <Menu />")
  }

  return context
}

export type MenuProps = {
  children: React.ReactNode
  /** Force the menu to remain open or closed */
  forceOpen?: boolean
  /** Callback triggered when the modal is opened */
  onOpen?: () => void
  /** Callback triggered when the modal is closed */
  onClose?: () => void
  /**
   * When set to `true`, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   * @default false
   */
  modal?: boolean
}

export const Menu = ({ children, forceOpen, onOpen, onClose, modal = false }: MenuProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const isOpen = forceOpen ?? open

  const latestOnOpen = useLatestValue(onOpen)
  const latestOnClose = useLatestValue(onClose)

  const handleOpenChange = useCallback(
    (nextState: boolean) => {
      setOpen(nextState)
      if (nextState) {
        latestOnOpen.current?.()
      } else {
        latestOnClose.current?.()
      }
    },
    [latestOnOpen, latestOnClose],
  )

  const store = useMemo<MenuContextValue>(
    () => ({
      open: isOpen,
      setOpen: handleOpenChange,
    }),
    [isOpen, handleOpenChange],
  )

  return (
    <MenuContext value={store}>
      <BaseMenu.Root
        open={isOpen}
        onOpenChange={(nextState, details) => {
          if (shouldIgnoreOpenChange(details)) return
          handleOpenChange(nextState)
        }}
        modal={modal}
        loopFocus={false}
      >
        {children}
      </BaseMenu.Root>
    </MenuContext>
  )
}

// `onSelect` runs in the capture phase, before Base UI closes the menu, so that calling
// `preventDefault()` keeps the menu open (see `shouldIgnoreOpenChange`)
const handleSelectCapture =
  (onSelect?: (event: Event) => void) => (event: React.MouseEvent<HTMLDivElement>) =>
    onSelect?.(event.nativeEvent)

const shouldIgnoreOpenChange = (details: BaseMenu.Root.ChangeEventDetails) =>
  details.reason === "item-press" && !!details.event?.defaultPrevented

export type MenuItemProps = {
  className?: string
  children: React.ReactNode
  /** Callback triggered when the item is pressed. Call `event.preventDefault()` to keep the menu open. */
  onSelect?: (event: Event) => void
  /** Callback triggered when the item is clicked */
  onClick?: React.MouseEventHandler<HTMLDivElement>
  /** Disables the menu item */
  disabled?: boolean
}

const Item = ({ className, children, disabled, onSelect, onClick }: MenuItemProps) => {
  // Custom click handlers
  if (onSelect) {
    return (
      <BaseMenu.Item
        className={clsx(s.MenuItem, className)}
        onClickCapture={handleSelectCapture(onSelect)}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={s.PressableInner}>{children}</div>
      </BaseMenu.Item>
    )
  }

  // Read-only content - will not appear interactive.
  return <div className={clsx(s.MenuItemContent, className)}>{children}</div>
}

const ItemActions = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={clsx(s.ItemActions, className)}>{children}</div>
}

const ItemAction = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: (evt: MouseEvent) => void
}) => {
  const { setOpen } = useMenuContext()

  return (
    <Button
      className="rounded-sm"
      color="secondary"
      size="xs"
      uniform
      iconSize="sm"
      variant="ghost"
      onClick={(evt) => {
        evt.stopPropagation()
        setOpen(false)
        onClick(evt)
      }}
    >
      {children}
    </Button>
  )
}

type MenuLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  /** Content rendered inside the Link */
  children: React.ReactNode
  /** Disables the menu item */
  disabled?: boolean
}

type MenuLink = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any> | "a" = Kova.LinkComponent,
>(
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    MenuLinkProps & {
      /**
       * Override the default component used for the link. This is useful for
       * using a routing library, or SSR rendering.
       * purposes.
       *
       * @default 'a'
       */
      as?: T
    } & ComponentProps<T>,
) => ReactNode

const Link = ((props: MenuLinkProps & { href?: string; to?: string; as?: Kova.LinkComponent }) => {
  const { className, children, href, to, disabled, as: OverrideComponent, ...restProps } = props

  const propPath = href || to
  // When a path is not provided, default to an anchor
  const isExternal = propPath ? /^https?:\/\//.test(propPath) : true
  const DefaultComponent = useLinkComponent()
  const Component = OverrideComponent || (isExternal ? "a" : DefaultComponent)

  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer", href: href ?? to }
    : { href, to }

  return (
    <BaseMenu.LinkItem
      className={clsx(s.MenuItem, className)}
      closeOnClick={!disabled}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      render={
        <Component
          {...linkProps}
          {...restProps}
          onClick={
            disabled ? (event: React.MouseEvent) => event.preventDefault() : restProps.onClick
          }
        />
      }
    >
      <span className={s.PressableInner}>{children}</span>
    </BaseMenu.LinkItem>
  )
}) as MenuLink

const Separator = ({ className }: { className?: string }) => {
  return <BaseMenu.Separator className={clsx(s.Separator, className)} />
}

export type MenuContentProps = {
  children: React.ReactNode
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default bottom
   */
  side?: "top" | "right" | "bottom" | "left"
  /**
   * The distance in pixels from the trigger.
   * @default 5
   */
  sideOffset?: number
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: "start" | "center" | "end"
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number
  /**
   * Defines the `width` property of the content
   * @default auto
   */
  width?: number | "auto"
  /**
   * Defines the `min-width` property of the content, in pixels.
   * @default 300
   */
  minWidth?: number | "auto"
  /**
   * Defines the `max-width` property of the content, in pixels.
   */
  maxHeight?: number
}

const Content = ({
  children,
  side,
  sideOffset = 5,
  align,
  alignOffset,
  width,
  minWidth,
  maxHeight,
}: MenuContentProps) => {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className={s.Menu}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={getAlignOffset(align, alignOffset ?? -5)}
        collisionPadding={MENU_COLLISION_PADDING}
      >
        <BaseMenu.Popup
          className={s.MenuList}
          style={toCssVariables({
            "menu-width": width,
            "menu-min-width": minWidth,
            "menu-max-height": maxHeight,
          })}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

const MENU_COLLISION_PADDING = { bottom: 30, top: 30, left: 12, right: 12 }

export type MenuTriggerProps = {
  /** The element that opens the menu. Its props are merged with the trigger's. */
  children: ReactElement
  /** Prevents the menu from opening */
  disabled?: boolean
  /**
   * Whether the trigger renders a native `<button>`. Set to `false` when the child renders another element.
   * @default true
   */
  nativeButton?: boolean
}

const Trigger = ({ children, disabled, nativeButton = true }: MenuTriggerProps) => {
  return <BaseMenu.Trigger render={children} disabled={disabled} nativeButton={nativeButton} />
}

export type SubmenuProps = {
  children: React.ReactNode
  /** Force the menu to remain open or closed */
  forceOpen?: boolean
  /** Callback triggered when the modal is opened */
  onOpen?: () => void
  /** Callback triggered when the modal is closed */
  onClose?: () => void
}

const Sub = ({ children, forceOpen, onOpen, onClose }: SubmenuProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const isOpen = forceOpen ?? open

  const latestOnOpen = useLatestValue(onOpen)
  const latestOnClose = useLatestValue(onClose)

  const handleOpenChange = useCallback(
    (nextState: boolean) => {
      setOpen(nextState)
      if (nextState) {
        latestOnOpen.current?.()
      } else {
        latestOnClose.current?.()
      }
    },
    [latestOnOpen, latestOnClose],
  )

  return (
    <BaseMenu.SubmenuRoot
      open={isOpen}
      onOpenChange={(nextState, details) => {
        if (shouldIgnoreOpenChange(details)) return
        handleOpenChange(nextState)
      }}
      loopFocus={false}
    >
      {children}
    </BaseMenu.SubmenuRoot>
  )
}

const SubTrigger = ({
  className,
  children,
  disabled,
}: {
  className?: string
  children: ReactNode
  disabled?: boolean
}) => {
  return (
    <BaseMenu.SubmenuTrigger
      className={clsx(s.MenuItem, s.SubMenuItem, className)}
      disabled={disabled}
    >
      <div className={s.PressableInner}>
        {children}
        <ChevronRight width="16" height="16" className={s.SubTriggerIcon} />
      </div>
    </BaseMenu.SubmenuTrigger>
  )
}

type SubContentProps = {
  children: ReactNode
  sideOffset?: number
  alignOffset?: number
  width?: number | "auto"
  minWidth?: number | "auto"
  maxHeight?: number
}

const SubContent = ({
  children,
  sideOffset = 4,
  alignOffset = -6,
  width = "auto",
  minWidth = "auto",
  maxHeight,
}: SubContentProps) => {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className={s.Menu}
        side="inline-end"
        align="start"
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={MENU_COLLISION_PADDING}
      >
        <BaseMenu.Popup
          className={s.MenuList}
          style={toCssVariables({
            "menu-width": width,
            "menu-min-width": minWidth,
            "menu-max-height": maxHeight,
          })}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export type MenuRadioGroupProps<T extends string> = {
  /** Controlled value */
  value: T
  /** Fired when selection changes */
  onChange: (value: T) => void
  children: ReactNode
  /**
   * The orientation of the indicator within the radio item.
   * @default end
   */
  indicatorPosition?: "start" | "end"
}

const RadioGroup = <T extends string>({
  children,
  value,
  onChange,
  indicatorPosition = "end",
  ...props
}: MenuRadioGroupProps<T>) => (
  <BaseMenu.RadioGroup
    {...props}
    value={value}
    onValueChange={(v: string) => onChange(v as T)}
    data-indicator-position={indicatorPosition}
  >
    {children}
  </BaseMenu.RadioGroup>
)

export type MenuRadioItemProps<T extends string> = {
  value: T
  /** Class applied to the radio item */
  className?: string
  children: ReactNode
  /** Callback triggered when the radio item is pressed. Call `event.preventDefault()` to keep the menu open. */
  onSelect?: (event: Event) => void
  /** Disables the radio item */
  disabled?: boolean
}

const RadioItem = <T extends string>({
  className,
  children,
  onSelect,
  ...props
}: MenuRadioItemProps<T>) => (
  <BaseMenu.RadioItem
    className={clsx(s.MenuItem, s.RadioItem, className)}
    closeOnClick
    onClickCapture={handleSelectCapture(onSelect)}
    {...props}
  >
    <div className={s.PressableInner}>
      <div className={s.RadioIndicator}>
        <BaseMenu.RadioItemIndicator className={s.RadioIndicatorActive} />
      </div>
      {children}
    </div>
  </BaseMenu.RadioItem>
)

export type MenuCheckboxItemProps = {
  /** Controlled checked state of the checkbox item */
  checked?: boolean | "indeterminate"
  /** Event handler called when the checked state changes */
  onCheckedChange?: (checked: boolean) => void
  /** Class applied to the checkbox item */
  className?: string
  children: ReactNode
  /** Callback triggered when the checkbox item is pressed. Call `event.preventDefault()` to keep the menu open. */
  onSelect?: (event: Event) => void
  /** Disables the checkbox item */
  disabled?: boolean
  /**
   * The orientation of the indicator within the checkbox item.
   * @default end
   */
  indicatorPosition?: "start" | "end"
  /**
   * Visual treatment for the checkbox indicator.
   * @default solid
   */
  indicatorVariant?: "solid" | "ghost"
}
const CheckboxItem = ({
  className,
  children,
  indicatorPosition = "end",
  indicatorVariant = "solid",
  checked,
  onCheckedChange,
  onSelect,
  ...props
}: MenuCheckboxItemProps) => (
  <BaseMenu.CheckboxItem
    className={clsx(s.MenuItem, s.CheckboxItem, className)}
    closeOnClick
    checked={checked === undefined ? undefined : checked !== false}
    onCheckedChange={onCheckedChange && ((next) => onCheckedChange(next))}
    onClickCapture={handleSelectCapture(onSelect)}
    {...props}
    data-indicator-position={indicatorPosition}
    data-indicator-variant={indicatorVariant}
  >
    <div className={s.PressableInner}>
      <div className={s.CheckboxIndicator}>
        <BaseMenu.CheckboxItemIndicator>
          {indicatorVariant === "ghost" ? (
            <Check className="size-4" />
          ) : (
            <div className={s.CheckboxCircle}>
              <Check className="size-4" />
            </div>
          )}
        </BaseMenu.CheckboxItemIndicator>
      </div>
      {children}
    </div>
  </BaseMenu.CheckboxItem>
)

Menu.Content = Content
Menu.Item = Item
Menu.ItemActions = ItemActions
Menu.ItemAction = ItemAction
Menu.Link = Link
Menu.Separator = Separator
Menu.Trigger = Trigger
Menu.Sub = Sub
Menu.SubTrigger = SubTrigger
Menu.SubContent = SubContent
Menu.CheckboxItem = CheckboxItem
Menu.RadioGroup = RadioGroup
Menu.RadioItem = RadioItem
