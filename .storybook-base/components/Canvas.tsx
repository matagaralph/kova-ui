"use no memo"
import {
  type Canvas as StorybookCanvas,
  DocsContext,
  SourceContext,
  Story,
  useOf,
  useSourceProps,
} from "@storybook/addon-docs/blocks"
import { type ComponentProps, useContext, useState } from "react"
import { SyntaxHighlighter } from "storybook/internal/components"
import { Check, ChevronDown, Copy } from "../../src/components/Icon/index.js"
import { copyToClipboard } from "../../src/lib/copyToClipboard.js"
import s from "./Canvas.module.css"

type CanvasProps = ComponentProps<typeof StorybookCanvas>

/**
 * Story preview with a collapsible source panel underneath, hidden by default.
 * Drop-in replacement for Storybook's `Canvas` block.
 */
export const Canvas = ({
  of,
  meta,
  sourceState,
  layout,
  source,
  story,
  additionalActions,
  className,
}: CanvasProps) => {
  const docsContext = useContext(DocsContext)
  const sourceContext = useContext(SourceContext)

  if (meta) {
    docsContext.referenceMeta(meta, false)
  }

  const resolved = useOf(of || "story", ["story"])
  const parameters = resolved.story.parameters
  const sourceProps = useSourceProps(
    { ...parameters.docs?.source, ...source, of },
    docsContext,
    sourceContext,
  )

  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const hasSource = sourceState !== "none" && Boolean(sourceProps.code)
  const storyLayout = layout ?? parameters.layout ?? "padded"

  const handleCopy = async () => {
    if (!sourceProps.code) return
    if (await copyToClipboard(sourceProps.code)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className={`${s.Canvas} sb-unstyled ${className ?? ""}`}>
      <div className={s.Preview} data-layout={storyLayout}>
        <Story of={of} {...story} />
      </div>

      {(hasSource || (additionalActions && additionalActions.length > 0)) && (
        <div className={s.Toolbar}>
          {hasSource && (
            <button
              type="button"
              className={s.Toggle}
              aria-expanded={showCode}
              onClick={() => setShowCode((value) => !value)}
            >
              <ChevronDown className={s.ToggleIcon} data-open={showCode || undefined} />
              {showCode ? "Hide code" : "Show code"}
            </button>
          )}
          <div className={s.Actions}>
            {additionalActions?.map(({ title, onClick }) => (
              <button key={String(title)} type="button" className={s.Action} onClick={onClick}>
                {title}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasSource && showCode && (
        <div className={s.Code}>
          <SyntaxHighlighter
            language={sourceProps.language ?? "jsx"}
            format={sourceProps.format ?? "dedent"}
            showLineNumbers
            copyable={false}
            bordered={false}
          >
            {sourceProps.code}
          </SyntaxHighlighter>
          <button
            type="button"
            className={s.Copy}
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
            onClick={handleCopy}
          >
            {copied ? <Check /> : <Copy />}
          </button>
        </div>
      )}
    </div>
  )
}
