<template>
  <div class="logo" ref="logo" @click="showPopup" :style="style">
    {{ logoText }}
  </div>
  <Popup
    v-model:show="show"
    position="bottom"
    safe-area-inset-bottom
    :style="{ height: '70%', width: '100%' }">
    <div class="contain">
      <NoticeBar
        v-if="entrance.showTip"
        mode="closeable"
        left-icon="volume-o"
        :text="tipText"
        @close="entrance.showTip = false" />
      <Tabs v-model:active="active">
        <Tab v-for="c in components" :title="c">
          <component :is="c" />
        </Tab>
      </Tabs>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Tab, Tabs, NoticeBar } from "vant"
import { Ref, ref, watch, getCurrentInstance, provide } from "vue"

import { useConfigStorage, InjectKeyUseConfigStorage } from "src/use/config"
import { useDrag } from "src/util/useDrag"

provide(InjectKeyUseConfigStorage, useConfigStorage)

const tipText = "好心人，bug多多，乐趣多多。"
const logoText = "好心人"
const show = ref(false)
const active = ref(0)
const logo = ref<HTMLElement>() as Ref<HTMLElement>

const defalutConfig = {
  width: 100,
  height: 30,
  right: 30,
  bottom: 30,
  showTip: true,
}

const entrance = useConfigStorage<typeof defalutConfig>(
  "entrance",
  defalutConfig
)

const { stopClick, right, bottom, style } = useDrag(logo, {
  initialValue: entrance,
})

watch([right, bottom], (v) => {
  entrance.value.right = v[0]
  entrance.value.bottom = v[1]
})

function showPopup() {
  if (stopClick.value) return
  show.value = true
}

const internalInstance = getCurrentInstance()

const globalProperties = internalInstance!.appContext.config.globalProperties

const components = globalProperties.$KindManPluginName || []
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  // bottom: calc(v-bind("bottom") * 1px);
  // right: calc(v-bind("right") * 1px);
  height: calc(v-bind("entrance.height") * 1px);
  width: calc(v-bind("entrance.width") * 1px);
  line-height: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #2188ff;
  border-radius: 5px;
  user-select: none;
  box-shadow: 0 0 10px rgb(0 0 0 / 40%);
}
.contain {
  padding-bottom: 40px;
}
</style>
