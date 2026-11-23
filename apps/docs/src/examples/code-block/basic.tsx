import { CodeBlock } from "@kova-ui/markdown"

const code = `import { Button } from "kova-ui/components"

export function SaveEntry() {
  return <Button>Save entry</Button>
}`

function Example() {
  return <CodeBlock language="tsx">{code}</CodeBlock>
}

export { Example }
