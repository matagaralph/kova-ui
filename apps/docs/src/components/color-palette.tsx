import { colorPalettes } from "../lib/tokens.js"
import { CopyButton } from "./copy-button.js"

/** The swatches of one primitive palette. Selecting a swatch copies its `var()` */
export default function ColorPalette({ group }: { group: string }) {
  const palette = colorPalettes.find((p) => p.title === group)
  if (!palette) return null

  return (
    <ul className="docs-palette" aria-label={`${group} palette`}>
      {palette.tokens.map((token) => {
        const step = token.name.replace(/^--[a-z]+-/, "")
        return (
          <li key={token.name}>
            <CopyButton value={`var(${token.name})`} label={token.name} className="docs-swatch">
              <span
                aria-hidden="true"
                className="docs-swatch-color"
                style={{ background: `var(${token.name})` }}
              />
              <span className="docs-swatch-name">{step}</span>
              <span className="docs-swatch-value">
                {token.light ? `${token.light} / ${token.dark}` : token.value}
              </span>
            </CopyButton>
          </li>
        )
      })}
    </ul>
  )
}
