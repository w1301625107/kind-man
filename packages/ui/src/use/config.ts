import { useLocalStorage } from "@vueuse/core"
import deepmerge from "deepmerge"

const key = "kind-man-config"

let DefaultConfig = {
  entrance: {
    width: 100,
    height: 30,
    right: 30,
    bottom: 30,
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
  customConsole: {
    ip: "127.0.0.1",
    host: "8899",
    identity: "anonymous",
    autoInject: false,
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
