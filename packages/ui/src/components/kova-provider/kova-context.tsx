"use client"

import { type ComponentType, createContext, type ForwardRefExoticComponent } from "react"

type KovaContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent: ComponentType<any> | ForwardRefExoticComponent<any> | "a"
}

export const KovaContext = createContext<KovaContextValue | null>(null)
