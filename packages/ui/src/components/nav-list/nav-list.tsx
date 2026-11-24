"use client"

import { ChevronDown, Plus, Warning } from "@kova-ui/icons"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsiblePanel as CollapsiblePanelPrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
} from "@ui-sdk/react/collapsible"
import { renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import {
  Children,
  cloneElement,
  type ComponentProps,
  type ComponentType,
  createContext,
  type CSSProperties,
  Fragment,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SVGProps,
  use,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { flushSync } from "react-dom"
import { cn } from "../../lib/cn.js"
import { Button, ButtonLink } from "../button/index.js"
import { useLinkComponent } from "../kova-provider/internal.js"
import { Tooltip } from "../tooltip/index.js"
import s from "./nav-list.module.css"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type HeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

// The NavList is named by an h2 or h3, and its groups render one level deeper
type NavListHeadingLevels = "h2" | "h3"

// The level of the NavListHeading, so group headings can default to one level deeper
const HeadingLevelContext = createContext<number | null>(null)

const levelToHeadingTag = (level: number): HeadingLevels =>
  `h${Math.min(Math.max(level, 1), 4)}` as HeadingLevels

const isElementOf = <P,>(node: ReactNode, component: unknown): node is ReactElement<P> =>
  isValidElement(node) && node.type === component

const isCurrent = (ariaCurrent: unknown) => Boolean(ariaCurrent) && ariaCurrent !== "false"

// ----------------------------------------------------------------------------
// NavList

export type NavListProps = Omit<ComponentProps<"nav">, "children"> & {
  children: ReactNode
  /**
   * Remove the small gap between items
   * @default false
   */
  disableItemGap?: boolean
}

export const NavList = ({
  children,
  disableItemGap = false,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: NavListProps) => {
  const fallbackHeadingId = useId()
  const childArray = Children.toArray(children)
  const heading = childArray.find((child) =>
    isElementOf<NavListHeadingProps>(child, NavListHeading),
  )
  const items = heading ? childArray.filter((child) => child !== heading) : children

  const headingId = heading ? (heading.props.id ?? fallbackHeadingId) : undefined
  const headingLevel = heading ? Number((heading.props.as ?? "h2").slice(1)) : null

  // Name the landmark with the heading, unless the consumer already named it
  const navLabelledby = ariaLabelledby ?? (ariaLabel ? undefined : headingId)

  return (
    <nav
      {...props}
      className={cn(s.NavList, className)}
      aria-label={ariaLabel}
      aria-labelledby={navLabelledby}
      data-component="NavList"
    >
      <HeadingLevelContext value={headingLevel}>
        {heading ? cloneElement(heading, { id: headingId }) : null}
        <ul
          className={s.List}
          data-component="NavList.List"
          data-item-gap={disableItemGap ? undefined : ""}
        >
          {items}
        </ul>
      </HeadingLevelContext>
    </nav>
  )
}

// ----------------------------------------------------------------------------
// NavListHeading

export type NavListHeadingProps = ComponentProps<"h2"> & {
  /**
   * Semantic heading level for the NavList. NavListGroup headings render one level deeper.
   * @default h2
   */
  as?: NavListHeadingLevels
  /**
   * Visually hide the heading, keeping it available to assistive technology
   * @default false
   */
  visuallyHidden?: boolean
}

const NavListHeading = ({
  as: Component = "h2",
  visuallyHidden = false,
  className,
  ...props
}: NavListHeadingProps) => (
  <Component
    className={cn(visuallyHidden ? "sr-only" : s.Heading, className)}
    data-component="NavList.Heading"
    {...props}
  />
)

// ----------------------------------------------------------------------------
// NavListItem internals

type ItemContextValue = {
  labelId: string
  descriptionId: string
  trailingVisualId: string
}

const ItemContext = createContext<ItemContextValue>({
  labelId: "",
  descriptionId: "",
  trailingVisualId: "",
})

const SubNavContext = createContext<{ depth: number }>({ depth: 0 })

type ItemSlots = {
  leadingVisual?: ReactElement
  trailingVisual?: ReactElement
  trailingAction?: ReactElement
  description?: ReactElement<NavListDescriptionProps>
  subNav?: ReactElement
  label: ReactNode[]
}

const getItemSlots = (children: ReactNode): ItemSlots => {
  const slots: ItemSlots = { label: [] }
  Children.forEach(children, (child) => {
    if (isElementOf(child, NavListLeadingVisual)) slots.leadingVisual = child
    else if (isElementOf(child, NavListTrailingVisual)) slots.trailingVisual = child
    else if (isElementOf(child, NavListTrailingAction)) slots.trailingAction = child
    else if (isElementOf<NavListDescriptionProps>(child, NavListDescription))
      slots.description = child
    else if (isElementOf(child, NavListSubNav)) slots.subNav = child
    else slots.label.push(child)
  })
  return slots
}

const InactiveIndicator = ({ inactiveText }: { inactiveText: string }) => {
  const { labelId } = use(ItemContext)
  return (
    <Tooltip>
      <Tooltip.Trigger className={s.InactiveIndicator} aria-labelledby={labelId}>
        <Warning aria-hidden="true" />
      </Tooltip.Trigger>
      <Tooltip.Content side="right">{inactiveText}</Tooltip.Content>
    </Tooltip>
  )
}

type ItemContentProps = {
  slots: ItemSlots
  inactiveText?: string
  trailing?: ReactNode
}

const ItemContent = ({ slots, inactiveText, trailing }: ItemContentProps) => {
  const { labelId } = use(ItemContext)
  const descriptionVariant = slots.description?.props.variant ?? "inline"
  const label = (
    <span id={labelId} className={s.ItemLabel}>
      {slots.label}
    </span>
  )
  const indicator = inactiveText ? <InactiveIndicator inactiveText={inactiveText} /> : null
  const hasLeadingVisual = Boolean(slots.leadingVisual)

  return (
    <>
      {hasLeadingVisual && (indicator ?? slots.leadingVisual)}
      <span className={s.ItemText} data-description-variant={descriptionVariant}>
        {label}
        {slots.description}
      </span>
      {!hasLeadingVisual && indicator ? indicator : slots.trailingVisual}
      {trailing}
    </>
  )
}

const useItemIds = () => {
  const id = useId()
  return useMemo<ItemContextValue>(
    () => ({
      labelId: `${id}-label`,
      descriptionId: `${id}-description`,
      trailingVisualId: `${id}-trailing-visual`,
    }),
    [id],
  )
}

// Omitted rather than `undefined`, so a wrapping tooltip can still describe the item
const getDescribedBy = (slots: ItemSlots, ids: ItemContextValue) =>
  slots.description ? { "aria-describedby": ids.descriptionId } : {}

const getLabelledBy = (slots: ItemSlots, ids: ItemContextValue) =>
  slots.trailingVisual ? `${ids.labelId} ${ids.trailingVisualId}` : ids.labelId

// ----------------------------------------------------------------------------
// NavListItem

export type NavListItemProps = Omit<ComponentProps<"a">, "children" | "aria-current"> & {
  "children": ReactNode
  /** The URL the item navigates to */
  "href"?: string
  /**
   * Renders your own link, like a router's `Link`, which receives the item's props. Defaults to the
   * `linkComponent` from `KovaProvider` for relative URLs, and an `a` element for external URLs.
   */
  "render"?: RenderProp
  /** Marks the item that represents the current page. Set `"page"` on exactly one item. */
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean
  /** Whether an item with a `NavListSubNav` starts expanded */
  "defaultOpen"?: boolean
  /** Explains why the item is unavailable. The item can't be followed while this is set. */
  "inactiveText"?: string
  /** Text shown in a tooltip when the item is hovered or focused */
  "tooltipText"?: string
  "ref"?: Ref<HTMLElement>
}

const useLinkRender = (render: RenderProp | undefined, href?: string) => {
  const LinkComponent = useLinkComponent()
  const isExternal = /^https?:\/\//.test(href ?? "")
  if (isExternal) return { render, linkProps: { target: "_blank", rel: "noopener noreferrer" } }
  if (render || LinkComponent === "a") return { render, linkProps: {} }
  return { render: <LinkComponent />, linkProps: {} }
}

const NavListItem = (props: NavListItemProps) => {
  const { children, defaultOpen } = props
  const { depth } = use(SubNavContext)
  const slots = getItemSlots(children)

  if (!slots.subNav && defaultOpen) {
    // eslint-disable-next-line no-console
    console.error("NavListItem must have a NavListSubNav to use defaultOpen.")
  }

  if (slots.subNav) {
    return <ItemWithSubNav {...props} slots={slots} subNav={slots.subNav} depth={depth} />
  }

  return <LinkItem {...props} slots={slots} depth={depth} />
}

type InternalItemProps = NavListItemProps & { slots: ItemSlots; depth: number }

const withTooltip = (
  control: ReactElement<Record<string, unknown>>,
  tooltipText: string | undefined,
) =>
  tooltipText ? (
    <Tooltip>
      <Tooltip.Trigger render={control} />
      <Tooltip.Content side="right">{tooltipText}</Tooltip.Content>
    </Tooltip>
  ) : (
    control
  )

const LinkItem = ({
  slots,
  depth,
  render,
  href,
  "aria-current": ariaCurrent,
  inactiveText,
  tooltipText,
  className,
  style,
  "children": _children,
  "defaultOpen": _defaultOpen,
  ...rest
}: InternalItemProps) => {
  const ids = useItemIds()
  const { render: linkRender, linkProps } = useLinkRender(render, href)
  const active = isCurrent(ariaCurrent)
  const inactive = Boolean(inactiveText)

  const content = <ItemContent slots={slots} inactiveText={inactiveText} />

  const linkClassName = cn(s.ItemContent, slots.trailingAction && !inactive && s.HasTrailingAction)

  const link: ReactElement<Record<string, unknown>> = inactive ? (
    <span
      className={linkClassName}
      aria-labelledby={getLabelledBy(slots, ids)}
      {...getDescribedBy(slots, ids)}
    >
      {content}
    </span>
  ) : (
    renderElement(
      "a",
      {
        ...linkProps,
        ...rest,
        ...(href !== undefined && { href }),
        "className": linkClassName,
        "aria-current": ariaCurrent,
        "aria-labelledby": getLabelledBy(slots, ids),
        ...getDescribedBy(slots, ids),
        "data-component": "NavList.Item",
        "children": content,
      },
      linkRender,
    )
  )

  return (
    <ItemContext value={ids}>
      <li
        className={cn(s.Item, className)}
        style={{ ...style, "--subitem-depth": depth } as CSSProperties}
        data-active={active ? "" : undefined}
        data-inactive={inactive ? "" : undefined}
        data-has-description={slots.description ? "" : undefined}
      >
        {inactive ? link : withTooltip(link, tooltipText)}
        {!inactive && slots.trailingAction}
      </li>
    </ItemContext>
  )
}

// ----------------------------------------------------------------------------
// NavListItem with a NavListSubNav

const hasCurrentNavItem = (node: ReactNode): boolean => {
  if (!isValidElement<{ "children"?: ReactNode; "aria-current"?: unknown }>(node)) return false
  if (isCurrent(node.props["aria-current"])) return true
  if (!node.props.children) return false
  return Children.toArray(node.props.children).some(hasCurrentNavItem)
}

const ItemWithSubNavContext = createContext<{ buttonId: string } | null>(null)

const ItemWithSubNav = ({
  slots,
  subNav,
  depth,
  defaultOpen,
  tooltipText,
  className,
  style,
}: InternalItemProps & { subNav: ReactElement }) => {
  const ids = useItemIds()
  const buttonId = useId()
  const subNavRef = useRef<HTMLUListElement>(null)

  // Checked on the React tree, so the parent renders expanded on the first (server) render
  const hasCurrentItem = useMemo(() => hasCurrentNavItem(subNav), [subNav])
  const [open, setOpen] = useState(Boolean(defaultOpen) || hasCurrentItem)
  const [containsCurrentItem, setContainsCurrentItem] = useState(hasCurrentItem)

  // Link components can set `aria-current` themselves, so also check the DOM
  useLayoutEffect(() => {
    const currentItem =
      hasCurrentNavItem(subNav) ||
      Boolean(subNavRef.current?.querySelector("[aria-current]:not([aria-current=false])"))
    setContainsCurrentItem(currentItem)
    if (currentItem) setOpen(true)
  }, [subNav])

  const trigger = (
    <CollapsibleTriggerPrimitive
      id={buttonId}
      className={s.ItemContent}
      aria-labelledby={getLabelledBy(slots, ids)}
      {...getDescribedBy(slots, ids)}
      data-component="NavList.Item"
    >
      <ItemContent
        slots={slots}
        trailing={<ChevronDown className={s.ExpandIcon} aria-hidden="true" />}
      />
    </CollapsibleTriggerPrimitive>
  )

  return (
    <ItemWithSubNavContext value={{ buttonId }}>
      <ItemContext value={ids}>
        <CollapsiblePrimitive
          open={open}
          onOpenChange={setOpen}
          className={cn(s.Item, className)}
          style={{ ...style, "--subitem-depth": depth } as CSSProperties}
          data-active={!open && containsCurrentItem ? "" : undefined}
          data-has-subnav=""
          render={<li />}
        >
          {withTooltip(trigger, tooltipText)}
          {cloneElement(subNav as ReactElement<{ ref?: Ref<HTMLUListElement> }>, {
            ref: subNavRef,
          })}
        </CollapsiblePrimitive>
      </ItemContext>
    </ItemWithSubNavContext>
  )
}

// ----------------------------------------------------------------------------
// NavListSubNav

export type NavListSubNavProps = {
  children: ReactNode
  ref?: Ref<HTMLUListElement>
}

const MAX_SUBNAV_DEPTH = 3

const NavListSubNav = ({ children, ref }: NavListSubNavProps) => {
  const item = use(ItemWithSubNavContext)
  const { depth } = use(SubNavContext)

  if (!item) {
    // eslint-disable-next-line no-console
    console.error("NavListSubNav must be a child of a NavListItem")
    return null
  }

  if (depth > MAX_SUBNAV_DEPTH) {
    // eslint-disable-next-line no-console
    console.error(
      "NavListSubNav only supports four levels of nesting. Consider flattening the navigation.",
    )
    return null
  }

  return (
    <SubNavContext value={{ depth: depth + 1 }}>
      <CollapsiblePanelPrimitive
        ref={ref as Ref<HTMLDivElement>}
        className={s.SubNav}
        aria-labelledby={item.buttonId}
        keepMounted
        data-component="NavList.SubNav"
        render={<ul />}
      >
        {children}
      </CollapsiblePanelPrimitive>
    </SubNavContext>
  )
}

// ----------------------------------------------------------------------------
// Visuals, description, and trailing action

export type NavListVisualProps = Omit<ComponentProps<"span">, "children"> & {
  children: ReactNode
}

const NavListLeadingVisual = ({ className, ...props }: NavListVisualProps) => (
  <span
    className={cn(s.LeadingVisual, className)}
    aria-hidden="true"
    data-component="NavList.LeadingVisual"
    {...props}
  />
)

const NavListTrailingVisual = ({ className, ...props }: NavListVisualProps) => {
  const { trailingVisualId } = use(ItemContext)
  return (
    <span
      id={trailingVisualId}
      className={cn(s.TrailingVisual, className)}
      data-component="NavList.TrailingVisual"
      {...props}
    />
  )
}

export type NavListDescriptionProps = Omit<ComponentProps<"span">, "children"> & {
  children: ReactNode
  /**
   * `inline` descriptions sit beside the label, `block` descriptions sit below it
   * @default inline
   */
  variant?: "inline" | "block"
  /**
   * Truncate an inline description that overflows
   * @default false
   */
  truncate?: boolean
}

const NavListDescription = ({
  variant = "inline",
  truncate = false,
  className,
  children,
  ...props
}: NavListDescriptionProps) => {
  const { descriptionId } = use(ItemContext)
  return (
    <span
      id={descriptionId}
      className={cn(s.Description, className)}
      data-variant={variant}
      data-truncate={truncate && variant === "inline" ? "" : undefined}
      title={truncate && typeof children === "string" ? children : undefined}
      data-component="NavList.Description"
      {...props}
    >
      {children}
    </span>
  )
}

export type NavListTrailingActionProps = {
  /** Accessible name of the action, also shown in a tooltip when there's an icon */
  label: string
  /** Icon to render. Without one, the action renders `label` as text. */
  icon?: IconComponent
  /**
   * Render the action as a button or a link
   * @default button
   */
  as?: "button" | "a"
  /** URL, when the action is a link */
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  className?: string
}

const NavListTrailingAction = ({
  label,
  icon: Icon,
  as = "button",
  href,
  onClick,
  className,
}: NavListTrailingActionProps) => {
  const buttonProps = {
    "color": "secondary",
    "variant": "ghost",
    "size": "sm",
    "aria-label": Icon ? label : undefined,
    onClick,
    "className": s.TrailingActionButton,
  } as const
  const content = Icon ? <Icon /> : label
  const control =
    as === "a" ? (
      <ButtonLink {...buttonProps} href={href} data-uniform={Icon ? "" : undefined}>
        {content}
      </ButtonLink>
    ) : (
      <Button {...buttonProps} uniform={Boolean(Icon)}>
        {content}
      </Button>
    )

  return (
    <span className={cn(s.TrailingAction, className)} data-component="NavList.TrailingAction">
      {Icon ? withTooltip(control, label) : control}
    </span>
  )
}

// ----------------------------------------------------------------------------
// NavListDivider

export type NavListDividerProps = { className?: string }

const NavListDivider = ({ className }: NavListDividerProps) => (
  <li
    className={cn(s.Divider, className)}
    role="presentation"
    aria-hidden="true"
    data-component="NavList.Divider"
  />
)

// ----------------------------------------------------------------------------
// NavListGroup

export type NavListGroupProps = Omit<ComponentProps<"li">, "title"> & {
  children: ReactNode
  /** NavListHeading of the group. Use `NavListGroupHeading` instead for headings with links. */
  title?: string
  /**
   * Hide the divider rendered before the group
   * @default false
   */
  hideDivider?: boolean
}

const flattenFragments = (children: ReactNode): ReactNode[] => {
  const flattened: ReactNode[] = []
  Children.forEach(children, (child) => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      flattened.push(...flattenFragments(child.props.children))
    } else {
      flattened.push(child)
    }
  })
  return flattened
}

const removeFromFragments = (children: ReactNode, target: ReactElement): ReactNode =>
  Children.map(children, (child) => {
    if (child === target) return null
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return cloneElement(child, undefined, removeFromFragments(child.props.children, target))
    }
    return child
  })

