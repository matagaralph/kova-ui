import { Markdown, type MarkdownComponent } from "@kova-ui/markdown"

const Heading: MarkdownComponent = ({ children }) => (
  <h3 className="text-sm font-semibold tracking-wide text-secondary uppercase">{children}</h3>
)

function Example() {
  return (
    <Markdown components={{ h2: Heading }} copyableCodeBlocks={false}>
      {"## Summary\n\nThe deploy finished in `42s`.\n\n```bash\npnpm run deploy\n```"}
    </Markdown>
  )
}

export { Example }
