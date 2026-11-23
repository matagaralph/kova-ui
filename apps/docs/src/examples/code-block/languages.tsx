import { CodeBlock } from "@kova-ui/markdown"

const snippets = [
  { language: "python", code: 'def greet(name: str) -> str:\n    return f"Mhoro, {name}"' },
  { language: "bash", code: "pnpm add kova-ui @kova-ui/markdown" },
  {
    language: "json",
    code: '{\n  "headword": "mvura",\n  "meaning": "water",\n  "partOfSpeech": "noun"\n}',
  },
  { language: "sql", code: "SELECT headword, meaning FROM entries WHERE status = 'published';" },
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
