"use client"

import { useContext } from "react"
import { KovaContext } from "./kova-context.js"

export function useLinkComponent() {
  const context = useContext(KovaContext)
  return context?.linkComponent ?? "a"
}
