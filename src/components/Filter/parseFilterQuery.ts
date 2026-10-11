import type { ComponentType, ReactNode, SVGProps } from "react"

export type FilterSuggestion = {
  /** Value inserted into the query */
  value: string
  /** Text shown in the suggestion list. Defaults to `value` */
  label?: string
  /** Secondary text shown next to the label */
  description?: string
  /** Visual shown before the label, such as an avatar or a color swatch */
  leadingVisual?: ReactNode
}

export type FilterProvider = {
  /** Qualifier key typed by the user, as in `key:value` */
  key: string
  /** Human readable name, shown in suggestions and the advanced filter dialog */
  displayName?: string
  /** Short explanation shown in the qualifier suggestions */
  description?: string
  /** Icon shown next to the qualifier in suggestions */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  /** Other keys that resolve to this provider */
  aliases?: string[]
  /**
   * Kind of value the qualifier accepts. `"select"` values must match one of `options`, `"number"`
   * and `"date"` (YYYY-MM-DD) accept comparisons like `>5` and ranges like `1..5`
   * @default text
   */
  type?: "select" | "text" | "number" | "date"
  /** Values suggested while typing, and accepted for `"select"` providers */
  options?: FilterSuggestion[]
  /** Loads value suggestions for the typed text, for example from an API */
  getSuggestions?: (
    query: string,
    context?: Record<string, unknown>,
  ) => FilterSuggestion[] | Promise<FilterSuggestion[]>
  /** Whether several comma separated values are allowed, as in `key:a,b` */
  allowsMultiple?: boolean
  /**
   * Whether the qualifier can be excluded with a leading `-`, as in `-key:value`
   * @default true
   */
  negatable?: boolean
  /** Custom validation. Return a message when the values are invalid */
  validate?: (values: string[]) => string | undefined
}

export type FilterTextBlock = {
  type: "text"
  raw: string
  start: number
  end: number
}

export type FilterQualifierBlock = {
  type: "qualifier"
  raw: string
  start: number
  end: number
  /** Key as typed, without the `-` prefix */
  key: string
  /** The provider the key resolves to, if any */
  provider?: FilterProvider
  negated: boolean
  values: string[]
  /** Validation message for this qualifier */
  invalid?: string
}

export type FilterBlock = FilterTextBlock | FilterQualifierBlock

export type FilterQuery = {
  raw: string
  blocks: FilterBlock[]
  /** Free text, without qualifiers */
  text: string
  qualifiers: FilterQualifierBlock[]
  validationMessages: string[]
  isValid: boolean
}

type Token = { raw: string; start: number; end: number }

export const tokenize = (value: string): Token[] => {
  const tokens: Token[] = []
  let start = -1
  let quoted = false
  for (let i = 0; i <= value.length; i++) {
    const char = value[i]
    const isBoundary = i === value.length || (!quoted && /\s/.test(char))
    if (isBoundary) {
      if (start !== -1) tokens.push({ raw: value.slice(start, i), start, end: i })
      start = -1
      continue
    }
    if (start === -1) start = i
    if (char === '"') quoted = !quoted
  }
  return tokens
}

const QUALIFIER = /^(-?)([A-Za-z][\w.-]*):([\s\S]*)$/

export const splitValues = (raw: string): string[] => {
  const values: string[] = []
  let current = ""
  let quoted = false
  for (const char of raw) {
    if (char === '"') quoted = !quoted
    else if (char === "," && !quoted) {
      values.push(current)
      current = ""
    } else current += char
  }
  values.push(current)
  return values
}

export const quoteValue = (value: string) => (/[\s,]/.test(value) ? `"${value}"` : value)

export const findProvider = (providers: FilterProvider[], key: string) => {
  const lower = key.toLowerCase()
  return providers.find(
    (provider) =>
      provider.key.toLowerCase() === lower ||
      provider.aliases?.some((alias) => alias.toLowerCase() === lower),
  )
}

const COMPARISON = String.raw`(?:>=|<=|>|<)?`
const NUMBER = String.raw`-?\d+(?:\.\d+)?`
const DATE = String.raw`\d{4}-\d{2}-\d{2}`
const NUMBER_VALUE = new RegExp(`^(?:${COMPARISON}${NUMBER}|${NUMBER}\\.\\.${NUMBER})$`)
const DATE_VALUE = new RegExp(`^(?:${COMPARISON}${DATE}|${DATE}\\.\\.${DATE})$`)

const isValidDate = (value: string) =>
  (value.match(/\d{4}-\d{2}-\d{2}/g) ?? []).every((date) => {
    const parsed = new Date(`${date}T00:00:00Z`)
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date)
  })

const validateQualifier = (block: FilterQualifierBlock): string | undefined => {
  const { provider, key, values, negated } = block
  if (!provider) return `"${key}" is not a valid filter`
  const filled = values.filter((value) => value !== "")
  if (filled.length === 0) return `"${key}" needs a value`
  if (negated && provider.negatable === false) return `"${key}" can't be excluded`
  if (filled.length > 1 && !provider.allowsMultiple) return `"${key}" accepts only one value`
  for (const value of filled) {
    if (provider.type === "number" && !NUMBER_VALUE.test(value)) {
      return `"${value}" is not a number for "${key}"`
    }
    if (provider.type === "date" && (!DATE_VALUE.test(value) || !isValidDate(value))) {
      return `"${value}" is not a date for "${key}". Use YYYY-MM-DD`
    }
    if (
      provider.type === "select" &&
      provider.options &&
      !provider.options.some((option) => option.value.toLowerCase() === value.toLowerCase())
    ) {
      return `"${value}" is not a valid value for "${key}"`
    }
  }
  return provider.validate?.(filled)
}

/** Parses a filter query like `status:open -label:bug,docs search text` into blocks */
export const parseFilterQuery = (value: string, providers: FilterProvider[]): FilterQuery => {
  const blocks: FilterBlock[] = tokenize(value).map((token) => {
    const match = QUALIFIER.exec(token.raw)
    if (!match) return { type: "text", ...token }
    const [, negation, key, rawValues] = match
    const block: FilterQualifierBlock = {
      type: "qualifier",
      ...token,
      key,
      provider: findProvider(providers, key),
      negated: negation === "-",
      values: splitValues(rawValues),
    }
    block.invalid = validateQualifier(block)
    return block
  })
  const qualifiers = blocks.filter((block) => block.type === "qualifier")
  const validationMessages = qualifiers.flatMap((block) => (block.invalid ? [block.invalid] : []))
  return {
    raw: value,
    blocks,
    text: blocks
      .filter((block) => block.type === "text")
      .map((block) => block.raw)
      .join(" "),
    qualifiers,
    validationMessages,
    isValid: validationMessages.length === 0,
  }
}
