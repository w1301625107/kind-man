import type { Component } from "vue"
import { useConfigStorage } from "./use/config"

type KindManPlugin = {
  component: Component
  label: string
  opiton?: any[]
  beforeInit?: (option: { useConfigStorage: typeof useConfigStorage }) => void
}
