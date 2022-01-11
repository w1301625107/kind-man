// @ts-nocheck
// TODO : 修改定义
const keys = ["log", "warn", "error"]

type consoleKey = keyof typeof console

const logList: Array<{
  type: consoleKey
  time: number
  arguments: any
}> = []

keys.forEach((type) => {
  console[type] = (function (originConsoleFunc) {
    return function () {
      logList.push({
        type,
        time: Date.now(),
        arguments: arguments,
      })
      originConsoleFunc.call(console, ...arguments)
    }
  })(console[type])
})

export { logList }
