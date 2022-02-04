import { effectScope, onScopeDispose } from "vue"

function autoInject() {
  const scope = effectScope()

  scope.run(() => {
    console.log("start auto inject!")

    onScopeDispose(() => {
      console.log("init auto inject done!")
    })
  })

  scope.stop()
}

export { autoInject }
