# Contribution guide for Kova UI

Kova UI is the design system for Amashona, giving every Amashona product a consistent look and feel. Kova UI provides styling foundations, CSS variable design tokens, and a library of well-crafted, accessible components.

- **Design tokens** – defined across colors, typography, spacing, sizing, shadows, surfaces, and more.
- **Tailwind 4** – fully integrated and pre-configured with Kova UI's design tokens.
- **Component library** – high-quality components built on top of Base UI for consistent accessibility patterns.
- **Utilities** – helpful tools for handling core concepts like dark mode, responsiveness, and more across React and CSS.

Keep this goal and context in mind as you contribute code to the repository. This code is the foundation for many other projects, and changes should be robust, well-considered, and workable for many different contexts.

## Repository overview

You should make changes only in the `src/` folder:

- `components/` - React component implementations (e.g., Button, Chat, Tooltip)
- `hooks/` - Reusable React hooks (e.g., useAutoGrowTextarea, useBreakpoints)
- `lib/` - Utility functions (theme helpers, attachment helpers, etc.)
- `styles/` - Global CSS config, Tailwind setup, and design token definitions
- `**/*.stories.tsx` - Storybook stories definition for a given component
- `**/*.mdx` - Storybook documentation, often referring to sibling `.stories.tsx` file
- `types.ts` - Shared TypeScript types
- `vite-env.d.ts` - Vite type declarations

When adding new functionality or docs, place files in the appropriate `src/*` location.

# Components

## File Naming Conventions

- Component: `ComponentName.tsx`
- Styles: `ComponentName.module.css`
- Tests: `ComponentName.test.tsx`
- Storybook:
  - `ComponentName.stories.tsx`
  - `ComponentName.mdx`

## Component library

New components must be built on Base UI (`@base-ui/react`) and styled with Kova UI design tokens. Some existing components still use Radix (`radix-ui`) and are being migrated to Base UI, so do not add new Radix usage.

Below is a quick reference of all provided components:

| Component              | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| **Alert**              | Call attention to a specific message or warning.                      |
| **Animate**            | Animate components as they mount and unmount.                         |
| **AnimateLayout**      | Animate width & height of components as they mount and unmount.       |
| **AnimateLayoutGroup** | Animate width & height of lists of components as they enter and exit. |
| **Avatar**             | Display user identities with either text, photo, or an icon.          |
| **AvatarGroup**        | Display avatars as a single stack.                                    |
| **Badge**              | Emphasize details with a status indicator.                            |
| **Button**             | Create actions in many different styles.                              |
| **ButtonLink**         | `<Button>` but as a semantic anchor element.                          |
| **Checkbox**           | Toggle control for on and off states.                                 |
| **CodeBlock**          | Display syntax‑highlighted code snippets.                             |
| **CopyTooltip**        | Allow users to easily copy to clipboard.                              |
| **DataTable**          | Tabular data with sorting, grouping, and pagination.                  |
| **Dialog**             | Capture focus for essential tasks or details (Base UI).               |
| **EmptyMessage**       | Gracefully inform users when there's nothing to see.                  |
| **FormControl**        | Label, describe, and validate a form input (Base UI).                 |
| **Icon**               | Collection of SVG icons exported as React components.                 |
| **Image**              | Load remote images with optional aspect ratio and cover mode.         |
| **Indicator**          | Loading dots and circular progress indicators.                        |
| **Input**              | Semantic input text collection.                                       |
| **LayerCard**          | Layered card for navigation and feature highlights (Base UI).         |
| **Markdown**           | Render rich formatted content.                                        |
| **Menu**               | Structured actions in a dropdown list.                                |
| **KovaProvider**       | React provider for shared context (e.g., link component).             |
| **Popover**            | Generic floating UI utility for contextual actions.                   |
| **RadioGroup**         | Radio button group selection component.                               |
| **SegmentedControl**   | Toggle through grouped options.                                       |
| **Select**             | Choose from a dropdown of options.                                    |
| **SelectControl**      | Alternative select control component with enhanced features.          |
| **Slider**             | Fine-tune values within a set range.                                  |
| **Switch**             | Toggle control for on and off states.                                 |
| **TabNav**             | Linked tabs for navigating between related views (Base UI).           |
| **Tabs**               | Break related content into tabbed panels (Base UI).                   |
| **TagInput**           | Enter multiple unique tags.                                           |
| **TextLink**           | Semantic link used for both internal and external links.              |
| **Textarea**           | Autosizable text input area with optional validation.                 |
| **Tooltip**            | Brief and informative hover text.                                     |
| **TransitionGroup**    | Primitive for rendering components over time.                         |

## Documentation & Storybook

All components should be thoroughly documented in Storybook, using the `.mdx` and `.stories` sidecar files.

- You should not need to run Storybook locally, so ignore the `bun run storybook` command
- Update or create `.mdx` and `.stories.tsx` files when adding new components or features.
- Keep usage examples simple and focused. Refer to documentation examples like `Avatar`, `Badge`, and `Button` for guidance.

# Contributing

When working on features or documentation, avoid making unrelated changes to the current task. Do not add comments for obvious behaviors, and do not change build settings.

The package is ESM-only. Relative imports must include the `.js` extension (e.g. `./Button.js`, `../Button/index.js`), even when importing `.ts`/`.tsx` files; `bun run types` enforces this.

## Setup instructions

- Use Bun (version pinned via `packageManager` in `package.json`)
- Install dependencies with `bun install`

## Required commands before commit

1. `bun run format:fix` - Auto-fixes any formatting issues with Oxfmt
2. `bun run lint` - Runs Oxlint (TS) and Stylelint (CSS)
3. `bun run types` - Runs TypeScript type checking
4. `bun run test` - Executes unit tests via Vitest

Tooling runs through Vite+ (`vp`), and its test, lint, and format settings live in `vite.config.ts`. Run tests with `bun run test`, not `bun test`: `bun test` starts Bun's own test runner, which ignores `vite.config.ts`. Test files import from `vite-plus/test`.

Ignore all other script commands, as they will be irrelevant to your work.
