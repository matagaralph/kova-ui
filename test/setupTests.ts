import { cleanup } from "@testing-library/react"
import { test } from "vite-plus/test"
import { executeWithRetries } from "./utils/executeWithRetries.js"

function globalRetryTest(maxRetries: number, name: string, fn: () => Promise<void> | void) {
  test(name, async () => {
    await executeWithRetries(
      maxRetries,
      async () => {
        await fn()
      },
      async () => {
        // Ensure DOM is cleared between attempts
        cleanup()
      },
    )
  })
}

type GlobalThis = typeof globalThis
type GlobalThisWithRetryTest = GlobalThis & {
  retryTest: typeof globalRetryTest
}

const g = globalThis as GlobalThisWithRetryTest
g.retryTest = globalRetryTest

declare global {
  var __UI_SDK_STRICT__: boolean | undefined
}
globalThis.__UI_SDK_STRICT__ = true

// happy-dom lacks the top-layer, animation and layout APIs ui-sdk popups call
HTMLElement.prototype.showPopover = function () {}
HTMLElement.prototype.hidePopover = function () {}
Element.prototype.getAnimations = () => []
Element.prototype.scrollIntoView = function () {}
Element.prototype.checkVisibility = () => true
Element.prototype.getClientRects = () => [] as unknown as DOMRectList
document.elementFromPoint = () => null
document.elementsFromPoint = () => []
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
document.head.append(
  Object.assign(document.createElement("style"), {
    textContent: "[popover] { display: block !important }",
  }),
)
