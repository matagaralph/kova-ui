"use client"

import { ChevronDown } from "@kova-ui/icons"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsiblePanel as CollapsiblePanelPrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
} from "@ui-sdk/react/collapsible"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./collapsible.module.css"

export type CollapsibleProps = ComponentProps<typeof CollapsiblePrimitive>

export function Collapsible({ className, ...props }: CollapsibleProps) {
  return <CollapsiblePrimitive className={mergeClassName(s.Collapsible, className)} {...props} />
}

export type CollapsibleTriggerProps = ComponentProps<typeof CollapsibleTriggerPrimitive>

const chevron = <ChevronDown aria-hidden="true" className={s.CollapsibleTriggerIcon} />

function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  return (
    <CollapsibleTriggerPrimitive
      className={mergeClassName(s.CollapsibleTrigger, className)}
      {...props}
    >
      {typeof children === "function" ? (
        (state) => (
          <>
            {children(state)}
            {chevron}
          </>
        )
      ) : (
        <>
          {children}
          {chevron}
        </>
      )}
    </CollapsibleTriggerPrimitive>
  )
}

export type CollapsiblePanelProps = ComponentProps<typeof CollapsiblePanelPrimitive>

function CollapsiblePanel({ className, children, ...props }: CollapsiblePanelProps) {
  return (
    <CollapsiblePanelPrimitive className={mergeClassName(s.CollapsiblePanel, className)} {...props}>
      {typeof children === "function" ? (
        (state) => <div className={s.CollapsiblePanelContent}>{children(state)}</div>
      ) : (
        <div className={s.CollapsiblePanelContent}>{children}</div>
      )}
    </CollapsiblePanelPrimitive>
  )
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Panel = CollapsiblePanel
