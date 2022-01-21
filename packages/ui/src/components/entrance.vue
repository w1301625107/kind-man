<template>
  <div
    class="logo"
    ref="logo"
    @click="showPopup"
    @touchstart.stop="handleDown"
    @touchend.stop="handleUp"
    @mouseup.stop="handleUp"
    @mousedown.stop="handleDown">
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
import Console from "./console/index.vue"

import { Ref, ref } from "vue"
import { useConfig } from "src/use/config"
import VueDevtool from "./vueDevtool/index.vue"
import Wrine from "./wrine/wrine.vue"

const configs = useConfig()
const { entrance } = configs.value
const tipText = "好心人，bug多多，乐趣多多。"
const logoText = "好心人"
const show = ref(false)
const active = ref(0)
const logo = ref<HTMLElement>() as Ref<HTMLElement>

let diffLeft = 0
let diffTop = 0
let stopClick = false

function showPopup() {
  if (stopClick) return
  show.value = true
}

function handleDown(event: TouchEvent | MouseEvent) {
  if (event instanceof MouseEvent) {
    diffLeft = event.x - logo.value.offsetLeft
    diffTop = event.y - logo.value.offsetTop
    logo.value.addEventListener("mousemove", handleMove)
    logo.value.addEventListener("mouseout", handleUp)
  } else {
    diffLeft = event.touches[0].clientX - logo.value.offsetLeft
    diffTop = event.touches[0].clientY - logo.value.offsetTop
    logo.value.addEventListener("touchmove", handleMove)
  }
}
function handleUp(event: TouchEvent | MouseEvent) {
  if (event instanceof MouseEvent) {
    logo.value.removeEventListener("mousemove", handleMove)
    logo.value.removeEventListener("mouseout", handleUp)
  } else {
    logo.value.removeEventListener("touchmove", handleMove)
  }
  logo.value.style.cursor = "default"
  setTimeout(() => {
    stopClick = false
  }, 1)
}

function handleMove(event: TouchEvent | MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
  let offsetLeft: number = 0
  let offsetTop: number = 0

  if (event instanceof MouseEvent) {
    stopClick = true
    logo.value.style.cursor = "grabbing"
    offsetLeft = event.x
    offsetTop = event.y
  } else {
    offsetLeft = event.touches[0].clientX
    offsetTop = event.touches[0].clientY
  }

  offsetLeft = offsetLeft - diffLeft
  offsetTop = offsetTop - diffTop
  setPosition(offsetLeft, offsetTop)
}
const availHeight = document.documentElement.clientHeight
const availWidth = document.documentElement.clientWidth

function resetPostion(right: number, bottom: number) {
  right = Math.max(0, right)
  right = Math.min(right, availWidth - entrance.width)
  bottom = Math.max(22, bottom)
  bottom = Math.min(bottom, availHeight - entrance.height)
  entrance.right = right
  entrance.bottom = bottom
}
resetPostion(entrance.right, entrance.bottom)

function setPosition(offsetLeft: number, offsetTop: number) {
  offsetLeft = availWidth - offsetLeft - entrance.width
  offsetTop = availHeight - offsetTop - entrance.height
  resetPostion(offsetLeft, offsetTop)
}
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  bottom: calc(v-bind("entrance.bottom") * 1px);
  right: calc(v-bind("entrance.right") * 1px);
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
