<script setup lang="ts">
import { logList } from "src/utils/rewriteConsole"
import { Button, Icon } from "vant"
import { ref, Ref } from "vue"

const logs: Ref<typeof logList> = ref([])

function showLog() {
  logs.value = logList
}
</script>

<template>
  <p class="log-item" v-for="log in logs" :class="log.type">
    <Icon v-if="log.type == 'warn'" name="info" color="#f4bc2b" />
    <Icon v-if="log.type == 'error'" name="clear" color="#ec132d" />{{
      Object.entries(log.arguments)
        .map((key) => {
          if (["number", "boolean", "string"].includes(typeof key[1])) {
            return key[1]
          }
          return JSON.stringify(key[1])
        })
        .join(" ")
    }}
  </p>
  <Button @click="showLog">showLog</Button>
</template>

<style scoped>
.log-item {
  margin: 0;
  line-height: 30px;
}
.log {
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
