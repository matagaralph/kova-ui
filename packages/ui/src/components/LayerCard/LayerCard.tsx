import { renderElement, type PartProps } from "@ui-sdk/react/primitive"
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./LayerCard.module.css"

function hasLayerCardSections(children: ReactNode): boolean {
  return Children.toArray(children).some((child): boolean => {
    if (!isValidElement(child)) {
      return false
    }

    if (child.type === LayerCardPrimary || child.type === LayerCardSecondary) {
      return true
    }

    if (child.type === Fragment) {
      return hasLayerCardSections((child as ReactElement<{ children?: ReactNode }>).props.children)
    }

    return false
  })
}

export type LayerCardProps = PartProps<"div">

export function LayerCard({ children, className, render, ...props }: LayerCardProps) {
  const layered = typeof children !== "function" && hasLayerCardSections(children)

  return renderElement(
    "div",
    {
      ...props,
      "className": mergeClassName(layered ? s.Layered : s.Surface, className),
      "data-slot": "layer-card",
      "data-layered": layered ? "" : undefined,
      children,
    },
    render,
  )
}

export type LayerCardSectionProps = PartProps<"div">

function LayerCardSecondary({ className, render, ...props }: LayerCardSectionProps) {
  return renderElement(
    "div",
    {
      ...props,
      "className": mergeClassName(s.Secondary, className),
      "data-slot": "layer-card-secondary",
    },
    render,
  )
}

function LayerCardPrimary({ className, render, ...props }: LayerCardSectionProps) {
  return renderElement(
    "div",
    {
      ...props,
      "className": mergeClassName(s.Primary, className),
      "data-slot": "layer-card-primary",
    },
    render,
  )
}

LayerCardSecondary.displayName = "LayerCard.Secondary"
LayerCardPrimary.displayName = "LayerCard.Primary"

LayerCard.Primary = LayerCardPrimary
LayerCard.Secondary = LayerCardSecondary
