import { useLocalStorage } from "@vueuse/core"
import deepmerge from "deepmerge"
import { ref, InjectionKey } from "vue"

const key = "kind-man-config"

const DefaultConfig = {}

type Config = typeof DefaultConfig & Record<string, any>

function useConfigStorage<T extends object>(customKey: string, defalut?: T) {
  const configs = useLocalStorage<Config>(key, DefaultConfig)
  if (!configs.value[customKey]) {
    configs.value[customKey] = defalut || {}
  }
  let cc = configs.value[customKey]
  if (defalut) {
    // merge old version config and new version config
    cc = deepmerge(defalut, cc)
  }

  return ref(configs.value[customKey] as T)
}

const InjectKeyUseConfigStorage: InjectionKey<typeof useConfigStorage> =
  Symbol.for("useConfigStorage")

export { useConfigStorage, InjectKeyUseConfigStorage }
