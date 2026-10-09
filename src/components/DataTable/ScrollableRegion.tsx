"use client"

import clsx from "clsx"
import { type ComponentPropsWithoutRef, type RefObject, useEffect, useRef, useState } from "react"
import s from "./Table.module.css"

function useOverflow<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [hasOverflow, setHasOverflow] = useState(false)

  useEffect(() => {
    if (ref.current === null || typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver((entries) => {
      setHasOverflow(
        entries.some(
          (entry) =>
            entry.target.scrollHeight > entry.target.clientHeight ||
            entry.target.scrollWidth > entry.target.clientWidth,
        ),
      )
    })

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return hasOverflow
}

export type ScrollableRegionProps = ComponentPropsWithoutRef<"div">

/**
 * A container that becomes a focusable, labelled region only when its content overflows,
 * so keyboard users can scroll it.
 */
export function ScrollableRegion({
  "aria-label": label,
  "aria-labelledby": labelledby,
  children,
  className,
  ...rest
}: ScrollableRegionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasOverflow = useOverflow(ref)
  const regionProps = hasOverflow
    ? {
        "aria-label": label,
        "aria-labelledby": labelledby,
        "role": "region",
        "tabIndex": 0,
      }
    : {}

  return (
    <div
      {...rest}
      {...regionProps}
      ref={ref}
      className={clsx(s.ScrollableRegion, className)}
      data-component="ScrollableRegion"
    >
      {children}
    </div>
  )
}
