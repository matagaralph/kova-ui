import { CodeBlock } from "@kova-ui/markdown"

const code = `import { Button } from "kova-ui/components"

export function Save() {
  return <Button color="primary">Save</Button>
}`

function Example() {
  return <CodeBlock language="tsx">{code}</CodeBlock>
}

export { Example }
