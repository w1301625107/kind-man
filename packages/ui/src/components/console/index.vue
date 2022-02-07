<script setup lang="ts">
import {
  consoleKey,
  logList,
  rewriteConsole,
  useConfig,
} from "src/components/console/help"
import { InjectKeyUseConfigStorage } from "src/use/config"
import { Button, Icon, CellGroup, NoticeBar, Field, Switch } from "vant"
import { inject, ref, Ref, toRefs } from "vue"
import { whistleRemoteLogs } from "./remoteLog"

const { config } = useConfig(inject(InjectKeyUseConfigStorage))

const listedLogs: Ref<typeof logList> = ref([])

const { autoInject, host, ip, identity } = toRefs(config.value)
const isDebug = import.meta.env.DEV

const connect = () => {
  whistleRemoteLogs(ip.value, host.value)
}

function showLog() {
  listedLogs.value.push(...logList)
  logList.length = 0
}

function addLog(type: consoleKey = "log") {
  console[type]("🎆 add test log message", Math.random())
}

function clearlog() {
  listedLogs.value.length = 0
}
</script>

<template>
  <NoticeBar
    color="#1989fa"
    background="#ecf9ff"
    left-icon="info-o"
    :scrollable="false"
    wrapable>
    基于 whistle 中的 logjs，所以需要安装 whistle。
  </NoticeBar>
  <CellGroup inset>
    <Field ield name="switch" label="加载时注入">
      <template #input>
        <Switch v-model="autoInject" size="20" />
      </template>
    </Field>
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
    </Field>
    <Field
      v-model="identity"
      center
      clearable
      label="Identity"
      placeholder="请输入identity">
      <template #button>
        <Button size="small" type="primary" @click="connect">链接</Button>
      </template>
    </Field>
  </CellGroup>
  <p class="log-item" v-for="log in listedLogs" :class="log.type">
    <Icon v-if="log.type == 'warn'" name="info" color="#f4bc2b" />
    <Icon v-if="log.type == 'error'" name="clear" color="#ec132d" />
    {{
      log.args
        .map((key:any) => {
          if (["number", "boolean", "string"].includes(typeof key)) {
            return key
          }
          return JSON.stringify(key)
        })
        .join(" ")
    }}
  </p>
  <Button @click="showLog">showLog</Button>
  <Button @click="rewriteConsole">rewriteConsole</Button>
  <Button @click="clearlog">clearlog</Button>
  <template v-if="isDebug">
    <Button @click="addLog">addLog</Button>
    <Button @click="addLog('warn')">addWarnLog</Button>
    <Button @click="addLog('error')">addErrorLog</Button>
    <Button @click="addLog('debug')">addDebugLog</Button>
  </template>
</template>

<style scoped>
.log-item {
  margin: 0;
  line-height: 30px;
}
.log,
.debugs {
  border-bottom: 1px solid #f0f0f0;
}
.warn {
  border-top: 1px solid #fff4c5;
  border-bottom: 1px solid #fff4c5;
  background-color: #fffbe6;
}
.error {
  border-top: 1px solid #fed6d7;
  border-bottom: 1px solid #fed6d7;
  background-color: #fff0f0;
}
</style>
