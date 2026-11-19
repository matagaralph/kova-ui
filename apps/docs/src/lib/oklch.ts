const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const trim = (n: number, digits: number) => String(Number(n.toFixed(digits)))

/** `#0169cc` as `oklch(52.86% 0.1734 254.97deg)`. Other values pass through */
export function hexToOklch(hex: string) {
  const match = /^#([\da-f]{6})$/i.exec(hex)
  if (!match?.[1]) return hex
  const [r, g, b] = [0, 2, 4].map((i) => linear(parseInt(match[1]!.slice(i, i + 2), 16) / 255))
  const l = Math.cbrt(0.4122214708 * r! + 0.5363325363 * g! + 0.0514459929 * b!)
  const m = Math.cbrt(0.2119034982 * r! + 0.6806995451 * g! + 0.1073969566 * b!)
  const s = Math.cbrt(0.0883024619 * r! + 0.2817188376 * g! + 0.6299787005 * b!)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const C = Math.hypot(A, B)
  if (C < 0.0005) return `oklch(${trim(L * 100, 2)}% 0 0deg)`
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360
  return `oklch(${trim(L * 100, 2)}% ${trim(C, 4)} ${trim(H, 2)}deg)`
}

/** The lightness of an `oklch()` color, from 0 to 1 */
export function oklchLightness(color: string) {
  const match = /^oklch\(([\d.]+)%/.exec(color)
  return match?.[1] ? Number(match[1]) / 100 : null
}