const NavListGroup = ({
  title,
  children,
  hideDivider = false,
  className,
  ...props
}: NavListGroupProps) => {
  const headingLevel = use(HeadingLevelContext)
  const generatedId = useId()
  const groupHeading = flattenFragments(children).find((child) =>
    isElementOf<NavListGroupHeadingProps>(child, NavListGroupHeading),
  )
  const items = groupHeading ? removeFromFragments(children, groupHeading) : children
  const headingId = groupHeading?.props.id ?? (groupHeading || title ? generatedId : undefined)

  return (
    <>
      {!hideDivider && <NavListDivider />}
      <li className={cn(s.Group, className)} data-component="NavList.Group" {...props}>
        {groupHeading ? (
          cloneElement(groupHeading, { id: headingId })
        ) : title ? (
          <NavListGroupHeading
            id={headingId}
            as={headingLevel ? levelToHeadingTag(headingLevel + 1) : "h3"}
          >
            {title}
          </NavListGroupHeading>
        ) : null}
        <ul className={s.GroupList} aria-labelledby={headingId}>
          {items}
        </ul>
      </li>
    </>
  )
}

// ----------------------------------------------------------------------------
// NavListGroupHeading

export type NavListGroupHeadingProps = Omit<ComponentProps<"h3">, "children"> & {
  children: ReactNode
  /** NavListHeading level. Defaults to one level below the `NavListHeading`, or `h3`. */
  as?: HeadingLevels
  /** Secondary text with more information about the group */
  auxiliaryText?: string
  /**
   * Visually hide the heading, keeping it available to assistive technology
   * @default false
   */
  visuallyHidden?: boolean
  /**
   * `filled` places the heading on a background
   * @default subtle
   */
  variant?: "subtle" | "filled"
}

