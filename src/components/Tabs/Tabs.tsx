"use client"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import clsx from "clsx"
import {
  Children,
  cloneElement,
  type ComponentPropsWithoutRef,
  type ComponentType,
  createContext,
  type ElementType,
  type HTMLAttributes,
  isValidElement,
  type KeyboardEvent,
  memo,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type SVGProps,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { isDev, isTest } from "../../lib/constants.js"
import { LoadingDots } from "../Indicator/index.js"
import { Counter } from "./Counter.js"
import { getTextContent } from "./getTextContent.js"
import s from "./Tabs.module.css"
import { useResizeObserver } from "./useResizeObserver.js"

export type TabsProps = {
  /**
   * Tabs (`Tabs.Tab`) and panels (`Tabs.Panel`) to render
   */
  "children": ReactNode
  /**
   * Accessible name for the tab list
   */
  "aria-label"?: string
  /**
   * ID of the element containing the name for the tab list
   */
  "aria-labelledby"?: string
  /**
   * The value of the selected tab, keyed to each `Tabs.Tab`/`Tabs.Panel` `value`. Provide this
   * (with `onChange`) for a controlled component where the selected tab is the single source of truth.
   */
  "value"?: string
  /**
   * The value of the tab that should be selected by default, keyed to each tab's `value`. Use this
   * for an uncontrolled component. Cannot be combined with `value`.
   */
  "defaultValue"?: string
  /**
   * Fires whenever the selected tab changes, for every selection method including arrow keys.
   * Unlike `Tabs.Tab`'s `onSelect`, which only fires on click and Enter/Space.
   */
  "onChange"?: ({ value }: { value: string }) => void
  /**
   * `"automatic"` selects on focus/arrow keys; `"manual"` only moves focus until Enter/Space/click.
   * Prefer `"manual"` when displaying a panel is not instant.
   * @default "automatic"
   */
  "activationMode"?: "automatic" | "manual"
  /**
   * Custom string to use when generating the IDs of tabs and `aria-labelledby` for the panels
   */
  "id"?: string
  /**
   * Loading state for all counters. It displays a loading animation for individual counters until
   * all are resolved, to prevent multiple layout shifts.
   */
  "loadingCounters"?: boolean
  /**
   * Class name for custom styling
   */
  "className"?: string
  /**
   * Element type for the tab container
   * @default "div"
   */
  "as"?: ElementType
}

export type TabProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "value" | "onSelect" | "aria-selected"
> & {
  /**
   * A value that uniquely identifies this tab, paired with the `Tabs.Panel` of the same `value`.
   * When omitted, tabs and panels are paired by their order.
   */
  "value"?: string
  /**
   * Whether this is the selected tab
   */
  "aria-selected"?: boolean
  /**
   * Callback that triggers on click and keyboard (Enter/Space) selection
   */
  "onSelect"?: (event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => void
  /**
   * Content of the counter rendered after the tab label
   */
  "counter"?: number | string
  /**
   * Icon rendered before the tab label
   */
  "icon"?: ComponentType<SVGProps<SVGSVGElement>> | ReactElement
}

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * A value that uniquely identifies this panel, paired with the `Tabs.Tab` of the same `value`.
   * When omitted, tabs and panels are paired by their order.
   */
  value?: string
}

type WithValue = { value?: string }

type TabsContextValue = {
  loadingCounters: boolean | undefined
  parentId: string
}

const TabsContext = createContext<TabsContextValue>({ loadingCounters: undefined, parentId: "" })

const shouldValidate = isDev || isTest

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

function warning(condition: boolean, message: string) {
  if (condition) {
    // eslint-disable-next-line no-console
    console.warn(`Warning: ${message}`)
  }
}

const TabsRoot = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  loadingCounters,
  className,
  "value": controlledValue,
  defaultValue,
  onChange,
  activationMode = "automatic",
  id,
  "as": Component = "div",
  ...props
}: TabsProps) => {
  const [iconsVisible, setIconsVisible] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const generatedId = useId()
  const parentId = id ?? generatedId

  const [tabs, panels, tabsHaveIcons, selectedFromProps, tabValues, panelValues] = useMemo(() => {
    let tabIndex = 0
    let panelIndex = 0

    const childrenWithValues = Children.map(children, (child) => {
      if (isValidElement<TabProps>(child) && child.type === TabsTab) {
        const value = child.props.value ?? `${tabIndex}`
        tabIndex++
        return cloneElement(child, { value })
      }

      if (isValidElement<TabPanelProps>(child) && child.type === TabsPanel) {
        const value = child.props.value ?? `${panelIndex}`
        panelIndex++
        return cloneElement(child, { value })
      }
      return child
    })

    const tabList: ReactNode[] = []
    const panelList: ReactNode[] = []
    const tabValueList: string[] = []
    const panelValueList: string[] = []
    let selectedTabValue: string | undefined

    for (const child of Children.toArray(childrenWithValues)) {
      if (!isValidElement(child)) continue
      if (child.type === TabsTab) {
        const { value, "aria-selected": ariaSelected } = child.props as TabProps
        if (value !== undefined) tabValueList.push(value)
        if (ariaSelected === true || String(ariaSelected) === "true") {
          selectedTabValue = value
        }
        tabList.push(child)
      } else if (child.type === TabsPanel) {
        const { value } = child.props as TabPanelProps
        if (value !== undefined) panelValueList.push(value)
        panelList.push(child)
      }
    }

    const hasIcons = tabList.some((tab) => isValidElement<TabProps>(tab) && !!tab.props.icon)

    return [tabList, panelList, hasIcons, selectedTabValue, tabValueList, panelValueList] as const
  }, [children])

  const isControlled = controlledValue !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    () => defaultValue ?? selectedFromProps ?? "0",
  )
  const [prevSelectedFromProps, setPrevSelectedFromProps] = useState(selectedFromProps)
  if (!isControlled && selectedFromProps !== prevSelectedFromProps) {
    setPrevSelectedFromProps(selectedFromProps)
    if (selectedFromProps !== undefined && selectedFromProps !== uncontrolledValue) {
      setUncontrolledValue(selectedFromProps)
    }
  }

  const selectedValue = isControlled ? controlledValue : uncontrolledValue

  // Fall back to the first tab when the value matches none, so the tab list keeps a tabbable entry point
  const effectiveValue = tabValues.includes(selectedValue)
    ? selectedValue
    : (tabValues[0] ?? selectedValue)

  const handleValueChange = (value: string) => {
    if (!isControlled) {
      setUncontrolledValue(value)
    }
    onChange?.({ value })
  }

  const contextValue = useMemo<TabsContextValue>(
    () => ({ loadingCounters, parentId }),
    [loadingCounters, parentId],
  )

  // The list's natural width (icons + labels), refreshed only while icons are visible
  const listWidthRef = useRef(0)
  useResizeObserver((entries) => {
    if (!tabsHaveIcons || !iconsVisible) return
    listWidthRef.current = entries[0].contentRect.width
  }, listRef)

  // Hide icons when the wrapper becomes narrower than the list
  useResizeObserver((entries) => {
    if (!tabsHaveIcons) return
    setIconsVisible(entries[0].contentRect.width >= listWidthRef.current)
  }, wrapperRef)

  if (shouldValidate) {
    const selectedTabs = tabs.filter((tab) => {
      const ariaSelected = isValidElement<TabProps>(tab) && tab.props["aria-selected"]
      return ariaSelected === true || String(ariaSelected) === "true"
    })

    // Structural problems throw; recoverable misconfiguration warns
    invariant(selectedTabs.length <= 1, "Only one tab can be selected at a time.")

    invariant(
      tabs.length === panels.length,
      `The number of tabs and panels must be equal. Counted ${tabs.length} tabs and ${panels.length} panels.`,
    )

    // Tab ids are derived from `value`, so duplicates would collide
    const duplicateTabValue = tabValues.find((value, index) => tabValues.indexOf(value) !== index)
    invariant(
      duplicateTabValue === undefined,
      `Every tab must have a unique \`value\`. Found duplicate "${duplicateTabValue}".`,
    )
    const duplicatePanelValue = panelValues.find(
      (value, index) => panelValues.indexOf(value) !== index,
    )
    invariant(
      duplicatePanelValue === undefined,
      `Every panel must have a unique \`value\`. Found duplicate "${duplicatePanelValue}".`,
    )

    const unmatchedTabValue = tabValues.find((value) => !panelValues.includes(value))
    invariant(
      unmatchedTabValue === undefined,
      `Tab with \`value\` "${unmatchedTabValue}" has no matching panel. Give a \`Tabs.Panel\` the same \`value\`.`,
    )

    warning(
      isControlled && selectedTabs.length > 0,
      "Tabs: do not combine the controlled `value` prop with `aria-selected` on a tab. `value` takes precedence; use `value`/`onChange` (or `defaultValue`) to drive selection.",
    )

    warning(
      controlledValue !== undefined && defaultValue !== undefined,
      "Tabs: do not combine the controlled `value` prop with `defaultValue`. `value` takes precedence; use one or the other.",
    )

    const providedValue = controlledValue ?? defaultValue
    warning(
      providedValue !== undefined && tabValues.length > 0 && !tabValues.includes(providedValue),
      `Tabs: the selected value "${providedValue}" does not match any tab, so the first tab is selected instead. Provide a \`value\`/\`defaultValue\` that matches a \`Tabs.Tab\` \`value\`.`,
    )
  }

  return (
    <TabsContext.Provider value={contextValue}>
      <BaseTabs.Root
        value={effectiveValue}
        onValueChange={(value: string) => handleValueChange(value)}
      >
        <Component
          ref={wrapperRef}
          data-icons-visible={iconsVisible}
          className={clsx(s.Tabs, className)}
          {...props}
        >
          <BaseTabs.List
            ref={listRef}
            className={s.TabList}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            activateOnFocus={activationMode === "automatic"}
          >
            {tabs}
          </BaseTabs.List>
        </Component>
        {panels}
      </BaseTabs.Root>
    </TabsContext.Provider>
  )
}

