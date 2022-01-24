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
        <Tab title="console">
          <Console />
        </Tab>
        <Tab title="Vue Devtool">
          <VueDevtool />
        </Tab>
        <Tab title="Wrine">
          <Wrine />
        </Tab>
      </Tabs>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Tab, Tabs, NoticeBar } from "vant"

import { Ref, ref, watch } from "vue"
import VueDevtool from "./vueDevtool/index.vue"
import Wrine from "./wrine/wrine.vue"
import Console from "./console/index.vue"

import { useConfig } from "src/use/config"
import { useDrag } from "src/util/useDrag"

const configs = useConfig()
const { entrance } = configs.value
const tipText = "好心人，bug多多，乐趣多多。"
const logoText = "好心人"
const show = ref(false)
const active = ref(0)
const logo = ref<HTMLElement>() as Ref<HTMLElement>

const { stopClick, style, right, bottom } = useDrag(logo, {
  initialValue: {
    right: entrance.right,
    bottom: entrance.bottom,
  },
})
watch(right, (v) => {
  entrance.right = v
})
watch(bottom, (v) => {
  entrance.bottom = v
})

function showPopup() {
  if (stopClick.value) return
  show.value = true
}
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  // bottom: calc(v-bind("bottom") * 1px);
  // right: calc(v-bind("right") * 1px);
  height: 30px;
  width: 100px;
  line-height: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #2188ff;
  border-radius: 5px;
  user-select: none;
}
.contain {
  padding-bottom: 40px;
}
</style>
