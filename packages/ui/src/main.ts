import { createApp } from "vue"
import App from "./App.vue"
import { autoInject } from "./autoInject"

autoInject()

createApp(App).mount("#app")
