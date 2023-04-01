<template>
  <footer class="sticky inset-x-0 bottom-0 overflow-hidden px-4 py-6">
    <div class="flex items-end gap-3">
      <NInput
        ref="输入框的引用"
        v-model:value="用户提问"
        :disabled="缓存的ai回复.状态 !== '空闲'"
        class="flex-1"
        type="textarea"
        :autosize="{
          minRows: 1,
          maxRows: 3
        }"
        placeholder="基本的 Textarea"
      />
      <NButton type="info" :disabled="缓存的ai回复.状态 !== '空闲'" @click="处理发送对话()">
        <Icon icon="ri:send-plane-fill" class="mr-1" />
        <span>发送</span>
      </NButton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { 会话的状态存储 } from "@/状态存储";
// import { 使用_流下载 } from "./使用_流下载";
import { 使用_事件源 } from "./使用_事件源";

const { 缓存的ai回复 } = storeToRefs(会话的状态存储());

const { 用户提问, 处理发送对话 } = 使用_事件源();
// const { 用户提问, 处理发送对话 } = 使用_流下载();
</script>

<style scoped></style>
