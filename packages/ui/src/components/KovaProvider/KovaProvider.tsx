"use client"

import { type ComponentType, type ForwardRefExoticComponent, type ReactNode } from "react"
import { KovaContext } from "./KovaContext.js"

export type KovaProviderProps = {
  children: ReactNode
  /** Renders internal links, like your router's `Link`. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent: ComponentType<any> | ForwardRefExoticComponent<any> | "a"
}

/** Configures Kova UI for the components inside it. Wrap your app in it once. */
export function KovaProvider({ children, linkComponent }: KovaProviderProps) {
  return <KovaContext value={{ linkComponent }}>{children}</KovaContext>
}
