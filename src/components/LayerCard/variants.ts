import clsx from "clsx"
import s from "./LayerCard.module.css"

/** LayerCard variant definitions (currently empty, reserved for future additions). */
export const LAYER_CARD_VARIANTS = {
  // LayerCard currently has no variant options but structure is ready for future additions
} as const

export const LAYER_CARD_DEFAULT_VARIANTS = {} as const

// Derived types from LAYER_CARD_VARIANTS
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LayerCardVariantsProps {}

export function layerCardVariants(_props: LayerCardVariantsProps = {}) {
  return clsx(s.Surface)
}
