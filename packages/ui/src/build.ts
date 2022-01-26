import VueDevtool from "src/components/vueDevtool/index.vue"
import Wrine from "src/components/wrine/wrine.vue"
import Console from "src/components/console/index.vue"
import { createKindMan } from "./create"

type plugins = Exclude<Parameters<typeof createKindMan>["0"], undefined>
const base: plugins = [
  {
    label: "Console",
    component: Console,
  },
  {
    label: "Wrine",
    component: Wrine,
  },
  {
    label: "VueDevtool",
    component: VueDevtool,
  },
]

function create(plugins: plugins = []) {
  const all = [...base, ...plugins]
  return createKindMan(all)
}

export { create }
