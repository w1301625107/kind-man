import { useLocalStorage } from "@vueuse/core"
import deepmerge from "deepmerge"

const key = "kind-man-config"

let DefaultConfig = {
  entrance: {
    width: 100,
    height: 30,
    top: 250,
    left: 250,
    showTip: true,
  },
  vueDevtool: {
    ip: "127.0.0.1",
    host: "8098",
  },
  wrine: {
    ip: "127.0.0.1",
    host: "8899",
    identity: "anonymous",
  },
}

type Config = typeof DefaultConfig

function useConfig() {
  const configs = useLocalStorage<Config>(key, DefaultConfig)
  // merge old version config and new version config
  configs.value = deepmerge(DefaultConfig, configs.value)

  return configs
}

export { useConfig }
