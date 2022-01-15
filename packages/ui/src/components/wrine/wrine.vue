<script setup lang="ts">
import { useScriptTag } from "@vueuse/core"
import { useConfig } from "src/use/config"
import { Cell, Field, CellGroup, Button, NoticeBar } from "vant"
import { toRef } from "vue"

let { wrine } = useConfig().value

const host = toRef(wrine, "host")
const ip = toRef(wrine, "ip")
const identity = toRef(wrine, "identity")
const connect = () => {
  const ipandhost = `http://${ip.value}:${host.value}`
  if (typeof window === "undefined" || window.WeinreServerURL) {
    return
  }
  window.WeinreServerURL = `${ipandhost}/...whistle-path.5b6af7b9884e1165...///weinre.${host.value}` //端口
  var head =
    document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement
  var script = document.createElement("script")
  script.async = true
  script.charset = "utf8"
  script.src = `${window.WeinreServerURL}/target/target-script-min.js#${identity.value}`
  if (head.firstChild) {
    head.insertBefore(script, head.firstChild)
  } else {
    head.appendChild(script)
  }
}
</script>

<template>
  <NoticeBar color="#1989fa" background="#ecf9ff" left-icon="info-o">
    基于 whistle 中的 wrine，所以需要安装 whistle。参考地址:<a
      href="http://wproxy.org/whistle/webui/weinre.html"
      >http://wproxy.org/whistle/webui/weinre.html</a
    >
  </NoticeBar>
  <CellGroup inset>
    <Field
      v-model="ip"
      center
      maxlength="15"
      clearable
      label="IP"
      placeholder="请输入IP"
    >
    </Field>
    <Field
      v-model="host"
      type="digit"
      maxlength="5"
      center
      clearable
      label="HOST"
      placeholder="请输入HOST"
    >
    </Field>
    <Field
      v-model="identity"
      center
      clearable
      label="Identity"
      placeholder="请输入identity"
    >
      <template #button>
        <Button size="small" type="primary" @click="connect">链接</Button>
      </template>
    </Field>
  </CellGroup>
</template>
