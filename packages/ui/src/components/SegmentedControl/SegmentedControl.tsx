"use client"

import {
  SegmentedControl as SegmentedControlPrimitive,
  SegmentedControlIndicator as SegmentedControlIndicatorPrimitive,
  SegmentedControlItem as SegmentedControlItemPrimitive,
} from "@ui-sdk/react/segmented-control"
import { Children, type ComponentProps, type ReactNode } from "react"
import { mergeClassName } from "../../lib/cn.js"
import { handlePressableMouseEnter } from "../../lib/helpers.js"
import type { ControlSize, Sizes } from "../../types.js"
import s from "./SegmentedControl.module.css"

export type SegmentedControlProps = ComponentProps<typeof SegmentedControlPrimitive> & {
  /**
   * | 3xs    | 2xs    | xs     | sm     | md     | lg     | xl     | 2xl    | 3xl    |
   * | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `22px` | `24px` | `26px` | `28px` | `32px` | `36px` | `40px` | `44px` | `48px` |
   * @default "md"
   */
  size?: ControlSize
  /** The gutter on each side of an item's content. Defaults to one that suits `size`. */
  gutterSize?: Sizes<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /** Fills the width of its container, with items of equal width. */
  block?: boolean
  /** Fully rounded control and indicator. */
  pill?: boolean
}

export function SegmentedControl({
  size = "md",
  gutterSize,
  block,
  pill,
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <SegmentedControlPrimitive
      className={mergeClassName(s.SegmentedControl, className)}
      data-size={size}
      data-gutter-size={gutterSize}
      data-block={block ? "" : undefined}
      data-pill={pill ? "" : undefined}
      {...props}
    />
  )
}

export type SegmentedControlIndicatorProps = ComponentProps<
  typeof SegmentedControlIndicatorPrimitive
>

/** The thumb that slides behind the checked item. */
function SegmentedControlIndicator({ className, ...props }: SegmentedControlIndicatorProps) {
  return (
    <SegmentedControlIndicatorPrimitive
      className={mergeClassName(s.SegmentedControlIndicator, className)}
      {...props}
    />
  )
}

export type SegmentedControlItemProps = ComponentProps<typeof SegmentedControlItemPrimitive>

const wrapText = (children: ReactNode) =>
  Children.map(children, (child) =>
    typeof child === "string" || typeof child === "number" ? <span>{child}</span> : child,
  )

/**
 * An option. Its content is laid out twice, the copy hidden and semibold, so the item is as wide
 * as its checked label and checking it never shifts the row.
 */
function SegmentedControlItem({
  className,
  children,
  onPointerEnter,
  ...props
}: SegmentedControlItemProps) {
  return (
    <SegmentedControlItemPrimitive
      className={mergeClassName(s.SegmentedControlItem, className)}
      onPointerEnter={(event) => {
        handlePressableMouseEnter(event)
        onPointerEnter?.(event)
      }}
      {...props}
    >
      {typeof children === "function" ? (
        children
      ) : (
        <span className={s.SegmentedControlItemContent}>
          <span className={s.SegmentedControlItemLabel}>{wrapText(children)}</span>
          <span className={s.SegmentedControlItemSizer} aria-hidden>
            {wrapText(children)}
          </span>
        </span>
      )}
    </SegmentedControlItemPrimitive>
  )
}

SegmentedControl.Item = SegmentedControlItem
SegmentedControl.Indicator = SegmentedControlIndicator
