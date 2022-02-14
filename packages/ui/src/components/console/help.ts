import { useConfigStorage } from "src/use/config"
import { ref } from "vue"
import { whistleRemoteLogs } from "./remoteLog"
import VConsole from "vconsole"

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
    vConsole: false,
  }

  const u = useStorage
  const config = u
    ? u<typeof defalutConfig>("customConsole", defalutConfig)
    : ref(defalutConfig)

  return { config }
}

function beforeInit(option: { useConfigStorage: typeof useConfigStorage }) {
  const { config } = useConfig(option.useConfigStorage)
  const { autoInject, ip, host, identity, vConsole } = config.value

  if (autoInject) {
    rewriteConsole()
    whistleRemoteLogs(ip, host, identity)
  }
  if (vConsole) {
    addVConsole()
  }
}

function addVConsole() {
  //@ts-ignore
  window.vConsole = new VConsole()
}

function removeVconsole() {
  //@ts-ignore
  window.vConsole.destroy()
}

export {
  logList,
  consoleKey,
  rewriteConsole,
  useConfig,
  beforeInit,
  addVConsole,
  removeVconsole,
}
