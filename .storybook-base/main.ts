import type { StorybookConfig } from "@storybook/react-vite"
import path from "node:path"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  typescript: {
    reactDocgen: "react-docgen-typescript",
    // The docgen plugin publishes CommonJS-style types for an ESM-only build, so NodeNext types this option as `undefined`.
    reactDocgenTypescriptOptions: {
      savePropValueAsString: true,
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractLiteralValuesFromEnum: true,
    } as never,
  },

  core: {
    disableWhatsNewNotifications: true,
  },

  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "./vite.config.ts",
      },
    },
  },

  staticDirs: ["../public"],

  async viteFinal(finalConfig) {
    process.env.IS_STORYBOOK = "true"

    // Allow imports from `.storybook/components` directory in our MDX files
    finalConfig.resolve = finalConfig.resolve || { alias: {} }
    finalConfig.resolve.alias = {
      ...finalConfig.resolve.alias,
      "@storybookComponents": path.resolve(import.meta.dirname, "./components/"),
    }

    // https://github.com/storybookjs/storybook/issues/25256
    finalConfig.assetsInclude = ["/sb-preview/runtime.js"]

    return finalConfig
  },

  features: {
    actions: false,
    backgrounds: false,
    viewport: false,
    measure: false,
    outline: false,
    highlight: false,
    interactions: false,
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
}
export default config
