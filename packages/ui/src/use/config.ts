import { useLocalStorage } from "@vueuse/core"
import { type } from "os"

const key = "kind-man-config"

let DefaultConfig = {
  entrance: {
    width: 100,
    height: 30,
    top: 250,
    left: 250,
    showTip: true,
  },
}

type Config = typeof DefaultConfig

function useConfig() {
  const configs = useLocalStorage<Config>(key, DefaultConfig)

  return configs
}

export { useConfig }
