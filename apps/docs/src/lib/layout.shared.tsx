import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

import { Logo } from "../components/logo.js"
import { githubUrl, withBase } from "./shared.js"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: "/",
    },
    githubUrl,
    themeSwitch: { mode: "light-dark-system" },
    links: [
      {
        text: "llms.txt",
        url: withBase("/llms.txt"),
        external: true,
        on: "menu",
      },
    ],
  }
}
