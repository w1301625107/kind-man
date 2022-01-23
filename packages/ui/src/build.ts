import { createApp } from "vue"
import App from "src/components/entrance.vue"
import { autoInject } from "./autoInject"

autoInject()

const kindMan = document.createElement("div")
kindMan.id = "kindMan"
document.body.appendChild(kindMan)

createApp(App).mount(kindMan)
