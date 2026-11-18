import { isColorToken, type Token, type TokenSource, tokenSources } from "../lib/tokens.js"
import { CopyButton } from "./copy-button.js"

type TokenTableProps = {
  source: TokenSource
  /** One group of the source, by its heading in Kova's stylesheet. All groups when unset */
  group?: string
}

function Sample({ token }: { token: Token }) {
  if (isColorToken(token)) {
    return (
      <span
        aria-hidden="true"
        className="docs-token-sample"
        style={{ background: `var(${token.name})` }}
      />
    )
  }
  if (/^--shadow-\d/.test(token.name)) {
    return (
      <span
        aria-hidden="true"
        className="docs-token-sample"
        style={{ boxShadow: `var(${token.name})` }}
      />
    )
  }
  if (token.name.startsWith("--radius-")) {
    return (
      <span
        aria-hidden="true"
        className="docs-token-sample docs-token-sample-radius"
        style={{ borderRadius: `var(${token.name})` }}
      />
    )
  }
  return null
}

/** Kova's tokens, read from its stylesheets at build time */
export default function TokenTable({ source, group }: TokenTableProps) {
  const groups = (tokenSources[source] ?? []).filter((g) => !group || g.title === group)

  return (
    <>
      {groups.map((g) => {
        const themed = g.tokens.some((token) => token.light)
        return (
          <div key={g.title} className="docs-table not-prose" tabIndex={0}>
            <table>
              {!group && <caption>{g.title}</caption>}
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">{themed ? "Light" : "Value"}</th>
                  {themed && <th scope="col">Dark</th>}
                </tr>
              </thead>
              <tbody>
                {g.tokens.map((token) => (
                  <tr key={token.name}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Sample token={token} />
                        <CopyButton
                          value={`var(${token.name})`}
                          label={token.name}
                          className="docs-token-name"
                        >
                          {token.name}
                        </CopyButton>
                      </div>
                    </td>
                    <td>
                      <code>{token.light ?? token.value}</code>
                    </td>
                    {themed && (
                      <td>
                        <code>{token.dark ?? token.value}</code>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}
