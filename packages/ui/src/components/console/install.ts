import Console from "./index.vue"
const install = {
  install: function (Vue: any) {
    Vue.config.globalProperties.$kind_TestCi = {
      label: "TestCi",
      component: Console,
    }
    Vue.component("TestCi", Console)
  },
}

export default install
