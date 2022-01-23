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

export { logList, consoleKey, rewriteConsole }
