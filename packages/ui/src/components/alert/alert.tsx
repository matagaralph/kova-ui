"use client"

import { CheckCircle, Info, Warning } from "@kova-ui/icons"
import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "../../lib/cn.js"
import { mergeRefs } from "../../lib/merge-refs.js"
import { useResizeObserver } from "../../lib/usehooks-ts/index.js"
import { type SemanticColors, type Variants } from "../../types.js"
import s from "./alert.module.css"

export type AlertProps = Omit<ComponentProps<"div">, "title" | "color" | "children"> & {
  /**
   * Color of the alert, matching the intent of its message.
   * @default primary
   */
  color?: SemanticColors<
    "primary" | "danger" | "success" | "info" | "discovery" | "caution" | "warning"
  >
  /**
   * Visual style of the alert.
   * @default outline
   */
  variant?: Variants<"soft" | "outline">
  /** Short title of the message. */
  title?: ReactNode
  /** Supporting text under the title. */
  description?: ReactNode
  /** Buttons or links for the message, like a dismiss button. */
  actions?: ReactNode
  /** Places `actions` at the end or the bottom. Without it, they wrap to the bottom when wider than a third of the alert. */
  actionsPlacement?: "end" | "bottom"
  /** Replaces the icon chosen from `color`. `false` hides it. */
  indicator?: ReactNode | false
  /** Classes for the actions container. */
  actionsClassName?: string
}

export function Alert({
  color = "primary",
  variant = "outline",
  title,
  description,
  actions,
  actionsPlacement,
  indicator,
  className,
  actionsClassName,
  ref,
  ...restProps
}: AlertProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const [actionsAutoPlacement, setActionsAutoPlacement] = useState<"end" | "bottom">("end")
  const { width: containerWidth } = useResizeObserver({ ref: containerRef })

  useEffect(() => {
    const actionsWidth = actionsRef.current?.clientWidth ?? 0

    if (actionsWidth && containerWidth) {
      setActionsAutoPlacement(actionsWidth > containerWidth / 3 ? "bottom" : "end")
    }
  }, [containerWidth])

  return (
    <div
      ref={mergeRefs([ref, containerRef])}
      className={cn(s.Alert, className)}
      data-slot="alert"
      data-variant={variant}
      data-color={color}
      role={color === "danger" ? "alert" : undefined}
      data-actions-placement={actionsPlacement ?? actionsAutoPlacement}
      {...restProps}
    >
      {indicator === false ? null : (
        <div className={s.Indicator} data-slot="alert-indicator">
          {indicator ?? <DefaultIndicator color={color} />}
        </div>
      )}
      <div className={s.Content}>
        <div className={s.Message}>
          {title && (
            <div className={s.Title} data-slot="alert-title">
              {title}
            </div>
          )}
          {description && (
            <div className={s.Description} data-slot="alert-description">
              {description}
            </div>
          )}
        </div>
        {actions && (
          <div
            className={cn(s.Actions, actionsClassName)}
            data-slot="alert-actions"
            ref={actionsRef}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

function DefaultIndicator({ color }: { color: AlertProps["color"] }) {
  switch (color) {
    case "warning":
    case "caution":
    case "danger":
      return <Warning />
    case "success":
      return <CheckCircle />
    default:
      return <Info />
  }
}
