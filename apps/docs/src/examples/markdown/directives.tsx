import { createMarkdownDirective, Markdown } from "@kova-ui/markdown"
import { Badge } from "kova-ui/components"

const status = createMarkdownDirective<{ children?: string; color?: "success" | "danger" }>({
  name: "status",
  mode: "inline",
  render: ({ children, color }) => <Badge color={color}>{children}</Badge>,
})

function Example() {
  const content = `Dictionary ${status({ children: "Operational", color: "success" })}

Audio uploads ${status({ children: "Degraded", color: "danger" })}`

  return <Markdown directives={[status]}>{content}</Markdown>
}

export { Example }
