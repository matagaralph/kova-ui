"use client"

import { Select } from "@base-ui/react/select"
import { Check, ChevronDown, Plus, Trash } from "@kova-ui/icons"
import { type RefObject, useState } from "react"
import { Button } from "../Button/index.js"
import { Dialog } from "../Dialog/index.js"
import { Input } from "../Input/index.js"
import s from "./Filter.module.css"
import {
  type FilterProvider,
  type FilterQuery,
  quoteValue,
  splitValues,
} from "./parseFilterQuery.js"

type Row = { id: number; key: string; negated: boolean; values: string[] }

type Option = { value: string; label: string }

type FilterSelectProps = {
  "aria-label": string
  "options": Option[]
  "placeholder"?: string
  "disabled"?: boolean
} & (
  | { multiple?: false; value: string | null; onChange: (value: string) => void }
  | { multiple: true; value: string[]; onChange: (value: string[]) => void }
)

const FilterSelect = (props: FilterSelectProps) => {
  const { options, placeholder, disabled } = props
  const labelFor = (value: string) => options.find((o) => o.value === value)?.label ?? value
  return (
    <Select.Root
      items={options}
      value={props.value}
      multiple={props.multiple}
      disabled={disabled}
      onValueChange={(value) => {
        if (props.multiple) props.onChange((value as string[] | null) ?? [])
        else if (typeof value === "string") props.onChange(value)
      }}
    >
      <Select.Trigger className={s.SelectTrigger} aria-label={props["aria-label"]}>
        <Select.Value className={s.SelectValue} placeholder={placeholder}>
          {props.multiple
            ? (value: string[]) => (value.length > 0 ? value.map(labelFor).join(", ") : placeholder)
            : undefined}
        </Select.Value>
        <Select.Icon className={s.SelectIcon}>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={s.Positioner} sideOffset={4} alignItemWithTrigger={false}>
          <Select.Popup className={s.Popup}>
            <Select.List className={s.List}>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} className={s.Item}>
                  <Select.ItemIndicator className={s.ItemIndicator} keepMounted>
                    <Check />
                  </Select.ItemIndicator>
                  <Select.ItemText className={s.ItemLabel}>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

const OPERATORS: Option[] = [
  { value: "is", label: "is" },
  { value: "not", label: "is not" },
]

const INPUT_TYPES = { number: "text", date: "date", text: "text", select: "text" } as const

export type FilterDialogProps = {
  query: FilterQuery
  providers: FilterProvider[]
  returnFocusRef: RefObject<HTMLElement | null>
  onClose: () => void
  onApply: (value: string) => void
}

export const FilterDialog = ({
  query,
  providers,
  returnFocusRef,
  onClose,
  onApply,
}: FilterDialogProps) => {
  const [rows, setRows] = useState<Row[]>(() =>
    query.qualifiers
      .filter((block) => block.provider)
      .map((block, index) => ({
        id: index,
        key: block.provider!.key,
        negated: block.negated,
        values: block.values.filter(Boolean),
      })),
  )
  const [nextId, setNextId] = useState(rows.length)

  const updateRow = (id: number, patch: Partial<Row>) =>
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)))

  const addRow = () => {
    setRows((current) => [...current, { id: nextId, key: "", negated: false, values: [] }])
    setNextId(nextId + 1)
  }

  const apply = () => {
    const preserved = query.blocks
      .filter((block) => block.type === "text" || !block.provider)
      .map((block) => block.raw)
    const qualifiers = rows.flatMap((row) => {
      const values = row.values.map((value) => value.trim()).filter(Boolean)
      if (!row.key || values.length === 0) return []
      return `${row.negated ? "-" : ""}${row.key}:${values.map(quoteValue).join(",")}`
    })
    onApply([...qualifiers, ...preserved].join(" "))
  }

  const providerOptions = providers.map((provider) => ({
    value: provider.key,
    label: provider.displayName ?? provider.key,
  }))

  return (
    <Dialog
      title="Advanced filters"
      width="large"
      returnFocusRef={returnFocusRef}
      onClose={onClose}
      footerButtons={[
        { content: "Cancel", onClick: onClose },
        { content: "Apply", buttonType: "primary", onClick: apply },
      ]}
    >
      {rows.length === 0 ? (
        <p className={s.DialogEmpty}>No filters applied. Add one to narrow the results.</p>
      ) : (
        <div className={s.DialogRows} role="list" aria-label="Filters">
          {rows.map((row, index) => {
            const provider = providers.find((candidate) => candidate.key === row.key)
            const position = index + 1
            return (
              <div key={row.id} className={s.DialogRow} role="listitem">
                <FilterSelect
                  aria-label={`Qualifier ${position}`}
                  placeholder="Select a qualifier"
                  options={providerOptions}
                  value={row.key || null}
                  onChange={(key) => updateRow(row.id, { key, negated: false, values: [] })}
                />
                <FilterSelect
                  aria-label={`Operator ${position}`}
                  options={OPERATORS}
                  disabled={!provider || provider.negatable === false}
                  value={row.negated ? "not" : "is"}
                  onChange={(operator) => updateRow(row.id, { negated: operator === "not" })}
                />
                {provider?.options ? (
                  provider.allowsMultiple ? (
                    <FilterSelect
                      multiple
                      aria-label={`Value ${position}`}
                      placeholder="Select values"
                      options={provider.options.map((o) => ({
                        value: o.value,
                        label: o.label ?? o.value,
                      }))}
                      value={row.values}
                      onChange={(values) => updateRow(row.id, { values })}
                    />
                  ) : (
                    <FilterSelect
                      aria-label={`Value ${position}`}
                      placeholder="Select a value"
                      options={provider.options.map((o) => ({
                        value: o.value,
                        label: o.label ?? o.value,
                      }))}
                      value={row.values[0] ?? null}
                      onChange={(value) => updateRow(row.id, { values: [value] })}
                    />
                  )
                ) : (
                  <Input
                    aria-label={`Value ${position}`}
                    placeholder={provider?.allowsMultiple ? "Comma separated values" : "Value"}
                    type={INPUT_TYPES[provider?.type ?? "text"]}
                    disabled={!provider}
                    value={row.values.join(",")}
                    onChange={(event) =>
                      updateRow(row.id, {
                        values: provider?.allowsMultiple
                          ? splitValues(event.target.value)
                          : [event.target.value],
                      })
                    }
                  />
                )}
                <Button
                  color="secondary"
                  variant="ghost"
                  uniform
                  aria-label={`Remove filter ${position}`}
                  onClick={() => setRows((current) => current.filter((r) => r.id !== row.id))}
                >
                  <Trash />
                </Button>
              </div>
            )
          })}
        </div>
      )}
      <Button className={s.DialogAdd} color="secondary" variant="ghost" size="sm" onClick={addRow}>
        <Plus />
        Add a filter
      </Button>
    </Dialog>
  )
}
