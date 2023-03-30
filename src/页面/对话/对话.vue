<template>
  <div class="flex h-full w-full flex-col">
    <!-- <MyChatTips /> -->
    <MyStickyHeader />
    <div class="flex-1 overflow-hidden">
      <div ref="滚动的引用" class="scroll-content h-full overflow-hidden overflow-y-auto">
        <MyChatList />
      </div>
    </div>
    <div>
      <MyChatTextArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyChatList from "./对话列表/对话列表.vue";
import MyChatTextArea from "./输入框/输入框.vue";
import MyStickyHeader from "./悬浮标题/悬浮标题.vue";
import { useDebounceFn } from "@vueuse/core";
import { 会话的状态存储 } from "@/状态存储";
import { storeToRefs } from "pinia";

const { 缓存的ai回复 } = storeToRefs(会话的状态存储());
// 记录最后滚动的位置
const 处理滚动 = useDebounceFn(e => {
  const target = e.target as HTMLDivElement;
}, 1000);
</script>

<style lang="scss">
.scroll-content {
}
.scroll-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scroll-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.scroll-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
