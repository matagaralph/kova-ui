"use client"

import { Autocomplete } from "@base-ui/react/autocomplete"
import { Filter as FilterIcon, Search, Warning, X } from "@kova-ui/icons"
import clsx from "clsx"
import {
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
  type Ref,
  type SVGProps,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { mergeRefs } from "../../lib/mergeRefs.js"
import { Button, ButtonLink } from "../Button/index.js"
import { Counter } from "../Tabs/Counter.js"
import s from "./Filter.module.css"
import { FilterDialog } from "./FilterDialog.js"
import {
  findProvider,
  type FilterProvider,
  type FilterQuery,
  type FilterSuggestion,
  parseFilterQuery,
  quoteValue,
  splitValues,
  tokenize,
} from "./parseFilterQuery.js"

export type FilterSubmitEvent = "enter" | "clear" | "dialog"

export type FilterRef = {
  /** Replaces the query, as if the user typed it */
  setValue: (value: string) => void
  /** Moves focus to the input */
  focus: () => void
}

export type FilterProps = {
  /** Visible name of the filter, also used as the input's accessible name */
  "label": string
  /**
   * Hide the label visually, keeping it available to assistive technology
   * @default false
   */
  "visuallyHideLabel"?: boolean
  /** Qualifiers the user can filter by */
  "providers": FilterProvider[]
  /**
   * Which controls to render. `"full"` shows the advanced filter button and the input, `"input"`
   * only the input, and `"button"` only the button that opens the advanced filter dialog
   * @default full
   */
  "variant"?: "full" | "input" | "button"
  /**
   * Style of the advanced filter button. `"compact"` shows only the icon
   * @default normal
   */
  "filterButtonVariant"?: "normal" | "compact"
  /** The query, when controlled */
  "filterValue"?: string
  /** Initial query, when uncontrolled */
  "initialFilterValue"?: string
  /** Called with the raw query whenever it changes */
  "onChange"?: (value: string) => void
  /** Called with the parsed query whenever it changes */
  "onParse"?: (query: FilterQuery) => void
  /** Called when the user submits the query with Enter, clears it, or applies the dialog */
  "onSubmit"?: (query: FilterQuery, eventType: FilterSubmitEvent) => void
  /** Called when the validation messages change */
  "onValidation"?: (messages: string[], query: FilterQuery) => void
  /** Replaces the built-in parser */
  "customParser"?: (value: string, providers: FilterProvider[]) => FilterQuery
  /** Passed to every provider's `getSuggestions` */
  "context"?: Record<string, unknown>
  "placeholder"?: string
  /**
   * Show a button that clears the query
   * @default true
   */
  "showClearButton"?: boolean
  /**
   * Show validation messages below the input after the query is submitted
   * @default true
   */
  "showValidationMessage"?: boolean
  /** Visual rendered at the end of the input, such as a result count */
  "trailingVisual"?: ReactNode
  "id"?: string
  "className"?: string
  "inputRef"?: Ref<HTMLInputElement>
  "onKeyDown"?: (event: KeyboardEvent<HTMLInputElement>) => void
  "aria-describedby"?: string
  "ref"?: Ref<FilterRef>
}

type SuggestionItem = {
  id: string
  label: string
  hint?: string
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  leadingVisual?: ReactNode
  insertValue: string
  caret: number
}

type CaretContext =
  | { kind: "qualifier"; start: number; end: number; negated: boolean; query: string }
  | {
      kind: "value"
      start: number
      end: number
      provider: FilterProvider
      keyText: string
      chosen: string[]
      query: string
    }

const KEY_PREFIX = /^-?[A-Za-z]?[\w.-]*$/

const getCaretContext = (
  value: string,
  caret: number,
  providers: FilterProvider[],
): CaretContext | null => {
  const token = tokenize(value).find((t) => t.start <= caret && caret <= t.end) ?? {
    raw: "",
    start: caret,
    end: caret,
  }
  const prefix = token.raw.slice(0, caret - token.start)
  const colon = prefix.indexOf(":")
  if (colon === -1) {
    if (!KEY_PREFIX.test(prefix)) return null
    const negated = prefix.startsWith("-")
    return {
      kind: "qualifier",
      start: token.start,
      end: token.end,
      negated,
      query: (negated ? prefix.slice(1) : prefix).toLowerCase(),
    }
  }
  const keyText = prefix.slice(0, colon)
  const provider = findProvider(providers, keyText.replace(/^-/, ""))
  if (!provider) return null
  const parts = splitValues(prefix.slice(colon + 1))
  const query = provider.allowsMultiple ? (parts.at(-1) ?? "") : parts.join(",")
  return {
    kind: "value",
    start: token.start,
    end: token.end,
    provider,
    keyText,
    chosen: provider.allowsMultiple ? parts.slice(0, -1).filter(Boolean) : [],
    query,
  }
}

const matches = (option: FilterSuggestion, query: string) => {
  const lower = query.toLowerCase()
  return option.value.toLowerCase().includes(lower) || !!option.label?.toLowerCase().includes(lower)
}

const FilterRoot = (props: FilterProps) => {
  const {
    label,
    visuallyHideLabel = false,
    providers,
    variant = "full",
    filterButtonVariant = "normal",
    filterValue,
    initialFilterValue = "",
    onChange,
    onParse,
    onSubmit,
    onValidation,
    customParser,
    context,
    placeholder,
    showClearButton = true,
    showValidationMessage = true,
    trailingVisual,
    id,
    className,
    "inputRef": inputRefProp,
    onKeyDown,
    "aria-describedby": ariaDescribedBy,
    ref,
  } = props

  const generatedId = useId()
  const inputId = id ?? `filter-${generatedId}`
  const validationId = `${inputId}-validation`
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const pendingCaretRef = useRef<number | null>(null)
  const highlightedRef = useRef<SuggestionItem | undefined>(undefined)

  const [internalValue, setInternalValue] = useState(initialFilterValue)
  const value = filterValue ?? internalValue
  const [caret, setCaret] = useState(value.length)
  const [openRequested, setOpenRequested] = useState(false)
  const [showErrors, setShowErrors] = useState(value !== "")
  const [dialogOpen, setDialogOpen] = useState(false)

  const parse = customParser ?? parseFilterQuery
  const query = useMemo(() => parse(value, providers), [parse, value, providers])

  const latest = useRef({ onValidation, providers, context, query })
  latest.current = { onValidation, providers, context, query }

  const messagesKey = query.validationMessages.join("\n")
  useEffect(() => {
    const { onValidation: notify, query: current } = latest.current
    notify?.(current.validationMessages, current)
  }, [messagesKey])

  const changeValue = (next: string) => {
    if (filterValue === undefined) setInternalValue(next)
    onChange?.(next)
    onParse?.(parse(next, providers))
  }

  const submit = (eventType: FilterSubmitEvent, next = value) => {
    setShowErrors(next !== "")
    onSubmit?.(parse(next, providers), eventType)
  }

  useImperativeHandle(ref, () => ({
    setValue: (next) => {
      changeValue(next)
      setCaret(next.length)
    },
    focus: () => inputRef.current?.focus(),
  }))

  const caretContext = useMemo(
    () => getCaretContext(value, caret, providers),
    [value, caret, providers],
  )

  const asyncProvider =
    caretContext?.kind === "value" &&
    !caretContext.provider.options &&
    caretContext.provider.getSuggestions
      ? caretContext.provider
      : undefined
  const asyncKey = asyncProvider
    ? `${asyncProvider.key}\u0000${caretContext?.kind === "value" ? caretContext.query : ""}`
    : null
  const [asyncResult, setAsyncResult] = useState<{
    key: string
    items: FilterSuggestion[]
  } | null>(null)

  useEffect(() => {
    if (!asyncKey) return
    const [key, search] = asyncKey.split("\u0000")
    const getSuggestions = findProvider(latest.current.providers, key)?.getSuggestions
    if (!getSuggestions) return
    let cancelled = false
    Promise.resolve(getSuggestions(search, latest.current.context)).then(
      (items) => !cancelled && setAsyncResult({ key: asyncKey, items }),
      () => !cancelled && setAsyncResult({ key: asyncKey, items: [] }),
    )
    return () => {
      cancelled = true
    }
  }, [asyncKey])

  const loading = asyncKey !== null && asyncResult?.key !== asyncKey

  const items = useMemo<SuggestionItem[]>(() => {
    if (!caretContext) return []
    const before = value.slice(0, caretContext.start)
    const after = value.slice(caretContext.end)
    if (caretContext.kind === "qualifier") {
      const { negated, query: search } = caretContext
      return providers
        .filter(
          (provider) =>
            !(negated && provider.negatable === false) &&
            (provider.key.toLowerCase().startsWith(search) ||
              !!provider.displayName?.toLowerCase().includes(search)),
        )
        .map((provider) => {
          const insert = `${negated ? "-" : ""}${provider.key}:`
          return {
            id: `qualifier-${provider.key}`,
            label: provider.displayName ?? provider.key,
            hint: `${provider.key}:`,
            icon: provider.icon,
            insertValue: before + insert + after,
            caret: before.length + insert.length,
          }
        })
    }
    const { provider, keyText, chosen, query: search } = caretContext
    const chosenLower = chosen.map((v) => v.toLowerCase())
    const options = provider.options
      ? provider.options.filter((option) => matches(option, search))
      : asyncResult?.key === asyncKey
        ? (asyncResult?.items ?? [])
        : []
    return options
      .filter((option) => !chosenLower.includes(option.value.toLowerCase()))
      .map((option) => {
        const insert = `${keyText}:${[...chosen, option.value].map(quoteValue).join(",")}`
        const rest = /^\s/.test(after) ? after : ` ${after}`
        return {
          id: `value-${provider.key}-${option.value}`,
          label: option.label ?? option.value,
          hint: option.description,
          leadingVisual: option.leadingVisual,
          insertValue: before + insert + rest,
          caret: before.length + insert.length + 1,
        }
      })
  }, [caretContext, value, providers, asyncResult, asyncKey])

  const isOpen = openRequested && (items.length > 0 || loading)

  const syncScroll = () => {
    if (highlightRef.current && inputRef.current) {
      highlightRef.current.scrollLeft = inputRef.current.scrollLeft
    }
  }

  useLayoutEffect(() => {
    const input = inputRef.current
    if (input && pendingCaretRef.current !== null) {
      input.setSelectionRange(pendingCaretRef.current, pendingCaretRef.current)
      pendingCaretRef.current = null
    }
    syncScroll()
  })

  const handleValueChange = (next: string, details: Autocomplete.Root.ChangeEventDetails) => {
    if (details.reason === "escape-key") return
    if (details.reason === "item-press") {
      const item = items.find((candidate) => candidate.insertValue === next)
      const nextCaret = item?.caret ?? next.length
      pendingCaretRef.current = nextCaret
      setCaret(nextCaret)
    } else {
      setCaret(inputRef.current?.selectionStart ?? next.length)
      setShowErrors(false)
    }
    changeValue(next)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key === "Enter" && !(isOpen && highlightedRef.current)) {
      event.preventDefault()
      setOpenRequested(false)
      submit("enter")
    }
  }

  const clear = () => {
    changeValue("")
    setCaret(0)
    submit("clear", "")
    inputRef.current?.focus()
  }

  const messages = showErrors && showValidationMessage ? query.validationMessages : []
  const qualifierCount = query.qualifiers.length

  const highlight: ReactNode[] = []
  let position = 0
  for (const block of query.blocks) {
    if (block.start > position) highlight.push(value.slice(position, block.start))
    if (block.type === "qualifier" && (block.provider || (showErrors && block.invalid))) {
      const keyLength = block.raw.indexOf(":") + 1
      highlight.push(
        <span
          key={block.start}
          className={s.Qualifier}
          data-invalid={showErrors && block.invalid ? "" : undefined}
        >
          <span className={s.QualifierKey}>{block.raw.slice(0, keyLength)}</span>
          <span className={s.QualifierValue}>{block.raw.slice(keyLength)}</span>
        </span>,
      )
    } else {
      highlight.push(block.raw)
    }
    position = Math.max(position, block.end)
  }
  highlight.push(value.slice(position))

  const filterButton = (
    <Button
      ref={filterButtonRef}
      className={s.FilterButton}
      color="secondary"
      variant="outline"
      uniform={filterButtonVariant === "compact"}
      aria-label={filterButtonVariant === "compact" ? "Advanced filter" : undefined}
      aria-haspopup="dialog"
      onClick={() => setDialogOpen(true)}
    >
      <FilterIcon />
      {filterButtonVariant === "normal" && "Filter"}
      {variant === "button" && qualifierCount > 0 && <Counter>{qualifierCount}</Counter>}
    </Button>
  )

  return (
    <div className={clsx(s.Filter, className)} data-variant={variant}>
      {variant !== "button" && (
        <label htmlFor={inputId} className={clsx(s.Label, visuallyHideLabel && "sr-only")}>
          {label}
        </label>
      )}
      <div className={s.Controls}>
        {variant !== "input" && filterButton}
        {variant !== "button" && (
          <Autocomplete.Root<SuggestionItem>
            items={items}
            filter={null}
            itemToStringValue={(item) => item.insertValue}
            value={value}
            onValueChange={handleValueChange}
            open={isOpen}
            onOpenChange={(open, details) => {
              if (!open && details.reason === "item-press") return
              setOpenRequested(open)
            }}
            onItemHighlighted={(item) => {
              highlightedRef.current = item
            }}
            openOnInputClick
          >
            <div
              ref={containerRef}
              className={s.InputContainer}
              data-invalid={messages.length > 0 ? "" : undefined}
            >
              <Search className={s.LeadingIcon} aria-hidden="true" />
              <div className={s.Field}>
                <div ref={highlightRef} className={s.Highlight} aria-hidden="true">
                  <span>{highlight}</span>
                </div>
                <Autocomplete.Input
                  id={inputId}
                  ref={mergeRefs([inputRef, inputRefProp])}
                  className={s.Input}
                  aria-label={label}
                  placeholder={placeholder}
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={messages.length > 0 || undefined}
                  aria-describedby={
                    clsx(messages.length > 0 && validationId, ariaDescribedBy) || undefined
                  }
                  onKeyDown={handleKeyDown}
                  onSelect={(event) => {
                    setCaret(event.currentTarget.selectionStart ?? 0)
                    syncScroll()
                  }}
                  onScroll={syncScroll}
                />
              </div>
              {trailingVisual && <span className={s.TrailingVisual}>{trailingVisual}</span>}
              {showClearButton && value !== "" && (
                <Button
                  className={s.ClearButton}
                  color="secondary"
                  variant="ghost"
                  size="2xs"
                  uniform
                  aria-label="Clear filter"
                  onClick={clear}
                >
                  <X />
                </Button>
              )}
            </div>
            <Autocomplete.Portal>
              <Autocomplete.Positioner
                className={s.Positioner}
                anchor={containerRef}
                align="start"
                sideOffset={4}
              >
                <Autocomplete.Popup className={s.Popup}>
                  <div className={s.PopupHeader} aria-hidden="true">
                    {caretContext?.kind === "value"
                      ? (caretContext.provider.displayName ?? caretContext.provider.key)
                      : "Filters"}
                  </div>
                  {loading ? (
                    <Autocomplete.Status className={s.Loading}>
                      <span className={s.Skeleton} />
                      <span className={s.Skeleton} />
                      <span className={s.Skeleton} />
                      <span className="sr-only">Loading suggestions</span>
                    </Autocomplete.Status>
                  ) : (
                    <Autocomplete.List className={s.List}>
                      {(item: SuggestionItem) => (
                        <Autocomplete.Item key={item.id} value={item} className={s.Item}>
                          {item.icon ? (
                            <item.icon className={s.ItemIcon} aria-hidden="true" />
                          ) : (
                            item.leadingVisual && (
                              <span className={s.ItemVisual}>{item.leadingVisual}</span>
                            )
                          )}
                          <span className={s.ItemLabel}>{item.label}</span>
                          {item.hint && <span className={s.ItemHint}>{item.hint}</span>}
                        </Autocomplete.Item>
                      )}
                    </Autocomplete.List>
                  )}
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>
        )}
      </div>
      {variant !== "button" && (
        <div id={validationId} className={s.Validation} aria-live="polite">
          {messages.length > 0 && (
            <>
              <Warning className={s.ValidationIcon} aria-hidden="true" />
              <ul className={s.ValidationList}>
                {messages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      {dialogOpen && (
        <FilterDialog
          query={query}
          providers={providers}
          returnFocusRef={filterButtonRef}
          onClose={() => setDialogOpen(false)}
          onApply={(next) => {
            setDialogOpen(false)
            changeValue(next)
            setCaret(next.length)
            submit("dialog", next)
          }}
        />
      )}
    </div>
  )
}

export type FilterRevertProps = {
  /** URL that resets the filter, rendered as a link */
  href?: string
  /** Called when clicked, when no `href` is set */
  onClick?: () => void
  /**
   * Text of the control
   * @default Clear current search query and filters
   */
  children?: ReactNode
  className?: string
}

export const FilterRevert = ({
  href,
  onClick,
  children = "Clear current search query and filters",
  className,
}: FilterRevertProps) => {
  const content = (
    <>
      <span className={s.RevertIcon} aria-hidden="true">
        <X />
      </span>
      {children}
    </>
  )
  return href ? (
    <ButtonLink
      className={clsx(s.Revert, className)}
      href={href}
      color="secondary"
      variant="ghost"
      size="sm"
    >
      {content}
    </ButtonLink>
  ) : (
    <Button
      className={clsx(s.Revert, className)}
      color="secondary"
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      {content}
    </Button>
  )
}

const Filter = Object.assign(FilterRoot, { Revert: FilterRevert })

export { Filter }
