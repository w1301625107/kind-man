<script setup lang="ts">
// inspire packages/shell-chrome/src/detector.js
// https://github.com/vuejs/devtools/blob/7012ebd843bf7646307b7f3a3fa9a4e93150a7d0/packages/shell-chrome/src/detector.js

// 安装 devtool 中 electron 可能出错或者过慢，使用以下命令
// ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm install electron

// TODO : 自动注入
import { Field, CellGroup, Button, NoticeBar } from "vant"
import { useScriptTag } from "@vueuse/core"
import { inject, ref, toRefs } from "vue"
import { InjectKeyUseConfigStorage } from "src/use/config"
import { detect } from "./help"

const defalutConfig = {
  ip: "127.0.0.1",
  host: "8098",
}

const useConfigStorage = inject(InjectKeyUseConfigStorage)
const config = useConfigStorage
  ? useConfigStorage<typeof defalutConfig>("vueDevtools", defalutConfig)
  : ref(defalutConfig)

const { host, ip } = toRefs(config.value)

const connect = () => {
  detect()
  setTimeout(() => {
    useScriptTag(`http://${ip.value}:${host.value}`)
  }, 500)
}
</script>

<template>
  <NoticeBar
    color="#1989fa"
    background="#ecf9ff"
    left-icon="info-o"
    :scrollable="false"
    wrapable>
    基于 vue devtools，需要本地安装 vue-devtools 使用。如果需要支持 Vue
    3，需要安装 beta 版本的 devtools，切记！！
    <!-- 如果需要vuex，需要一开始就注入，vuex才会正常。 -->
  </NoticeBar>
  <CellGroup inset>
    <!-- <Field ield name="switch" label="加载时注入,还没有做">
      <template #input>
        <Switch v-model="checked" size="20" />
      </template>
    </Field> -->
    <Field
      v-model="ip"
      center
      maxlength="15"
      clearable
      label="IP"
      placeholder="请输入IP"></Field>
    <Field
      v-model="host"
      type="digit"
      maxlength="5"
      center
      clearable
      label="HOST"
      placeholder="请输入HOST">
      <template #button>
        <Button size="small" type="primary" @click="connect">链接</Button>
      </template>
    </Field>
  </CellGroup>
</template>
