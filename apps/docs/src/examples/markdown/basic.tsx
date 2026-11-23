import { Markdown } from "@kova-ui/markdown"

const content = `## Word of the day: mbira

**Mbira** is a thumb piano, played with the thumbs on metal keys fixed to a wooden board.

- Part of speech: noun
- Example sentence ~~missing~~ added by Rudo Moyo
- Read more about the [mbira on Wikipedia](https://en.wikipedia.org/wiki/Mbira)

| Dialect | Recordings |
| ------- | ---------- |
| Zezuru  | 4          |
| Karanga | 2          |

\`\`\`ts
const entry = await dictionary.get("mbira")
\`\`\`
`

function Example() {
  return <Markdown>{content}</Markdown>
}

export { Example }
