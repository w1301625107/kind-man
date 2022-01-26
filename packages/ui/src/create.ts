import { createApp } from "vue"

import Entrance from "src/components/entrance.vue"
import { autoInject } from "./autoInject"
import { KindManPlugin } from "./types"

type VuePlugin = Parameters<ReturnType<typeof createApp>["use"]>

type UnionPlugin = KindManPlugin | VuePlugin

function createKindMan(plugins: Array<UnionPlugin> = []) {
  autoInject()
  const VuePlugins: Array<VuePlugin> = plugins.map((p) => {
    if (Array.isArray(p)) {
      return p
    } else {
      const { label, component, opiton = [] } = p

      return [
        {
          install: function (Vue: any, ...option: any) {
            Vue.config.globalProperties[`$kind_${label}`] = {
              label,
              component,
            }
          },
        },
        ...opiton,
      ]
    }
  })

  const kindMan = document.createElement("div")
  kindMan.id = "kindMan"
  document.body.appendChild(kindMan)

  const kindManApp = createApp(Entrance)
  VuePlugins.forEach((plugin) => {
    kindManApp.use(...plugin)
  })

  console.dir(kindMan)
  kindManApp.mount(kindMan)

  return kindManApp
}

export { createKindMan }