const NavListGroupHeading = ({
  as,
  auxiliaryText,
  visuallyHidden = false,
  variant = "subtle",
  className,
  children,
  ...props
}: NavListGroupHeadingProps) => {
  const headingLevel = use(HeadingLevelContext)
  const Component = as ?? (headingLevel ? levelToHeadingTag(headingLevel + 1) : "h3")
  return (
    <div className={cn(visuallyHidden ? "sr-only" : s.GroupHeadingWrap)} data-variant={variant}>
      <Component
        className={cn(s.GroupHeading, className)}
        data-component="NavList.GroupHeading"
        {...props}
      >
        {children}
      </Component>
      {auxiliaryText && <span className={s.GroupAuxiliaryText}>{auxiliaryText}</span>}
    </div>
  )
}

// ----------------------------------------------------------------------------
// NavListGroupExpand

export type NavListGroupExpandItem = Omit<NavListItemProps, "children"> & {
  "text": string
  "leadingVisual"?: IconComponent
  "trailingVisual"?: IconComponent | string
  "trailingAction"?: NavListTrailingActionProps
  "data-expand-focus-target"?: string
}

export type NavListGroupExpandProps = {
  /**
   * Text of the button that shows more items
   * @default Show more
   */
  label?: string
  /**
   * Number of pages to reveal the items over. `0` reveals every item at once.
   * @default 0
   */
  pages?: number
  /** Items revealed by the button */
  items: NavListGroupExpandItem[]
  /** Renders each item. Defaults to a `NavListItem` built from the item's fields. */
  renderItem?: (item: NavListGroupExpandItem) => ReactNode
  ref?: Ref<HTMLButtonElement>
}

