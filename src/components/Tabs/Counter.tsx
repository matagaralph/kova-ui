import { type ReactNode } from "react"
import badgeStyles from "../Badge/Badge.module.css"

// A `span` styled as a Badge (a `div` is not valid inside links and buttons), announced as "(count)"
export const Counter = ({ children }: { children: ReactNode }) => (
  <>
    <span
      className={badgeStyles.Badge}
      data-color="secondary"
      data-size="sm"
      data-variant="soft"
      data-pill=""
      aria-hidden="true"
    >
      {children}
    </span>
    <span className="sr-only">
      {" "}({children})
    </span>
  </>
)
