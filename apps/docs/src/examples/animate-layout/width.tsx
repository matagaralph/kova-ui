import { Check, Copy } from "@kova-ui/icons"
import { AnimateLayout, Button } from "kova-ui/components"
import { Fragment, useState } from "react"

function Example() {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      onClick={() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
    >
      <AnimateLayout dimension="width" transitionClassName="flex h-full items-center gap-2">
        {copied ? (
          <Fragment key="copied">
            <Check /> Copied
          </Fragment>
        ) : (
          <Fragment key="copy">
            <Copy /> Copy proverb
          </Fragment>
        )}
      </AnimateLayout>
    </Button>
  )
}

export { Example }
