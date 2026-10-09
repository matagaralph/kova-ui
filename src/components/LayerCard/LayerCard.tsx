"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import clsx from "clsx"
import {
  Children,
  type ComponentPropsWithoutRef,
  forwardRef,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import s from "./LayerCard.module.css"
import { layerCardVariants, type LayerCardVariantsProps } from "./variants.js"

function hasLayerCardSections(children: ReactNode): boolean {
  return Children.toArray(children).some((child): boolean => {
    if (!isValidElement(child)) {
      return false
    }

    if (child.type === LayerCardPrimary || child.type === LayerCardSecondary) {
      return true
    }

    if (child.type === Fragment) {
      const fragmentChild = child as ReactElement<{ children?: ReactNode }>
      return hasLayerCardSections(fragmentChild.props.children)
    }

    return false
  })
}

/**
 * LayerCard component props.
 *
 * @example
 * ```tsx
 * <LayerCard className="p-4">
 *   Get started with Kova UI
 * </LayerCard>
 *
 * <LayerCard>
 *   <LayerCard.Secondary>Next Steps</LayerCard.Secondary>
 *   <LayerCard.Primary>Get started with Kova UI</LayerCard.Primary>
 * </LayerCard>
 * ```
 */
export type LayerCardProps = useRender.ComponentProps<"div"> & LayerCardVariantsProps

export type LayerCardSectionProps = ComponentPropsWithoutRef<"div">

/**
 * Card container for both simple surfaces and layered layouts.
 *
 * Render children directly for a single-surface card, or use
 * `LayerCard.Secondary` and `LayerCard.Primary` for the layered card treatment.
 *
 * @example
 * ```tsx
 * <LayerCard className="p-4">Card content</LayerCard>
 * ```
 *
 * @example
 * ```tsx
 * <LayerCard>
 *   <LayerCard.Secondary>Getting Started</LayerCard.Secondary>
 *   <LayerCard.Primary>Quick start guide</LayerCard.Primary>
 * </LayerCard>
 * ```
 */
const LayerCardRoot = forwardRef<HTMLDivElement, LayerCardProps>(function LayerCard(
  { children, className, render, ...props },
  ref,
) {
  const hasStructuredLayers = hasLayerCardSections(children)

  const defaultProps: useRender.ElementProps<"div"> = {
    className: clsx(hasStructuredLayers ? s.Layered : layerCardVariants(), className),
  }

  return useRender({
    defaultTagName: "div",
    render,
    ref,
    props: mergeProps<"div">(defaultProps, props, { children }),
  })
})

function LayerCardSecondary({ children, className, ...props }: LayerCardSectionProps) {
  return (
    <div className={clsx(s.Secondary, className)} {...props}>
      {children}
    </div>
  )
}

function LayerCardPrimary({ children, className, ...props }: LayerCardSectionProps) {
  return (
    <div className={clsx(s.Primary, className)} {...props}>
      {children}
    </div>
  )
}

LayerCardRoot.displayName = "LayerCard"
LayerCardSecondary.displayName = "LayerCard.Secondary"
LayerCardPrimary.displayName = "LayerCard.Primary"

type LayerCardComponent = typeof LayerCardRoot & {
  Primary: typeof LayerCardPrimary
  Secondary: typeof LayerCardSecondary
}

const LayerCard = Object.assign(LayerCardRoot, {
  Primary: LayerCardPrimary,
  Secondary: LayerCardSecondary,
}) as LayerCardComponent

export { LayerCard }
