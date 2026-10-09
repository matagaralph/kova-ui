import { addons } from "storybook/manager-api"
import { init as initThemeAddon } from "./addon-theme/index.js"

import "./addon-back-to-docs/index.js"
import "./addon-title/index.js"
import "./addon-toggle-addons/index.js"

addons.setConfig({
  layout: {
    navSize: 230,
  },
  toolbar: {
    copy: { hidden: true },
    eject: { hidden: true },
    fullscreen: { hidden: true },
    createStory: { hidden: true },
  },
  sidebar: {
    filters: {
      patterns: (item) => item.type === "docs",
    },
    showRoots: true,
    collapsedRoots: [],
  },
  docs: {
    isCodeExpanded: true,
    source: {
      state: "shown",
    },
  },
})

// Manually initialize local addons
initThemeAddon()

addons.register("view-mode", (api) => {
  const channel = addons.getChannel()

  const setAttr = (mode: "story" | "docs") =>
    document.documentElement.setAttribute("data-view-mode", mode)

  setAttr(api.getUrlState().viewMode === "docs" ? "docs" : "story")

  channel.on("docsRendered", () => setAttr("docs"))
  channel.on("storyRendered", () => {
    const { viewMode } = api.getUrlState() // 'story' | 'docs' | custom tabs
    setAttr(viewMode === "docs" ? "docs" : "story")
  })
})
