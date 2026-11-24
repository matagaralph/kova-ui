"use client"

import { type ComponentProps, useState } from "react"
import { cn } from "../../lib/cn.js"
import s from "./image.module.css"

const loadedSrcs = new Set<string>()

export type ImageProps = ComponentProps<"img"> & {
  /** Keeps the `img` in the page after it fails to load, showing the browser's broken image. */
  forceRenderAfterLoadFail?: boolean
}

export function Image({
  src,
  className,
  draggable = false,
  onLoad,
  onError,
  forceRenderAfterLoadFail = false,
  ...restProps
}: ImageProps) {
  const [loaded, setLoaded] = useState(() => !!src && loadedSrcs.has(src))
  const [failed, setFailed] = useState(false)
  const considerLoaded = loaded || (failed && forceRenderAfterLoadFail)

  if (!src || (!forceRenderAfterLoadFail && failed)) {
    return null
  }

  return (
    <img
      {...restProps}
      src={src}
      className={cn(s.Image, className)}
      data-slot="image"
      onLoad={(evt) => {
        setLoaded(true)
        loadedSrcs.add(src)
        onLoad?.(evt)
      }}
      onError={(evt) => {
        setFailed(true)
        onError?.(evt)
      }}
      data-loaded={considerLoaded ? "" : undefined}
      draggable={draggable}
    />
  )
}
