<template>
  <div
    :class="{ active: 会话.id === 当前会话id }"
    class="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-300 p-3 text-gray-300"
    @click="处理切换(会话.id)"
  >
    <Icon icon="ri:message-3-line" />
    <div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all">
      <span>{{ 会话.标题 }}</span>
    </div>
    <div class="flex gap-2">
      <!-- <div
        class="flex h-6 w-6 items-center justify-center rounded shadow hover:bg-blue-600"
        @click.stop="处理编辑(会话.id)"
      >
        <Icon icon="ri:edit-line" />
      </div> -->
      <div
        class="flex h-6 w-6 items-center justify-center rounded shadow hover:bg-blue-600"
        @click.stop="处理删除(会话.id)"
      >
        <Icon icon="ri:delete-bin-line" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 会话的状态存储 } from "@/状态存储";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";

type I组件属性 = {
  会话: {
    id: string;
    标题: string;
    问题背景: N会话.I问题背景;
  };
};
defineProps<I组件属性>();

const 状态存储 = 会话的状态存储();
const { 删除会话, 切换当前会话 } = 状态存储;
const { 当前会话id } = storeToRefs(状态存储);

const 处理切换 = (id: string) => {
  切换当前会话(id);
};

const 处理删除 = (id: string) => {
  删除会话(id);
};

const 处理编辑 = (id: string) => {};
</script>

<style scoped>
.active {
  @apply border  border-blue-500 bg-blue-500 text-white;
}
</style>
