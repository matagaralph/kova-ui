"use client"

import {
  Field as FieldPrimitive,
  FieldControl as FieldControlPrimitive,
  FieldDescription as FieldDescriptionPrimitive,
  FieldError as FieldErrorPrimitive,
  FieldGroup as FieldGroupPrimitive,
  FieldLabel as FieldLabelPrimitive,
  FieldLegend as FieldLegendPrimitive,
  FieldSet as FieldSetPrimitive,
} from "@ui-sdk/react/field"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./field.module.css"

export type FieldProps = ComponentProps<typeof FieldPrimitive>

export function Field({ className, ...props }: FieldProps) {
  return <FieldPrimitive className={mergeClassName(s.Field, className)} {...props} />
}

export type FieldLabelProps = ComponentProps<typeof FieldLabelPrimitive> & {
  /** Hides the label visually while screen readers and agents still read it. */
  visuallyHidden?: boolean
}

function FieldLabel({ className, visuallyHidden, ...props }: FieldLabelProps) {
  return (
    <FieldLabelPrimitive
      className={mergeClassName(s.FieldLabel, className)}
      data-visually-hidden={visuallyHidden ? "" : undefined}
      {...props}
    />
  )
}

export type FieldDescriptionProps = ComponentProps<typeof FieldDescriptionPrimitive>

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <FieldDescriptionPrimitive
      className={mergeClassName(s.FieldDescription, className)}
      {...props}
    />
  )
}

export type FieldErrorProps = ComponentProps<typeof FieldErrorPrimitive>

function FieldError({ className, ...props }: FieldErrorProps) {
  return <FieldErrorPrimitive className={mergeClassName(s.FieldError, className)} {...props} />
}

export type FieldControlProps = ComponentProps<typeof FieldControlPrimitive>

function FieldControl(props: FieldControlProps) {
  return <FieldControlPrimitive {...props} />
}

export type FieldSetProps = ComponentProps<typeof FieldSetPrimitive>

function FieldSet({ className, ...props }: FieldSetProps) {
  return <FieldSetPrimitive className={mergeClassName(s.FieldSet, className)} {...props} />
}

export type FieldLegendProps = ComponentProps<typeof FieldLegendPrimitive>

function FieldLegend({ className, ...props }: FieldLegendProps) {
  return <FieldLegendPrimitive className={mergeClassName(s.FieldLegend, className)} {...props} />
}

export type FieldGroupProps = ComponentProps<typeof FieldGroupPrimitive>

function FieldGroup({ className, ...props }: FieldGroupProps) {
  return <FieldGroupPrimitive className={mergeClassName(s.FieldGroup, className)} {...props} />
}

Field.Set = FieldSet
Field.Error = FieldError
Field.Group = FieldGroup
Field.Label = FieldLabel
Field.Legend = FieldLegend
Field.Control = FieldControl
Field.Description = FieldDescription
