import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

import { Logo } from "../components/logo.js"
import { githubUrl } from "./shared.js"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: "/",
    },
    githubUrl,
    themeSwitch: { mode: "light-dark-system" },
  }
}
