import type { Meta } from "@storybook/react-vite"
import { Markdown } from "./Markdown.js"
import sampleMarkdown from "./sampleMarkdown.md?raw"

const meta = {
  title: "Components/Markdown",
  component: Markdown,
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Markdown>

export default meta

export const Base = () => <Markdown>{sampleMarkdown}</Markdown>

Base.parameters = {
  docs: {
    source: {
      code: `
  <Markdown>{markdownContent}</Markdown>
`,
    },
  },
}
