import { Children, type ComponentProps, type CSSProperties } from "react"
import { cn } from "../../lib/cn.js"
import avatarStyles from "./Avatar.module.css"
import s from "./AvatarGroup.module.css"

export type AvatarGroupProps = ComponentProps<"div"> & {
  /**
   * Which end of the stack sits on top
   * @default start
   */
  stack?: "start" | "end"
  /** Width and height of every avatar in the group, in pixels. */
  size?: number
  /** How far each avatar tucks under the next, in pixels. Defaults to a quarter of the size. `0` doesn't overlap. */
  overlap?: number
}

export function AvatarGroup({
  className,
  stack = "start",
  size,
  overlap,
  style,
  children,
  ...props
}: AvatarGroupProps) {
  const items = Children.toArray(children)

  return (
    <div
      className={cn(s.AvatarGroup, className)}
      data-stack={stack}
      style={
        {
          ...(size !== undefined && { "--avatar-size": `${size}px` }),
          ...(overlap !== undefined && { "--avatar-group-spacing": `${-overlap}px` }),
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {/* The group lays out in reverse for "start", so earlier avatars paint on top */}
      {stack === "start" ? items.reverse() : items}
    </div>
  )
}

export type AvatarGroupOverflowProps = Omit<ComponentProps<"span">, "children" | "color"> & {
  /** How many avatars aren't shown. Written compactly, like "+1.2k". */
  count: number
  /** Width and height, in pixels. */
  size?: number
}

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 0,
})

/** The last item of an `AvatarGroup`: how many more there are, in the avatars' shape. */
function AvatarGroupOverflow({
  className,
  count,
  size,
  style,
  ...props
}: AvatarGroupOverflowProps) {
  const formatted = compact.format(count).toLowerCase()

  return (
    <span
      className={cn(avatarStyles.Avatar, s.AvatarGroupOverflow, className)}
      data-slot="avatar-group-overflow"
      data-letter-count={formatted.length}
      style={
        size === undefined ? style : ({ "--avatar-size": `${size}px`, ...style } as CSSProperties)
      }
      {...props}
    >
      <span className={s.AvatarGroupOverflowSymbol}>+</span>
      {formatted}
    </span>
  )
}

AvatarGroup.Overflow = AvatarGroupOverflow
