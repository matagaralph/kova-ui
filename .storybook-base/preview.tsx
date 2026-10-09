// Controls are not working without this - if removing, ensure controls in stories update the component
"use no memo"
import type { Preview } from "@storybook/react-vite"
// Storybook overrides
import { getThemeStore } from "./addon-theme/themeStore.js"
import { CustomDocsContainer, WithKovaContext, WithTheme } from "./components/StorybookApp.js"
import "./overrides.css"

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Overview",
          ["Introduction", "*"],
          "Concepts",
          "Foundations",
          "Components",
          "Transitions",
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      disableSaveFromUI: true,
    },
    layout: "centered",
    docs: {
      container: CustomDocsContainer,

      canvas: {
        sourceState: "shown",
      },

      // https://storybook.js.org/docs/writing-docs/autodocs#configure-the-table-of-contents
      toc: {
        contentsSelector: ".sbdocs-content",
        headingSelector: "h2, h3",
        ignoreSelector: ".sbdocs-subtitle, .sbdocs-preview h2, .sbdocs-preview h3",
        title: "",
        disable: false,
      },

      source: {
        language: "tsx",
      },

      codePanel: true,
    },
  },
  decorators: [WithTheme, WithKovaContext],
  // IMPORTANT: Declare initial `theme` global so that updates propagate correctly
  initialGlobals: {
    theme: getThemeStore(),
  },
}

export default preview
