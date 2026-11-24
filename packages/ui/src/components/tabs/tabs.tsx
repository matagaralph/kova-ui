"use client"

import {
  Tabs as TabsPrimitive,
  TabsIndicator as TabsIndicatorPrimitive,
  TabsList as TabsListPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsTab as TabsTabPrimitive,
  TabsTabIcon as TabsTabIconPrimitive,
} from "@ui-sdk/react/tabs"
import {
  Children,
  type ComponentProps,
  createContext,
  isValidElement,
  type ReactNode,
  use,
  useCallback,
  useRef,
} from "react"
import { mergeClassName } from "../../lib/cn.js"
import { LoadingDots } from "../indicator/index.js"
import { Counter } from "./counter.js"
import { getTextContent } from "./get-text-content.js"
import s from "./tabs.module.css"
import { useHideIconsWhenNarrow } from "./use-hide-icons-when-narrow.js"

const LoadingCountersContext = createContext(false)

export type TabsProps = ComponentProps<typeof TabsPrimitive> & {
  /**
   * Shows a loading animation in every tab's counter until all counts are ready, so the tabs shift
   * once instead of once per counter.
   */
  loadingCounters?: boolean
}

export function Tabs({ className, loadingCounters = false, ...props }: TabsProps) {
  return (
    <LoadingCountersContext value={loadingCounters}>
      <TabsPrimitive className={mergeClassName(s.Tabs, className)} {...props} />
    </LoadingCountersContext>
  )
}

export type TabsListProps = ComponentProps<typeof TabsListPrimitive>

function TabsList({ className, ref, ...props }: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const iconsHidden = useHideIconsWhenNarrow(listRef)
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  return (
    <TabsListPrimitive
      ref={setRef}
      className={mergeClassName(s.TabsList, className)}
      data-icons-hidden={iconsHidden ? "" : undefined}
      {...props}
    />
  )
}

export type TabsTabProps = ComponentProps<typeof TabsTabPrimitive> & {
  /** A count shown in a badge after the label, like the number of open issues. */
  counter?: number | string
}

function TabsTab({ className, counter, children, ...props }: TabsTabProps) {
  const loadingCounters = use(LoadingCountersContext)

  const content =
    typeof children === "function" ? (
      children
    ) : (
      <>
        <TabContent>{children}</TabContent>
        {counter !== undefined && (
          <span className={s.TabsTabCounter}>
            {loadingCounters ? (
              <span className={s.LoadingCounter}>
                <LoadingDots />
              </span>
            ) : (
              <Counter>{counter}</Counter>
            )}
          </span>
        )}
      </>
    )

  return (
    <TabsTabPrimitive className={mergeClassName(s.TabsTab, className)} {...props}>
      {content}
    </TabsTabPrimitive>
  )
}

// Icons go before the label; the label reserves its semibold width so selection never shifts layout
function TabContent({ children }: { children: ReactNode }) {
  const icons: ReactNode[] = []
  const label: ReactNode[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === TabsTabIcon) icons.push(child)
    else label.push(child)
  })
  const hasLabel = label.some((child) => child !== null && child !== undefined && child !== false)

  return (
    <>
      {icons}
      {hasLabel && (
        <span className={s.TabsTabLabel} data-content={getTextContent(label) || undefined}>
          {label}
        </span>
      )}
    </>
  )
}

export type TabsTabIconProps = ComponentProps<typeof TabsTabIconPrimitive>

function TabsTabIcon({ className, ...props }: TabsTabIconProps) {
  return <TabsTabIconPrimitive className={mergeClassName(s.TabsTabIcon, className)} {...props} />
}

export type TabsIndicatorProps = ComponentProps<typeof TabsIndicatorPrimitive>

function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <TabsIndicatorPrimitive className={mergeClassName(s.TabsIndicator, className)} {...props} />
  )
}

export type TabsPanelProps = ComponentProps<typeof TabsPanelPrimitive>

function TabsPanel({ className, ...props }: TabsPanelProps) {
  return <TabsPanelPrimitive className={mergeClassName(s.TabsPanel, className)} {...props} />
}

Tabs.Tab = TabsTab
Tabs.List = TabsList
Tabs.Panel = TabsPanel
Tabs.TabIcon = TabsTabIcon
Tabs.Indicator = TabsIndicator
