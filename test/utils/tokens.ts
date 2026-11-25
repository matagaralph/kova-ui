import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import postcss from "postcss"
import valueParser from "postcss-value-parser"

export type Mode = "light" | "dark"
export type Rgba = { r: number; g: number; b: number; a: number }

const STYLES = resolve(import.meta.dirname, "../../packages/ui/src/styles")
const FILES = [
  "variables-primitive.css",
  "variables-brand.css",
  "variables-semantic.css",
  "variables-components.css",
]

/** Custom properties declared in `@theme`, and for `:root` and `[data-theme]`, as Kova ships them */
export function readTokens(): Map<string, string> {
  const tokens = new Map<string, string>()
  for (const file of FILES) {
    const root = postcss.parse(readFileSync(resolve(STYLES, file), "utf8"))
    root.walkDecls((decl) => {
      if (!decl.prop.startsWith("--")) return
      if (decl.parent?.type === "atrule" && (decl.parent as postcss.AtRule).name === "theme") {
        tokens.set(decl.prop, decl.value)
        return
      }
      if (decl.parent?.type !== "rule") return
      const selector = (decl.parent as postcss.Rule).selector
      if (!/:root|data-theme\]\)?\s*$/.test(selector) || /data-theme="/.test(selector)) return
      tokens.set(decl.prop, decl.value)
    })
  }
  return tokens
}

function oklchToRgb(l: number, c: number, h: number) {
  const hr = (h * Math.PI) / 180
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  const gamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)
  return {
    r: gamma(clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_)),
    g: gamma(clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_)),
    b: gamma(clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_)),
  }
}

function num(value: string) {
  return value.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value)
}

/** Resolves a token to a gamma-encoded sRGB color for a mode, or null when it isn't a color */
export function resolveColor(tokens: Map<string, string>, value: string, mode: Mode): Rgba | null {
  const nodes = valueParser(value.trim()).nodes.filter((n) => n.type !== "space")
  if (nodes.length !== 1) return null
  const node = nodes[0]
  if (node.type !== "function") return null
  const args = splitArgs(node.nodes)

  switch (node.value) {
    case "var": {
      const name = args[0]
      const own = tokens.get(name)
      // A defined token that can't compute, like a mix of an unset brand input, falls back
      const resolved = own === undefined ? null : resolveColor(tokens, own, mode)
      if (resolved) return resolved
      return args[1] === undefined ? null : resolveColor(tokens, args.slice(1).join(", "), mode)
    }
    case "light-dark":
      return resolveColor(tokens, mode === "light" ? args[0] : args[1], mode)
    case "alpha": {
      const color = resolveColor(tokens, args[0], mode)
      return color && { ...color, a: color.a * num(args[1]) }
    }
    case "oklch": {
      // Relative colors only compute in a browser; treat them as unresolved so fallbacks apply
      if (node.nodes.some((n) => n.type === "word" && n.value === "from")) return null
      const [channels, alpha] = valueParser.stringify(node.nodes).split("/")
      const [l, c, h] = channels.trim().split(/\s+/)
      const srgb = oklchToRgb(num(l), parseFloat(c), parseFloat(h))
      return {
        ...srgb,
        a: alpha === undefined ? 1 : num(alpha.trim()),
      }
    }
    default:
      return null
  }
}

function splitArgs(nodes: valueParser.Node[]) {
  const args: string[] = []
  let current: valueParser.Node[] = []
  for (const n of nodes) {
    if (n.type === "div" && n.value === ",") {
      args.push(valueParser.stringify(current).trim())
      current = []
    } else current.push(n)
  }
  args.push(valueParser.stringify(current).trim())
  return args
}

/** Source-over compositing, which browsers do in gamma-encoded sRGB */
export function over(top: Rgba, bottom: Rgba): Rgba {
  const a = top.a
  return {
    r: top.r * a + bottom.r * (1 - a),
    g: top.g * a + bottom.g * (1 - a),
    b: top.b * a + bottom.b * (1 - a),
    a: 1,
  }
}

export function contrast(fg: Rgba, bg: Rgba) {
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  const lum = (c: Rgba) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b)
  const color = over(fg, bg)
  const [hi, lo] = [lum(color), lum(bg)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
