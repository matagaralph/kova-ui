import iconsIndex from "../../../../packages/icons/src/index.tsx?raw"
import brandCss from "../../../../packages/ui/src/styles/variables-brand.css?raw"
import componentsCss from "../../../../packages/ui/src/styles/variables-components.css?raw"
import primitiveCss from "../../../../packages/ui/src/styles/variables-primitive.css?raw"
import semanticCss from "../../../../packages/ui/src/styles/variables-semantic.css?raw"

export type Token = {
  /** The custom property, like `--gray-100` */
  name: string
  /** The value as written. With `light-dark()`, `light` and `dark` hold each side */
  value: string
  light?: string
  dark?: string
}

export type TokenGroup = {
  title: string
  tokens: Token[]
}

/** Splits `light-dark(a, b)` at its top-level comma */
function splitLightDark(value: string) {
  const match = /^light-dark\((.*)\)$/.exec(value)
  if (!match?.[1]) return null
  let depth = 0
  for (let i = 0; i < match[1].length; i++) {
    const char = match[1][i]
    if (char === "(") depth++
    else if (char === ")") depth--
    else if (char === "," && depth === 0) {
      return { light: match[1].slice(0, i).trim(), dark: match[1].slice(i + 1).trim() }
    }
  }
  return null
}

/** Reads the custom properties of a Kova stylesheet, grouped by its `/* === Title === *\/` headings */
function parseTokens(css: string, firstGroup: string): TokenGroup[] {
  const groups: TokenGroup[] = []
  const pattern = /\/\*\s*=+\s*\n\s*(.+?)\s*\n\s*=+\s*\*\/|(--[\w-]+)\s*:\s*([^;{}]+);/g
  for (const match of css.matchAll(pattern)) {
    if (match[1]) {
      groups.push({ title: match[1].replace(/\s+-\s+.*$/, ""), tokens: [] })
      continue
    }
    const name = match[2]
    const value = match[3]?.replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")").trim()
    if (!name || !value || name.startsWith("--tw-")) continue
    if (groups.length === 0) groups.push({ title: firstGroup, tokens: [] })
    groups[groups.length - 1]?.tokens.push({ name, value, ...splitLightDark(value) })
  }
  return groups.filter((group) => group.tokens.length > 0)
}

export const primitiveTokens = parseTokens(primitiveCss, "Primitives")
export const semanticTokens = parseTokens(semanticCss, "Semantic")
export const componentTokens = parseTokens(componentsCss, "Components")
export const brandTokens = parseTokens(brandCss, "Brand")

export const tokenSources = {
  primitive: primitiveTokens,
  semantic: semanticTokens,
  components: componentTokens,
  brand: brandTokens,
} satisfies Record<string, TokenGroup[]>

export type TokenSource = keyof typeof tokenSources

const PALETTE_GROUPS = [
  "Gray",
  "Alpha transparency",
  "Green",
  "Red",
  "Pink",
  "Orange",
  "Yellow",
  "Purple",
  "Blue",
]

/** The primitive color palettes, in display order */
export const colorPalettes = PALETTE_GROUPS.flatMap((title) => {
  const group = primitiveTokens.find((g) => g.title === title)
  return group ? [group] : []
})

/** Whether a token holds a color, so it gets a swatch */
export function isColorToken(token: Token) {
  return (
    /^--(color-|gray-|alpha-|green-|red-|pink-|orange-|yellow-|purple-|blue-|white$|black$)/.test(
      token.name,
    ) || /-(color|background|border|fill)(-|$)/.test(token.name)
  )
}

/** Every icon exported by `@kova-ui/icons`, alphabetically */
export const iconNames = Array.from(iconsIndex.matchAll(/as (\w+) \}/g), (m) => m[1] ?? "")
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b))

function escapeCell(text: string) {
  return text.replace(/\|/g, "\\|")
}

/**
 * Markdown tables for token groups, with light and dark columns when any token has them. Each table
 * gets a heading at `headingLevel`, or none at `0`.
 */
export function tokensToMarkdown(groups: TokenGroup[], headingLevel = 0) {
  return groups
    .map((group) => {
      const themed = group.tokens.some((token) => token.light)
      const header = themed
        ? "| Token | Light | Dark |\n| --- | --- | --- |"
        : "| Token | Value |\n| --- | --- |"
      const rows = group.tokens.map((token) =>
        themed
          ? `| \`${token.name}\` | \`${escapeCell(token.light ?? token.value)}\` | \`${escapeCell(token.dark ?? token.value)}\` |`
          : `| \`${token.name}\` | \`${escapeCell(token.value)}\` |`,
      )
      const table = `${header}\n${rows.join("\n")}`
      return headingLevel ? `${"#".repeat(headingLevel)} ${group.title}\n\n${table}` : table
    })
    .join("\n\n")
}
