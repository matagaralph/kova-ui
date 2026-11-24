"use client"

import { ChevronDown } from "@kova-ui/icons"
import {
  Accordion as AccordionPrimitive,
  AccordionHeader as AccordionHeaderPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionPanel as AccordionPanelPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
} from "@ui-sdk/react/accordion"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./accordion.module.css"

export type AccordionProps = ComponentProps<typeof AccordionPrimitive>

export function Accordion({ className, ...props }: AccordionProps) {
  return <AccordionPrimitive className={mergeClassName(s.Accordion, className)} {...props} />
}

export type AccordionItemProps = ComponentProps<typeof AccordionItemPrimitive>

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionItemPrimitive className={mergeClassName(s.AccordionItem, className)} {...props} />
  )
}

export type AccordionHeaderProps = ComponentProps<typeof AccordionHeaderPrimitive>

function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  return (
    <AccordionHeaderPrimitive className={mergeClassName(s.AccordionHeader, className)} {...props} />
  )
}

export type AccordionTriggerProps = ComponentProps<typeof AccordionTriggerPrimitive>

const chevron = <ChevronDown aria-hidden="true" className={s.AccordionTriggerIcon} />

function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionTriggerPrimitive className={mergeClassName(s.AccordionTrigger, className)} {...props}>
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
    </AccordionTriggerPrimitive>
  )
}

export type AccordionPanelProps = ComponentProps<typeof AccordionPanelPrimitive>

function AccordionPanel({ className, children, ...props }: AccordionPanelProps) {
  return (
    <AccordionPanelPrimitive className={mergeClassName(s.AccordionPanel, className)} {...props}>
      {typeof children === "function" ? (
        (state) => <div className={s.AccordionPanelContent}>{children(state)}</div>
      ) : (
        <div className={s.AccordionPanelContent}>{children}</div>
      )}
    </AccordionPanelPrimitive>
  )
}

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Trigger = AccordionTrigger
Accordion.Panel = AccordionPanel
