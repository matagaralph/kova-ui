"use client"

import {
  Timeline as TimelinePrimitive,
  TimelineConnector as TimelineConnectorPrimitive,
  TimelineDescription as TimelineDescriptionPrimitive,
  TimelineItem as TimelineItemPrimitive,
  TimelineMarker as TimelineMarkerPrimitive,
  TimelineTime as TimelineTimePrimitive,
  TimelineTitle as TimelineTitlePrimitive,
} from "@ui-sdk/react/timeline"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./timeline.module.css"

export type TimelineProps = ComponentProps<typeof TimelinePrimitive>

export function Timeline({ className, ...props }: TimelineProps) {
  return <TimelinePrimitive className={mergeClassName(s.Timeline, className)} {...props} />
}

export type TimelineItemProps = ComponentProps<typeof TimelineItemPrimitive>

function TimelineItem({ className, ...props }: TimelineItemProps) {
  return <TimelineItemPrimitive className={mergeClassName(s.TimelineItem, className)} {...props} />
}

export type TimelineMarkerProps = ComponentProps<typeof TimelineMarkerPrimitive>

function TimelineMarker({ className, ...props }: TimelineMarkerProps) {
  return (
    <TimelineMarkerPrimitive className={mergeClassName(s.TimelineMarker, className)} {...props} />
  )
}

export type TimelineConnectorProps = ComponentProps<typeof TimelineConnectorPrimitive>

function TimelineConnector({ className, ...props }: TimelineConnectorProps) {
  return (
    <TimelineConnectorPrimitive
      className={mergeClassName(s.TimelineConnector, className)}
      {...props}
    />
  )
}

export type TimelineTitleProps = ComponentProps<typeof TimelineTitlePrimitive>

function TimelineTitle({ className, ...props }: TimelineTitleProps) {
  return (
    <TimelineTitlePrimitive className={mergeClassName(s.TimelineTitle, className)} {...props} />
  )
}

export type TimelineTimeProps = ComponentProps<typeof TimelineTimePrimitive>

function TimelineTime({ className, ...props }: TimelineTimeProps) {
  return <TimelineTimePrimitive className={mergeClassName(s.TimelineTime, className)} {...props} />
}

export type TimelineDescriptionProps = ComponentProps<typeof TimelineDescriptionPrimitive>

function TimelineDescription({ className, ...props }: TimelineDescriptionProps) {
  return (
    <TimelineDescriptionPrimitive
      className={mergeClassName(s.TimelineDescription, className)}
      {...props}
    />
  )
}

Timeline.Item = TimelineItem
Timeline.Marker = TimelineMarker
Timeline.Connector = TimelineConnector
Timeline.Title = TimelineTitle
Timeline.Time = TimelineTime
Timeline.Description = TimelineDescription
