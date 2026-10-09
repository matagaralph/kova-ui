/// <reference path="../../global.ts" preserve="true" />
"use client"

import { Menu } from "@base-ui/react/menu"
import clsx from "clsx"
import {
  type AnchorHTMLAttributes,
  Children,
  type ComponentType,
  createContext,
  type ElementType,
  isValidElement,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type RefObject,
  type SVGProps,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { isDev, isTest } from "../../lib/constants.js"
import { ChevronDown } from "../Icon/index.js"
import { LoadingDots } from "../Indicator/index.js"
import { useLinkComponent } from "../KovaProvider/internal.js"
import menuStyles from "../Menu/Menu.module.css"
import { Counter } from "../Tabs/Counter.js"
import { getTextContent } from "../Tabs/getTextContent.js"
import tabsStyles from "../Tabs/Tabs.module.css"
import s from "./TabNav.module.css"

export type TabNavProps = {
  /**
   * Navigation items (`TabNav.Item`)
   */
  "children": ReactNode
  /**
   * Accessible name for the navigation landmark
   */
  "aria-label"?: string
  /**
   * Element type for the navigation container
   * @default "nav"
   */
  "as"?: ElementType
  /**
   * Class name for custom styling
   */
  "className"?: string
  /**
   * Loading state for all counters. It displays a loading animation for individual counters until
   * all are resolved, to prevent multiple layout shifts.
   * @default false
   */
  "loadingCounters"?: boolean
  /**
   * `"inset"` offsets the items from the container edges; `"flush"` aligns them with the edges, so
   * they line up with the content above and below.
   * @default "inset"
   */
  "variant"?: "inset" | "flush"
  /**
   * Container width below which icons are hidden to save space. Use a smaller breakpoint, or
   * `null`, to keep icons visible in narrow containers.
   * @default "medium"
   */
  "hideIconsBreakpoint"?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | null
}

export type TabNavItemProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onSelect" | "aria-current" | "children"
> & {
  /**
   * Content of the navigation item
   */
  "children"?: ReactNode
  /**
   * Callback that triggers on click and keyboard (Enter/Space) selection
   */
  "onSelect"?: (event: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>) => void
  /**
   * Marks the item as the current page or location
   */
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean
  /**
   * Icon rendered before the label
   * @deprecated Use `leadingVisual` instead
   */
  "icon"?: ComponentType<SVGProps<SVGSVGElement>> | ReactElement
  /**
   * Visual rendered before the label
   */
  "leadingVisual"?: ReactElement
  /**
   * Content of the counter rendered after the label
   */
  "counter"?: number | string
  /**
   * Override the component used for the link, for example a router's `Link`. Defaults to the
   * `linkComponent` from `KovaProvider` for relative URLs, and `a` for external URLs.
   */
  "as"?: ElementType
  /**
   * Destination for router link components that use `to`
   */
  "to"?: string
  /**
   * Force external link behavior, which is automatically detected based on the URL
   */
  "forceExternal"?: boolean
}

type TabNavContextValue = {
  loadingCounters: boolean
  navRef: RefObject<HTMLElement | null>
  setItemClipped: (index: number, clipped: boolean) => void
  itemProps: RefObject<Map<number, TabNavItemProps>>
}

const TabNavContext = createContext<TabNavContextValue>({
  loadingCounters: false,
  navRef: { current: null },
  setItemClipped: () => {},
  itemProps: { current: new Map() },
})

const ItemIndexContext = createContext(-1)

const shouldValidate = isDev || isTest

const isCurrent = (props: TabNavItemProps) =>
  props["aria-current"] !== undefined &&
  props["aria-current"] !== false &&
  props["aria-current"] !== "false"

// An item is clipped when it wraps onto the hidden second row of the navigation. Wrapped items are
// fully hidden, so "less than half visible" ignores sub-pixel rounding on high-density screens.
function useIsClipped(target: RefObject<Element | null>, root: RefObject<Element | null>) {
  const [isClipped, setIsClipped] = useState(false)

  useEffect(() => {
    const element = target.current
    const rootElement = root.current
    if (!element || !rootElement || typeof IntersectionObserver === "undefined") {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsClipped(entry.intersectionRatio < 0.5),
      { root: rootElement, threshold: [0, 0.5, 1] },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [target, root])

  return isClipped
}

function useLink({
  as,
  href,
  to,
  forceExternal,
}: Pick<TabNavItemProps, "as" | "href" | "to" | "forceExternal">) {
  const DefaultComponent = useLinkComponent()
  const isExternal = forceExternal ?? /^https?:\/\//.test(href ?? to ?? "")
  const Component: ElementType = as || (isExternal ? "a" : DefaultComponent)

  const linkProps = isExternal
    ? { href: href ?? to, target: "_blank", rel: "noopener noreferrer" }
    : Component === "a"
      ? { href: href ?? "#" }
      : { ...(href !== undefined && { href }), ...(to !== undefined && { to }) }

  return { Component, linkProps }
}

const TabNavRoot = ({
  "as": Component = "nav",
  "aria-label": ariaLabel,
  loadingCounters = false,
  variant = "inset",
  className,
  children,
  hideIconsBreakpoint = "medium",
}: TabNavProps) => {
  const navRef = useRef<HTMLElement>(null)
  const itemProps = useRef(new Map<number, TabNavItemProps>())
  const [clippedItems, setClippedItems] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

  const validChildren = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<TabNavItemProps>[]

  if (shouldValidate) {
    const currentItems = validChildren.filter((child) => isCurrent(child.props))
    if (currentItems.length > 1) {
      throw new Error("Only one current element is allowed")
    }
    if (!ariaLabel) {
      throw new Error(
        "Use the `aria-label` prop to provide an accessible label for assistive technology",
      )
    }
  }

  const setItemClipped = useCallback((index: number, clipped: boolean) => {
    setClippedItems((items) => {
      if (clipped === items.includes(index)) return items
      return clipped
        ? [...items, index].sort((a, b) => a - b)
        : items.filter((item) => item !== index)
    })
  }, [])

  const contextValue = useMemo<TabNavContextValue>(
    () => ({ loadingCounters, navRef, setItemClipped, itemProps }),
    [loadingCounters, setItemClipped],
  )

  const overflowItems = clippedItems
    .map((index) => [index, itemProps.current.get(index)] as const)
    .filter((entry): entry is readonly [number, TabNavItemProps] => entry[1] !== undefined)
  const isOverflowing = overflowItems.length > 0
  const overflowingCurrentItem = overflowItems.some(([, props]) => isCurrent(props))

  // Close the menu if it's open but there's no longer an overflow
  if (menuOpen && !isOverflowing) setMenuOpen(false)

  let itemIndex = 0

  return (
    <TabNavContext.Provider value={contextValue}>
      {ariaLabel && <h2 className="sr-only">{`${ariaLabel} navigation`}</h2>}
      <Component
        ref={navRef}
        aria-label={ariaLabel}
        className={clsx(tabsStyles.Tabs, s.TabNav, className)}
        data-variant={variant}
        data-overflow-mode="wrap"
        data-hide-icons-breakpoint={hideIconsBreakpoint ?? undefined}
        data-has-overflow={isOverflowing ? "true" : undefined}
      >
        <ul role="list" className={clsx(tabsStyles.TabList, s.ItemList)}>
          {/* An empty first item lets the real first item wrap out of view on tiny screens */}
          <li role="presentation" aria-hidden className={s.WrapSpacer} />
          {Children.map(children, (child) =>
            isValidElement(child) ? (
              <ItemIndexContext.Provider value={itemIndex++}>{child}</ItemIndexContext.Provider>
            ) : (
              child
            ),
          )}
        </ul>

        {isOverflowing && (
          <div className={s.MoreButtonContainer}>
            <div className={s.MoreButtonDivider} />
            <Menu.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Menu.Trigger
                className={clsx(tabsStyles.Tab, s.MoreButton)}
                data-current={overflowingCurrentItem ? "true" : undefined}
                aria-label={
                  overflowingCurrentItem ? "More items, including current item" : undefined
                }
              >
                <span>
                  More<span className="sr-only"> items</span>
                </span>
                <ChevronDown aria-hidden />
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner sideOffset={4} align="end">
                  <Menu.Popup className={clsx(menuStyles.MenuList, "min-w-48")}>
                    {overflowItems.map(([index, props]) => (
                      <OverflowMenuItem key={index} {...props} />
                    ))}
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          </div>
        )}
      </Component>
    </TabNavContext.Provider>
  )
}

const OverflowMenuItem = ({
  children,
  counter,
  onSelect,
  "aria-current": ariaCurrent,
  as,
  href,
  to,
  forceExternal,
}: TabNavItemProps) => {
  const { loadingCounters } = useContext(TabNavContext)
  const { Component, linkProps } = useLink({ as, href, to, forceExternal })

  return (
    <Menu.LinkItem
      className={clsx(menuStyles.MenuItem, s.OverflowMenuItem)}
      render={<Component {...linkProps} />}
      aria-current={ariaCurrent}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => onSelect?.(event)}
    >
      <span className={s.OverflowMenuItemLabel}>{children}</span>
      {loadingCounters ? (
        <span className={tabsStyles.LoadingCounter}>
          <LoadingDots />
        </span>
      ) : (
        counter !== undefined && (
          <span data-component="counter">
            <Counter>{counter}</Counter>
          </span>
        )
      )}
    </Menu.LinkItem>
  )
}

export const TabNavItem = (props: TabNavItemProps) => {
  const {
    as,
    href,
    to,
    forceExternal,
    children,
    counter,
    onSelect,
    "aria-current": ariaCurrent,
    "icon": Icon,
    leadingVisual,
    className,
    tabIndex,
    onClick,
    onKeyDown,
    ...rest
  } = props
  const index = useContext(ItemIndexContext)
  const { loadingCounters, navRef, setItemClipped, itemProps } = useContext(TabNavContext)
  const { Component, linkProps } = useLink({ as, href, to, forceExternal })
  const itemRef = useRef<HTMLLIElement>(null)
  const isClipped = useIsClipped(itemRef, navRef)

  useEffect(() => {
    itemProps.current.set(index, props)
  })

  useEffect(() => {
    setItemClipped(index, isClipped)
  }, [index, isClipped, setItemClipped])

  useEffect(() => () => setItemClipped(index, false), [index, setItemClipped])

  const visual = leadingVisual ?? (Icon ? isValidElement(Icon) ? Icon : <Icon /> : null)

  return (
    <li className={s.Item} ref={itemRef} aria-hidden={isClipped ? true : undefined}>
      <Component
        {...rest}
        {...linkProps}
        className={clsx(tabsStyles.Tab, className)}
        aria-current={ariaCurrent}
        tabIndex={isClipped ? -1 : tabIndex}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event)
          if (!event.defaultPrevented) onSelect?.(event)
        }}
        onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) => {
          onKeyDown?.(event)
          if ((event.key === " " || event.key === "Enter") && !event.defaultPrevented) {
            onSelect?.(event)
          }
        }}
      >
        {visual && <span data-component="icon">{visual}</span>}
        {children && (
          <span data-component="text" data-content={getTextContent(children) || undefined}>
            {children}
          </span>
        )}
        {counter !== undefined && (
          <span data-component="counter">
            {loadingCounters ? (
              <span className={tabsStyles.LoadingCounter}>
                <LoadingDots />
              </span>
            ) : (
              <Counter>{counter}</Counter>
            )}
          </span>
        )}
      </Component>
    </li>
  )
}

TabNavItem.displayName = "TabNav.Item"
TabNavRoot.displayName = "TabNav"

const TabNav = Object.assign(TabNavRoot, { Item: TabNavItem })

export { TabNav }
