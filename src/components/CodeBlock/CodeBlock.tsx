"use client"

import clsx from "clsx"
import { type ComponentProps } from "react"
import { createElement, PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash.js"
import c from "react-syntax-highlighter/dist/esm/languages/prism/c.js"
import clike from "react-syntax-highlighter/dist/esm/languages/prism/clike.js"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css.js"
import diff from "react-syntax-highlighter/dist/esm/languages/prism/diff.js"
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker.js"
import go from "react-syntax-highlighter/dist/esm/languages/prism/go.js"
import java from "react-syntax-highlighter/dist/esm/languages/prism/java.js"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript.js"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json.js"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx.js"
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin.js"
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown.js"
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup.js"
import php from "react-syntax-highlighter/dist/esm/languages/prism/php.js"
import python from "react-syntax-highlighter/dist/esm/languages/prism/python.js"
import ruby from "react-syntax-highlighter/dist/esm/languages/prism/ruby.js"
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss.js"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql.js"
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml.js"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx.js"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript.js"
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml.js"

import { CopyButton } from "../Button/index.js"
import s from "./CodeBlock.module.css"

SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("tsx", tsx)
SyntaxHighlighter.registerLanguage("markup", markup)
SyntaxHighlighter.registerLanguage("css", css)
SyntaxHighlighter.registerLanguage("scss", scss)
SyntaxHighlighter.registerLanguage("c", c)
SyntaxHighlighter.registerLanguage("clike", clike)
SyntaxHighlighter.registerLanguage("bash", bash)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("jsonc", json)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("sql", sql)
SyntaxHighlighter.registerLanguage("diff", diff)
SyntaxHighlighter.registerLanguage("markdown", markdown)
SyntaxHighlighter.registerLanguage("yaml", yaml)
SyntaxHighlighter.registerLanguage("toml", toml)
SyntaxHighlighter.registerLanguage("docker", docker)
SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("go", go)
SyntaxHighlighter.registerLanguage("php", php)
SyntaxHighlighter.registerLanguage("ruby", ruby)
SyntaxHighlighter.registerLanguage("kotlin", kotlin)

export function CodeBlock({
  children,
  language,
  className,
}: {
  children: string
  language?: string
  className?: string
}) {
  return (
    <CodeBlockBase className={className}>
      <CodeBlockBase.Code language={language}>{children}</CodeBlockBase.Code>
      <CodeBlockBase.CopyButton copyValue={children} />
    </CodeBlockBase>
  )
}

export function CodeBlockBase({ className, children, ...restProps }: ComponentProps<"div">) {
  return (
    <div className={clsx(s.CodeBlock, className)} {...restProps}>
      {children}
    </div>
  )
}

CodeBlockBase.CopyButton = function CodeBlockCopyButton({
  className,
  copyValue,
  loading,
  disabled,
}: {
  className?: string
  copyValue: string
  disabled?: boolean
  loading?: boolean
}) {
  return (
    <div className={clsx(s.CopyButtonContainer, className)}>
      <CopyButton
        copyValue={copyValue}
        variant="ghost"
        color="secondary"
        pill={false}
        size="md"
        uniform
        loading={loading}
        disabled={disabled}
      />
    </div>
  )
}

CodeBlockBase.Code = function CodeBlockCode({
  className,
  children,
  language,
  codeTagProps,
}: {
  className?: string
  children: string
  language?: string
  codeTagProps?: React.HTMLProps<HTMLElement>
}) {
  return (
    <SyntaxHighlighter
      className={clsx(s.SyntaxHighlighter, className)}
      language={language}
      showLineNumbers={false}
      showInlineLineNumbers={false}
      useInlineStyles={false}
      codeTagProps={codeTagProps}
      renderer={({ rows }) => {
        return (
          <>
            {rows.map((r, i) =>
              createElement({
                key: i,
                stylesheet: {},
                useInlineStyles: true,
                node: r,
              }),
            )}
          </>
        )
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}
