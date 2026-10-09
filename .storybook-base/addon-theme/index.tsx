// @ts-expect-error -- React import is required here
import React from "react"

import { addons, types } from "@storybook/manager-api"
import { THEMES } from "./themes.js"
import { getThemeStore } from "./themeStore.js"
import { Tool } from "./Tool.js"

export const init = () => {
  // Get initial theme from storage
  const initialTheme = getThemeStore()

  // Apply initial theme
  addons.setConfig({
    theme: {
      ...THEMES[initialTheme],
    },
  })

  // Register the toolbar action
  addons.register("kova-storybook/theme-toggle", (api) => {
    addons.add("kova-storybook/theme-toggle", {
      title: "Theme toggle",
      type: types.TOOL,
      match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
      render: () => <Tool api={api} />,
    })
  })
}
