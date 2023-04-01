<template>
  <div class="flex items-center gap-3 p-4 text-lg font-bold shadow">
    <Icon v-if="是否菜单折叠" icon="ri:align-justify" class="cursor-pointer" @click="处理菜单折叠()" />
    {{ 标题 }}
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { 应用的状态存储, 会话的状态存储 } from "@/状态存储";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const { 设置菜单折叠 } = 应用的状态存储();
const { 是否菜单折叠 } = storeToRefs(应用的状态存储());
const { 当前会话 } = storeToRefs(会话的状态存储());

const 标题 = computed(() => {
  return `正在和 ${当前会话.value?.标题} 对话`;
});
const 处理菜单折叠 = () => {
  设置菜单折叠(!是否菜单折叠.value);
};
</script>

<style scoped></style>
