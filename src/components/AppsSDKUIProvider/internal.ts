"use client"

import { useContext } from "react"
import { AppsSDKUIContext } from "./AppsSDKUIContext.js"

export function useLinkComponent() {
  const context = useContext(AppsSDKUIContext)
  return context?.linkComponent ?? "a"
}
