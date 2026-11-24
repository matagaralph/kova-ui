"use client"

import { Plus, Trash } from "@kova-ui/icons"
import { useState } from "react"
import { Button } from "../button/index.js"
import { Dialog } from "../dialog/index.js"
import { Input } from "../input/index.js"
import { Select } from "../select/index.js"
import s from "./filter.module.css"
import {
  type FilterProvider,
  type FilterQuery,
  quoteValue,
  splitValues,
} from "./parse-filter-query.js"

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
  const items = (
    <Select.Content>
      {options.map((option) => (
        <Select.Item key={option.value} value={option.value} label={option.label}>
          <Select.ItemIndicator />
          <Select.ItemText>{option.label}</Select.ItemText>
        </Select.Item>
      ))}
    </Select.Content>
  )
  const trigger = (
    <Select.Trigger aria-label={props["aria-label"]} block>
      <Select.Value placeholder={placeholder} />
    </Select.Trigger>
  )
  return props.multiple ? (
    <Select
      multiple
      items={options}
      value={props.value}
      disabled={disabled}
      onValueChange={(value) => props.onChange(value ?? [])}
    >
      {trigger}
      {items}
    </Select>
  ) : (
    <Select
      items={options}
      value={props.value}
      disabled={disabled}
      onValueChange={(value) => {
        if (typeof value === "string") props.onChange(value)
      }}
    >
      {trigger}
      {items}
    </Select>
  )
}

const OPERATORS: Option[] = [
  { value: "is", label: "is" },
  { value: "not", label: "is not" },
]

const INPUT_TYPES = { number: "text", date: "date", text: "text", select: "text" } as const

export type FilterDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: FilterQuery
  providers: FilterProvider[]
  onApply: (value: string) => void
}

export function FilterDialog({ open, onOpenChange, ...props }: FilterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Backdrop />
      <Dialog.Content width="large">
        <FilterDialogRows {...props} />
      </Dialog.Content>
    </Dialog>
  )
}

function FilterDialogRows({
  query,
  providers,
  onApply,
}: Omit<FilterDialogProps, "open" | "onOpenChange">) {
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
    <>
      <Dialog.Header>
        <Dialog.Title>Advanced filters</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
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
                        options={toOptions(provider)}
                        value={row.values}
                        onChange={(values) => updateRow(row.id, { values })}
                      />
                    ) : (
                      <FilterSelect
                        aria-label={`Value ${position}`}
                        placeholder="Select a value"
                        options={toOptions(provider)}
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
                      onValueChange={(value) =>
                        updateRow(row.id, {
                          values: provider?.allowsMultiple ? splitValues(value) : [value],
                        })
                      }
                    />
                  )}
                  <Button
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
        <Button className={s.DialogAdd} variant="ghost" size="sm" onClick={addRow}>
          <Plus />
          Add a filter
        </Button>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
        <Button onClick={apply}>Apply</Button>
      </Dialog.Footer>
    </>
  )
}

const toOptions = (provider: FilterProvider): Option[] =>
  (provider.options ?? []).map((option) => ({
    value: option.value,
    label: option.label ?? option.value,
  }))
