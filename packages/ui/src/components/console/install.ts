import Console from "./index.vue"
const install = {
  install: function (Vue: any) {
    const label = "TestCi"
    Vue.config.globalProperties.$KindManPluginName.push(label)
    Vue.component(label, Console)
  },
}

export default install