const NavListGroupExpand = ({
  label = "Show more",
  pages = 0,
  items,
  renderItem,
  ref,
}: NavListGroupExpandProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const groupId = useId()

  const itemsPerPage = items.length / pages
  const amountToShow = pages === 0 ? items.length : Math.ceil(itemsPerPage * currentPage)
  const focusTargetIndex = currentPage === 1 ? 0 : amountToShow - Math.floor(itemsPerPage)

  const showMore = () => {
    flushSync(() => setCurrentPage(currentPage + 1))
    const targets = document.querySelectorAll<HTMLElement>(
      `[data-expand-focus-target="${CSS.escape(groupId)}"]`,
    )
    targets[targets.length - 1]?.focus()
  }

  return (
    <>
      {currentPage > 0 &&
        items.slice(0, amountToShow).map((item, index) => {
          const focusTarget = index === focusTargetIndex ? groupId : undefined
          if (renderItem) {
            return (
              <Fragment key={index}>
                {renderItem({ ...item, "data-expand-focus-target": focusTarget })}
              </Fragment>
            )
          }
          const {
            text,
            leadingVisual: LeadingIcon,
            trailingVisual: TrailingIcon,
            trailingAction,
            ...rest
          } = item
          return (
            <NavListItem key={index} {...rest} data-expand-focus-target={focusTarget}>
              {LeadingIcon && (
                <NavListLeadingVisual>
                  <LeadingIcon />
                </NavListLeadingVisual>
              )}
              {text}
              {TrailingIcon && (
                <NavListTrailingVisual>
                  {typeof TrailingIcon === "string" ? TrailingIcon : <TrailingIcon />}
                </NavListTrailingVisual>
              )}
              {trailingAction && <NavListTrailingAction {...trailingAction} />}
            </NavListItem>
          )
        })}
      {(currentPage < pages || currentPage === 0) && (
        <li className={s.Item}>
          <button
            ref={ref}
            type="button"
            className={s.ItemContent}
            aria-expanded="false"
            onClick={showMore}
          >
            <span className={s.ItemText}>
              <span className={s.ItemLabel}>{label}</span>
            </span>
            <span className={s.TrailingVisual} aria-hidden="true">
              <Plus />
            </span>
          </button>
        </li>
      )}
    </>
  )
}

NavList.Item = NavListItem
NavList.Group = NavListGroup
NavList.SubNav = NavListSubNav
NavList.Divider = NavListDivider
NavList.Heading = NavListHeading
NavList.Description = NavListDescription
NavList.GroupExpand = NavListGroupExpand
NavList.GroupHeading = NavListGroupHeading
NavList.LeadingVisual = NavListLeadingVisual
NavList.TrailingAction = NavListTrailingAction
NavList.TrailingVisual = NavListTrailingVisual
