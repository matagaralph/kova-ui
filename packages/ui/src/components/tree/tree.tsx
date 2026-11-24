"use client"

import { Check, ChevronRight, Minus } from "@kova-ui/icons"
import {
  Tree as TreePrimitive,
  TreeGroup as TreeGroupPrimitive,
  TreeItem as TreeItemPrimitive,
  TreeItemCheckbox as TreeItemCheckboxPrimitive,
  type TreeItemData,
  TreeItemIndicator as TreeItemIndicatorPrimitive,
  TreeItemLabel as TreeItemLabelPrimitive,
  type TreeMode,
  type TreeProps as TreePrimitiveProps,
  treeFromPaths,
} from "@ui-sdk/react/tree"
import { Children, type ComponentProps, isValidElement } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./tree.module.css"

export type TreeProps<Mode extends TreeMode = "single"> = TreePrimitiveProps<Mode>

/** Renders `items` or `paths` with Kova's parts when it has no children of its own. */
export function Tree<Mode extends TreeMode = "single">({
  className,
  children,
  ...props
}: TreeProps<Mode>) {
  const data = props.items ?? (props.paths ? treeFromPaths(props.paths) : undefined)
  return (
    <TreePrimitive<Mode> className={mergeClassName(s.Tree, className)} {...props}>
      {children ?? (data && <TreeItems items={data} />)}
    </TreePrimitive>
  )
}

export type TreeItemProps = ComponentProps<typeof TreeItemPrimitive>

/** A branch when it holds a `Tree.Group`, like the item it wraps. */
function TreeItem({ className, branch, children, ...props }: TreeItemProps) {
  const hasGroup =
    typeof children !== "function" &&
    Children.toArray(children).some((child) => isValidElement(child) && child.type === TreeGroup)
  return (
    <TreeItemPrimitive
      className={mergeClassName(s.TreeItem, className)}
      branch={branch ?? (hasGroup || undefined)}
      {...props}
    >
      {children}
    </TreeItemPrimitive>
  )
}

export type TreeItemLabelProps = ComponentProps<typeof TreeItemLabelPrimitive>

function TreeItemLabel({ className, ...props }: TreeItemLabelProps) {
  return (
    <TreeItemLabelPrimitive className={mergeClassName(s.TreeItemLabel, className)} {...props} />
  )
}

export type TreeItemIndicatorProps = ComponentProps<typeof TreeItemIndicatorPrimitive>

/** Kova's chevron, turned while its branch is expanded, unless you pass children. */
function TreeItemIndicator({ className, children, ...props }: TreeItemIndicatorProps) {
  return (
    <TreeItemIndicatorPrimitive
      className={mergeClassName(s.TreeItemIndicator, className)}
      {...props}
    >
      {children ?? <ChevronRight aria-hidden="true" />}
    </TreeItemIndicatorPrimitive>
  )
}

export type TreeItemCheckboxProps = ComponentProps<typeof TreeItemCheckboxPrimitive>

/** A box with Kova's check, or a dash while a branch is partly checked, unless you pass children. */
function TreeItemCheckbox({ className, children, ...props }: TreeItemCheckboxProps) {
  return (
    <TreeItemCheckboxPrimitive className={mergeClassName(s.TreeItemCheckbox, className)} {...props}>
      {children ?? (
        <>
          <Check aria-hidden="true" className={s.TreeItemCheckboxCheck} />
          <Minus aria-hidden="true" className={s.TreeItemCheckboxDash} />
        </>
      )}
    </TreeItemCheckboxPrimitive>
  )
}

export type TreeGroupProps = ComponentProps<typeof TreeGroupPrimitive>

function TreeGroup({ className, ...props }: TreeGroupProps) {
  return <TreeGroupPrimitive className={mergeClassName(s.TreeGroup, className)} {...props} />
}

export type TreeItemsProps = {
  /** The items to render, each with its children. */
  items: readonly TreeItemData[]
}

/** Renders items as data with Kova's parts, recursively. A link item renders its label as an `<a>`. */
function TreeItems({ items }: TreeItemsProps) {
  return items.map((item) => (
    <TreeItem key={item.value} value={item.value} disabled={item.disabled}>
      <TreeItemLabel render={item.href ? <a href={item.href} /> : undefined}>
        {item.children && <TreeItemIndicator />}
        <span>{item.label}</span>
      </TreeItemLabel>
      {item.children && (
        <TreeGroup>
          <TreeItems items={item.children} />
        </TreeGroup>
      )}
    </TreeItem>
  ))
}

Tree.Item = TreeItem
Tree.Items = TreeItems
Tree.Group = TreeGroup
Tree.ItemLabel = TreeItemLabel
Tree.ItemCheckbox = TreeItemCheckbox
Tree.ItemIndicator = TreeItemIndicator
