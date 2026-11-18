"use client"

import { ChevronDown } from "@kova-ui/icons"
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuContent as NavigationMenuContentPrimitive,
  NavigationMenuItem as NavigationMenuItemPrimitive,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuLinkIcon as NavigationMenuLinkIconPrimitive,
  NavigationMenuList as NavigationMenuListPrimitive,
  NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
} from "@ui-sdk/react/navigation-menu"
import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactNode,
  type RefObject,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { mergeClassName } from "../../lib/cn.js"
import { LoadingDots } from "../Indicator/index.js"
import { useLinkComponent } from "../KovaProvider/internal.js"
import { Counter } from "../Tabs/Counter.js"
import { getTextContent } from "../Tabs/getTextContent.js"
import s from "./TabNav.module.css"

type TabNavContextValue = {
  loadingCounters: boolean
  listRef: RefObject<HTMLUListElement | null>
  setLinkClipped: (index: number, clipped: boolean) => void
  linkProps: RefObject<Map<number, TabNavLinkProps>>
}

const TabNavContext = createContext<TabNavContextValue>({
  loadingCounters: false,
  listRef: { current: null },
  setLinkClipped: () => {},
  linkProps: { current: new Map() },
})

const LinkIndexContext = createContext(-1)

export type TabNavProps = Omit<
  ComponentProps<typeof NavigationMenuPrimitive>,
  "orientation" | "value" | "defaultValue" | "onValueChange" | "children"
> & {
  /** The `TabNavLink`s. */
  children?: ReactNode
  /**
   * `inset` offsets the links from the container's edges; `flush` lines them up with the content
   * above and below.
   * @default "inset"
   */
  variant?: "inset" | "flush"
  /**
   * Shows a loading animation in every counter until all counts are ready, so the links shift once
   * instead of once per counter.
   */
  loadingCounters?: boolean
  /**
   * Container width below which icons hide to save space, or `null` to always show them.
   * @default "medium"
   */
  hideIconsBreakpoint?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | null
  /** Label of the button that holds the links that don't fit. */
  moreLabel?: string
}