const TabImpl = ({
  onSelect,
  onClick,
  value,
  counter,
  "icon": Icon,
  children,
  className,
  "aria-selected": _ariaSelected,
  ...rest
}: TabProps & WithValue) => {
  const { loadingCounters, parentId } = useContext(TabsContext)

  return (
    <BaseTabs.Tab
      {...rest}
      value={value}
      id={`${parentId}-tab-${value}`}
      className={clsx(s.Tab, className)}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          onSelect?.(event)
        }
      }}
    >
      {Icon && <span data-component="icon">{isValidElement(Icon) ? Icon : <Icon />}</span>}
      {children && (
        <span data-component="text" data-content={getTextContent(children) || undefined}>
          {children}
        </span>
      )}
      {counter !== undefined && (
        <span data-component="counter">
          {loadingCounters ? (
            <span className={s.LoadingCounter}>
              <LoadingDots />
            </span>
          ) : (
            <Counter>{counter}</Counter>
          )}
        </span>
      )}
    </BaseTabs.Tab>
  )
}

export const TabsTab = memo(TabImpl)
TabsTab.displayName = "Tabs.Tab"

export const TabsPanel = ({ children, value, ...rest }: TabPanelProps & WithValue) => (
  <BaseTabs.Panel {...rest} value={value} keepMounted>
    {children}
  </BaseTabs.Panel>
)
TabsPanel.displayName = "Tabs.Panel"

TabsRoot.displayName = "Tabs"

const Tabs = Object.assign(TabsRoot, { Tab: TabsTab, Panel: TabsPanel })

export { Tabs }
