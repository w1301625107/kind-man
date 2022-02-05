import { effectScope, onScopeDispose } from "vue"
import { KindManPlugin } from "./types"
import { useConfigStorage } from "./use/config"

function beforeCreate(plugin: KindManPlugin) {
  const scope = effectScope()

  scope.run(() => {
    if (plugin.beforeInit) {
      console.log(`[${plugin.label}]beforeInit start!`)
      plugin.beforeInit({
        useConfigStorage: useConfigStorage,
      })
    }

    onScopeDispose(() => {
      if (plugin.beforeInit) console.log(`[${plugin.label}]beforeInit end!`)
    })
  })

  scope.stop()
}

export { beforeCreate }