// An item is clipped once it wraps onto the hidden second row. Wrapped items are fully hidden, so
// "less than half visible" ignores sub-pixel rounding on high-density screens.
function useIsClipped(target: RefObject<Element | null>, root: RefObject<Element | null>) {
  const [isClipped, setIsClipped] = useState(false)

  useEffect(() => {
    const element = target.current
    const rootElement = root.current
    if (!element || !rootElement || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => setIsClipped(entry.intersectionRatio < 0.5),
      { root: rootElement, threshold: [0, 0.5, 1] },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [target, root])

  return isClipped
}

export function TabNav({
  className,
  children,
  variant = "inset",
  loadingCounters = false,
  hideIconsBreakpoint = "medium",
  moreLabel = "More",
  ...props
}: TabNavProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const linkProps = useRef(new Map<number, TabNavLinkProps>())
  const [clippedLinks, setClippedLinks] = useState<number[]>([])

  const setLinkClipped = useCallback((index: number, clipped: boolean) => {
    setClippedLinks((links) => {
      if (clipped === links.includes(index)) return links
      return clipped
        ? [...links, index].sort((a, b) => a - b)
        : links.filter((link) => link !== index)
    })
  }, [])

  const contextValue = useMemo<TabNavContextValue>(
    () => ({ loadingCounters, listRef, setLinkClipped, linkProps }),
    [loadingCounters, setLinkClipped],
  )

  const overflowLinks = clippedLinks
    .map((index) => [index, linkProps.current.get(index)] as const)
    .filter((entry): entry is readonly [number, TabNavLinkProps] => entry[1] !== undefined)
  const overflowHasCurrent = overflowLinks.some(([, link]) => link.current)

  let linkIndex = 0

  return (
    <TabNavContext value={contextValue}>
      <NavigationMenuPrimitive
        className={mergeClassName(s.TabNav, className)}
        data-variant={variant}
        data-hide-icons-breakpoint={hideIconsBreakpoint ?? undefined}
        {...props}
      >
        <NavigationMenuListPrimitive ref={listRef} className={s.TabNavList}>
          {/* An empty first item lets the real first item wrap out of view on tiny screens */}
          <li role="presentation" aria-hidden className={s.WrapSpacer} />
          {Children.map(children, (child) =>
            isValidElement(child) ? (
              <LinkIndexContext value={linkIndex++}>{child}</LinkIndexContext>
            ) : (
              child
            ),
          )}
        </NavigationMenuListPrimitive>
        {overflowLinks.length > 0 && (
          <div className={s.TabNavMore}>
            <div className={s.TabNavMoreDivider} />
            <NavigationMenuListPrimitive className={s.TabNavMoreList}>
              <NavigationMenuItemPrimitive value="more">
                <NavigationMenuTriggerPrimitive
                  className={s.TabNavMoreTrigger}
                  data-current={overflowHasCurrent ? "" : undefined}
                  aria-label={
                    overflowHasCurrent
                      ? `${moreLabel} links, including the current page`
                      : undefined
                  }
                >
                  <span>
                    {moreLabel}
                    <span className="sr-only"> links</span>
                  </span>
                  <ChevronDown aria-hidden />
                </NavigationMenuTriggerPrimitive>
                <NavigationMenuContentPrimitive
                  className={s.TabNavMoreContent}
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <ul className={s.TabNavMoreLinks}>
                    {overflowLinks.map(([index, link]) => (
                      <li key={index}>
                        <OverflowLink {...link} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContentPrimitive>
              </NavigationMenuItemPrimitive>
            </NavigationMenuListPrimitive>
          </div>
        )}
      </NavigationMenuPrimitive>
    </TabNavContext>
  )
}

export type TabNavLinkProps = ComponentProps<typeof NavigationMenuLinkPrimitive> & {
  /** A count shown in a badge after the label. */
  counter?: number | string
  /** Opens the link in a new tab. Detected from absolute `http(s)` URLs when left out. */
  external?: boolean
}

function useLinkRender({
  href,
  render,
  external,
}: Pick<TabNavLinkProps, "href" | "render" | "external">) {
  const LinkComponent = useLinkComponent()
  const isExternal = external ?? /^https?:\/\//.test(href ?? "")
  if (isExternal) {
    return { render, target: "_blank", rel: "noopener noreferrer" }
  }
  if (render || LinkComponent === "a") return { render }
  return { render: <LinkComponent href={href} /> }
}

function LinkCounter({ counter }: { counter: number | string }) {
  const { loadingCounters } = use(TabNavContext)
  return (
    <span className={s.TabNavLinkCounter}>
      {loadingCounters ? (
        <span className={s.LoadingCounter}>
          <LoadingDots />
        </span>
      ) : (
        <Counter>{counter}</Counter>
      )}
    </span>
  )
}

function LinkContent({ children, counter }: { children: ReactNode; counter?: number | string }) {
  const icons: ReactNode[] = []
  const label: ReactNode[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === TabNavLinkIcon) icons.push(child)
    else label.push(child)
  })

  return (
    <>
      {icons}
      <span className={s.TabNavLinkLabel} data-content={getTextContent(label) || undefined}>
        {label}
      </span>
      {counter !== undefined && <LinkCounter counter={counter} />}
    </>
  )
}

function TabNavLink(props: TabNavLinkProps) {
  const { className, counter, external, href, render, children, tabIndex, ...rest } = props
  const index = use(LinkIndexContext)
  const { listRef, setLinkClipped, linkProps } = use(TabNavContext)
  const itemRef = useRef<HTMLLIElement>(null)
  const isClipped = useIsClipped(itemRef, listRef)
  const linkRender = useLinkRender({ href, render, external })

  useEffect(() => {
    linkProps.current.set(index, props)
  })

  useEffect(() => {
    setLinkClipped(index, isClipped)
  }, [index, isClipped, setLinkClipped])

  useEffect(() => () => setLinkClipped(index, false), [index, setLinkClipped])

  return (
    <NavigationMenuItemPrimitive
      ref={itemRef}
      className={s.TabNavItem}
      aria-hidden={isClipped ? true : undefined}
    >
      <NavigationMenuLinkPrimitive
        {...rest}
        {...linkRender}
        href={href}
        tabIndex={isClipped ? -1 : tabIndex}
        className={mergeClassName(s.TabNavLink, className)}
      >
        {typeof children === "function" ? (
          children
        ) : (
          <LinkContent counter={counter}>{children}</LinkContent>
        )}
      </NavigationMenuLinkPrimitive>
    </NavigationMenuItemPrimitive>
  )
}

function OverflowLink({
  className: _className,
  counter,
  external,
  href,
  render,
  children,
  ...rest
}: TabNavLinkProps) {
  const linkRender = useLinkRender({ href, render, external })
  return (
    <NavigationMenuLinkPrimitive {...rest} {...linkRender} href={href} className={s.TabNavMoreLink}>
      {typeof children === "function" ? (
        children
      ) : (
        <>
          <span className={s.TabNavMoreLinkLabel}>
            {Children.map(children, (child) =>
              isValidElement(child) && child.type === TabNavLinkIcon ? null : child,
            )}
          </span>
          {counter !== undefined && <LinkCounter counter={counter} />}
        </>
      )}
    </NavigationMenuLinkPrimitive>
  )
}

export type TabNavLinkIconProps = ComponentProps<typeof NavigationMenuLinkIconPrimitive>

function TabNavLinkIcon({ className, ...props }: TabNavLinkIconProps) {
  return (
    <NavigationMenuLinkIconPrimitive
      className={mergeClassName(s.TabNavLinkIcon, className)}
      {...props}
    />
  )
}

TabNav.Link = TabNavLink
TabNav.LinkIcon = TabNavLinkIcon
