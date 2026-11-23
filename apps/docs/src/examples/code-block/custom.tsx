import { CodeBlockBase } from "@kova-ui/markdown"
import { CopyButton } from "kova-ui/components"

const code = `export async function getEntry(headword: string) {
  const response = await fetch(\`/api/entries/\${headword}\`)
  return response.json()
}`

function Example() {
  return (
    <CodeBlockBase>
      <div className="flex items-center justify-between border-b border-(--alpha-06) bg-(--alpha-02) px-4 py-1">
        <span className="text-sm font-semibold text-secondary">entry.ts</span>
        <CopyButton
          copyValue={code}
          variant="ghost"
          size="md"
          uniform
          className="-mr-2"
          aria-label="Copy entry.ts"
        />
      </div>
      <CodeBlockBase.Code language="typescript">{code}</CodeBlockBase.Code>
    </CodeBlockBase>
  )
}

export { Example }
