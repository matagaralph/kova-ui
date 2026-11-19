import { Tooltip } from "kova-ui/components"
import { useState } from "react"

import { oklchLightness } from "../lib/oklch.js"
import { colorPalettes, type Token } from "../lib/tokens.js"

/** Black or white, whichever reads better on a color */
function labelOn(color: string | undefined) {
  const lightness = oklchLightness(color ?? "")
  if (lightness === null) return "var(--color-text)"
  return lightness > 0.7 ? "#000" : "#fff"
}

function Swatch({ token }: { token: Token }) {
  const [copied, setCopied] = useState(false)
  const name = token.name.slice(2)
  const weight = name.slice(name.lastIndexOf("-") + 1)
  const color =
    token.light && token.dark
      ? `light-dark(${labelOn(token.light)}, ${labelOn(token.dark)})`
      : labelOn(token.value)

  return (
    <Tooltip>
      <Tooltip.Trigger
        render={
          <button
            type="button"
            className="docs-color"
            style={{ backgroundColor: `var(${token.name})`, color }}
            onClick={() => {
              void navigator.clipboard.writeText(`var(${token.name})`)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1300)
            }}
            onPointerLeave={() => setCopied(false)}
          />
        }
      >
        <span className="docs-color-label">{weight}</span>
      </Tooltip.Trigger>
      <Tooltip.Content maxWidth="none" gutterSize="sm" className="docs-color-tooltip">
        {copied ? (
          "Copied"
        ) : (
          <>
            <code>{name}</code>
            <code>
              {token.light && token.dark ? `${token.light} / ${token.dark}` : token.value}
            </code>
          </>
        )}
      </Tooltip.Content>
    </Tooltip>
  )
}

/** Steps like `--red-a25` sit over a dot grid, so their transparency shows */
function Strip({ tokens, length, alpha }: { tokens: Token[]; length: number; alpha?: boolean }) {
  return (
    <div className="docs-color-strip">
      {tokens.map((token) => (
        <div key={token.name} className={alpha ? "docs-color-alpha" : "docs-color-cell"}>
          <Swatch token={token} />
        </div>
      ))}
      {Array.from({ length: Math.max(0, length - tokens.length) }, (_, i) => (
        <div key={i} className="docs-color-cell" />
      ))}
    </div>
  )
}

const half = (tokens: Token[]) => Math.ceil(tokens.length / 2)

/** Kova's primitive palettes as strips of swatches. Selecting one copies its `var()` */
export default function ColorPalette() {
  const find = (title: string) => colorPalettes.find((p) => p.title === title)?.tokens ?? []
  const gray = find("Gray")
  const alpha = find("Alpha transparency").filter((token) => token.name !== "--alpha-base")
  const hues = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map(find)

  return (
    <div className="docs-colors">
      <h2 id="grayscale">Grayscale</h2>
      <Strip tokens={gray.slice(0, half(gray))} length={half(gray)} />
      <Strip tokens={gray.slice(half(gray))} length={half(gray)} />
      <h2 id="alphas">Alphas</h2>
      <Strip tokens={alpha} length={alpha.length} alpha />
      <h2 id="primary-colors">Primary colors</h2>
      {hues.map((tokens) => {
        const solid = tokens.filter((token) => !/-a\d+$/.test(token.name))
        const steps = tokens.filter((token) => /-a\d+$/.test(token.name))
        return (
          <div key={tokens[0]?.name} className="docs-color-hue">
            <Strip tokens={solid} length={solid.length} />
            {steps.length > 0 && <Strip tokens={steps} length={solid.length} alpha />}
          </div>
        )
      })}
    </div>
  )
}
