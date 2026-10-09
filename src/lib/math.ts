export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

const shift = (value: number, exponent: number): number => {
  const [mantissa, current = "0"] = String(value).split("e")
  return Number(`${mantissa}e${Number(current) + exponent}`)
}

export const round = (value: number, precision: number = 0): number =>
  shift(Math.round(shift(value, precision)), -precision)
