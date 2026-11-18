import { Markdown } from "@kova-ui/markdown"

const content = `## Release notes

Version **2.18** makes sync faster and fixes a few bugs.

- Background sync runs every 5 minutes
- Exports keep their ~~old~~ new file names
- Read the [full changelog](https://example.com/changelog)

| Plan | Seats |
| ---- | ----- |
| Team | 10    |
| Business | 50 |

\`\`\`ts
await client.sync({ since: lastSync })
\`\`\`
`

function Example() {
  return <Markdown>{content}</Markdown>
}

export { Example }
