import { effectScope, onScopeDispose } from "vue"
import { rewriteConsole } from "./components/console/overwrite"
import { useConfig } from "./use/config"

function autoInject() {
  const scope = effectScope()

  scope.run(() => {
    console.log("start auto inject!")
    const config = useConfig()
    if (config.value.customConsole.autoInject) {
      rewriteConsole()
    }
    onScopeDispose(() => {
      console.log("init auto inject done!")
    })
  })

  scope.stop()
}

export { autoInject }
