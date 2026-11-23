import { Check, Copy } from "@kova-ui/icons"
import { Animate, Button } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant="secondary"
      uniform
      aria-label={copied ? "Copied" : "Copy proverb"}
      onClick={() => {
        void navigator.clipboard?.writeText("Chara chimwe hachitswanyi inda.")
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      <Animate
        className="size-(--button-icon-size)"
        enter={{ scale: 1, delay: 150, duration: 400 }}
        exit={{ scale: 0.6, duration: 150 }}
      >
        {copied ? <Check key="copied" /> : <Copy key="copy" />}
      </Animate>
    </Button>
  )
}

export { Example }
