<template>
  <div class="flex h-full w-full flex-col">
    <!-- <MyChatTips /> -->
    <div class="flex-1 overflow-hidden">
      <NScrollbar
        :on-scroll="
          e => {
            处理滚动(e);
          }
        "
      >
        <MyChatList />
      </NScrollbar>
    </div>
    <div>
      <MyChatTextArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NScrollbar } from "naive-ui";
// import MyChatTips from "./对话提示/对话提示.vue";
import MyChatList from "./对话列表/对话列表.vue";
import MyChatTextArea from "./输入框/输入框.vue";
import { useDebounceFn } from "@vueuse/core";
import { 会话的状态存储 } from "@/状态存储";

// const { 当前会话 } = 会话的状态存储();
// 记录最后滚动的位置
const 处理滚动 = useDebounceFn(e => {
  const target = e.target as HTMLDivElement;
}, 1000);
</script>

<style scoped></style>
