<template>
  <div @click="showPopup" class="logo" @touchmove="handleTouchMove">
    {{ logoText }}
  </div>
  <Popup
    v-model:show="show"
    position="bottom"
    :style="{ height: '70%', width: '100%' }"
  >
    <div class="lh_contain">
      <NoticeBar
        v-if="entrance.showTip"
        mode="closeable"
        @close="entrance.showTip = false"
        left-icon="volume-o"
        :text="tipText"
      />
      <Tabs v-model:active="active">
        <Tab title="console">
          <Console></Console>
        </Tab>
      </Tabs>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import {
  Popup,
  Tab,
  Tabs,
  Button,
  Toast,
  NoticeBar,
  Cell,
  Field,
  CellGroup,
  NumberKeyboard,
} from "vant"
import Console from "./console/console.vue"

import { ref } from "vue"
import { useConfig } from "src/use/config"

const configs = useConfig()
const { entrance } = configs.value
const tipText = "好心人，bug多多，乐趣多多。"
const logoText = "好心人"
const show = ref(false)
const showPopup = () => {
  show.value = true
}
const active = ref(2)

const { availHeight, availWidth } = window.screen
function handleTouchMove(event: TouchEvent) {
  let x = event.touches[0].clientX
  let y = event.touches[0].clientY
  if (x + entrance.width > availWidth) {
    x = availWidth - entrance.width
  } else if (x < 0) {
    x = 0
  }
  if (y + entrance.height > availHeight) {
    y = availHeight - entrance.height
  } else if (y < 0) {
    y = 0
  }
  entrance.left = x
  entrance.top = y
}
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  top: calc(v-bind("entrance.top") * 1px);
  left: calc(v-bind("entrance.left") * 1px);
  height: 30px;
  width: 100px;
  line-height: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
  background-color: #2188ff;
  border-radius: 5px;
}
</style>
