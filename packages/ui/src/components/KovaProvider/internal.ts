"use client"

import { useContext } from "react"
import { KovaContext } from "./KovaContext.js"

export function useLinkComponent() {
  const context = useContext(KovaContext)
  return context?.linkComponent ?? "a"
}
