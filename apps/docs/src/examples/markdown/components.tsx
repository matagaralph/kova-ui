import { Markdown, type MarkdownComponent } from "@kova-ui/markdown"

const Heading: MarkdownComponent = ({ children }) => (
  <h3 className="text-sm font-semibold tracking-wide text-secondary uppercase">{children}</h3>
)

function Example() {
  return (
    <Markdown components={{ h2: Heading }} copyableCodeBlocks={false}>
      {"## Summary\n\nThe import added `128` dictionary entries.\n\n```bash\npnpm run import\n```"}
    </Markdown>
  )
}

export { Example }
