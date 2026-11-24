import { type RefObject, useEffect, useRef, useState } from "react"

// Hides tab icons once the list is narrower than its tabs need with icons shown
export function useHideIconsWhenNarrow(listRef: RefObject<HTMLElement | null>) {
  const [hidden, setHidden] = useState(false)
  const widthWithIcons = useRef(0)

  useEffect(() => {
    const list = listRef.current
    if (!list || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(() => {
      if (!list.hasAttribute("data-has-icons")) return
      if (!list.hasAttribute("data-icons-hidden")) widthWithIcons.current = list.scrollWidth
      setHidden(list.clientWidth < widthWithIcons.current)
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [listRef])

  return hidden
}
