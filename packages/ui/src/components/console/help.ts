import { useConfigStorage } from "src/use/config"
import { ref } from "vue"
import { whistleRemoteLogs } from "./remoteLog"

// TODO : 修改定义
const keys = ["log", "warn", "error", "debug"] as const

type consoleKey = typeof keys[number]

const logList: Array<{
  type: consoleKey
  time: number
  args: any
}> = []

function rewriteConsole() {
  keys.forEach((type) => {
    console[type] = (function (originConsoleFunc) {
      return function (...args) {
        logList.push({
          type,
          time: Date.now(),
          args: args,
        })

        originConsoleFunc.call(console, ...arguments)
      }
    })(console[type])
  })
}

function useConfig(useStorage?: typeof useConfigStorage) {
  const defalutConfig = {
    ip: "127.0.0.1",
    host: "8899",
    identity: "anonymous",
    autoInject: false,
  }

  const u = useStorage
  const config = u
    ? u<typeof defalutConfig>("customConsole", defalutConfig)
    : ref(defalutConfig)

  return { config }
}

function beforeInit(option: { useConfigStorage: typeof useConfigStorage }) {
  const { config } = useConfig(option.useConfigStorage)
  const { autoInject, ip, host, identity } = config.value

  if (autoInject) {
    rewriteConsole()
    whistleRemoteLogs(ip, host, identity)
  }
}

export { logList, consoleKey, rewriteConsole, useConfig, beforeInit }
