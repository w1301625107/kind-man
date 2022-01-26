import { createApp } from "vue"
import App from "./App.vue"

import Ci from "src/components/console/install"
import { create } from "./build"

createApp(App).mount("#app")

create([[Ci]])
