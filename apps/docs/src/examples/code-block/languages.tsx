import { CodeBlock } from "@kova-ui/markdown"

const snippets = [
  { language: "python", code: 'def greet(name: str) -> str:\n    return f"Hello, {name}"' },
  { language: "bash", code: "pnpm add kova-ui @kova-ui/markdown" },
  { language: "json", code: '{\n  "name": "acme",\n  "private": true\n}' },
  { language: "sql", code: "SELECT id, email FROM users WHERE active = true;" },
]

function Example() {
  return (
    <div className="flex w-full flex-col gap-3">
      {snippets.map((snippet) => (
        <CodeBlock key={snippet.language} language={snippet.language}>
          {snippet.code}
        </CodeBlock>
      ))}
    </div>
  )
}

export { Example }
