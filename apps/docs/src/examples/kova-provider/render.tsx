import { TextLink } from "kova-ui/components"
import type { ComponentProps } from "react"

function RouterLink({ href, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        event.preventDefault()
        window.history.pushState(null, "", href)
      }}
    />
  )
}

function Example() {
  return (
    <p className="text-sm">
      Go to{" "}
      <TextLink href="#settings" render={<RouterLink />}>
        your settings
      </TextLink>{" "}
      to change it.
    </p>
  )
}

export { Example }
