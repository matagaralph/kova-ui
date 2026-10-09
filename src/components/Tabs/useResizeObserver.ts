import { type RefObject, useEffect, useRef } from "react"

export function useResizeObserver<T extends Element>(
  callback: (entries: ResizeObserverEntry[]) => void,
  target: RefObject<T | null>,
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    const element = target.current
    if (!element || typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver((entries) => callbackRef.current(entries))
    observer.observe(element)

    return () => observer.disconnect()
  }, [target])
}
