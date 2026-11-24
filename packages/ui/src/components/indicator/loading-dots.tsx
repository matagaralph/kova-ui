import type { ComponentProps } from "react"
import { cn } from "../../lib/cn.js"
import s from "./loading-dots.module.css"

export type LoadingDotsProps = Omit<ComponentProps<"div">, "children">

export const LoadingDots = ({ className, ...restProps }: LoadingDotsProps) => {
  return (
    <div className={cn(s.LoadingDots, className)} data-slot="loading-dots" {...restProps}>
      <div className={s.Dot} />
      <div className={s.Dot} />
      <div className={s.Dot} />
    </div>
  )
}
