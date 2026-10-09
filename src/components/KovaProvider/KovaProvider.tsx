"use client"

import { type ComponentType, type ForwardRefExoticComponent, type ReactNode } from "react"
import { KovaContext } from "./KovaContext.js"

/**
 * Shared context for all Kova UI components - wrap your app in this
 * provider to configure Kova UI components.
 *
 * It's pretty thin right now, we only use it to hold onto the component you
 * use for rendering Links, but it could be expanded in the future.
 */
export function KovaProvider({
  children,
  linkComponent,
}: {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent: ComponentType<any> | ForwardRefExoticComponent<any> | "a"
}) {
  return <KovaContext.Provider value={{ linkComponent }}>{children}</KovaContext.Provider>
}
