"use client"

import { X } from "@kova-ui/icons"
import {
  FileInput as FileInputPrimitive,
  FileInputDropzone as FileInputDropzonePrimitive,
  FileInputItem as FileInputItemPrimitive,
  FileInputItemRemove as FileInputItemRemovePrimitive,
  FileInputList as FileInputListPrimitive,
  FileInputTrigger as FileInputTriggerPrimitive,
} from "@ui-sdk/react/file-input"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./FileInput.module.css"

export type FileInputProps = ComponentProps<typeof FileInputPrimitive>

export function FileInput({ className, ...props }: FileInputProps) {
  return <FileInputPrimitive className={mergeClassName(s.FileInput, className)} {...props} />
}

export type FileInputTriggerProps = ComponentProps<typeof FileInputTriggerPrimitive>

function FileInputTrigger({ className, ...props }: FileInputTriggerProps) {
  return (
    <FileInputTriggerPrimitive
      className={mergeClassName(s.FileInputTrigger, className)}
      {...props}
    />
  )
}

export type FileInputDropzoneProps = ComponentProps<typeof FileInputDropzonePrimitive>

function FileInputDropzone({ className, ...props }: FileInputDropzoneProps) {
  return (
    <FileInputDropzonePrimitive
      className={mergeClassName(s.FileInputDropzone, className)}
      {...props}
    />
  )
}

export type FileInputListProps = ComponentProps<typeof FileInputListPrimitive>

function FileInputList({ className, ...props }: FileInputListProps) {
  return (
    <FileInputListPrimitive className={mergeClassName(s.FileInputList, className)} {...props} />
  )
}

export type FileInputItemProps = ComponentProps<typeof FileInputItemPrimitive>

function FileInputItem({ className, ...props }: FileInputItemProps) {
  return (
    <FileInputItemPrimitive className={mergeClassName(s.FileInputItem, className)} {...props} />
  )
}

export type FileInputItemRemoveProps = ComponentProps<typeof FileInputItemRemovePrimitive>

function FileInputItemRemove({ className, children, ...props }: FileInputItemRemoveProps) {
  return (
    <FileInputItemRemovePrimitive
      className={mergeClassName(s.FileInputItemRemove, className)}
      {...props}
    >
      {children ?? <X aria-hidden="true" />}
    </FileInputItemRemovePrimitive>
  )
}

FileInput.Trigger = FileInputTrigger
FileInput.Dropzone = FileInputDropzone
FileInput.List = FileInputList
FileInput.Item = FileInputItem
FileInput.ItemRemove = FileInputItemRemove
