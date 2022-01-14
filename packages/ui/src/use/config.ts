import { useLocalStorage } from "@vueuse/core"

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
}

type Config = typeof DefaultConfig

function useConfig() {
  const configs = useLocalStorage<Config>(key, DefaultConfig)
  // merge old version config and new version config
  configs.value = Object.assign(DefaultConfig, configs.value)
  return configs
}

export { useConfig }
