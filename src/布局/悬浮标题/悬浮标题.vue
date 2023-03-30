<template>
  <div class="flex items-center gap-3 p-4 text-lg font-bold shadow">
    <Icon v-if="是否菜单折叠" icon="ri:align-justify" class="cursor-pointer" @click="处理菜单折叠()" />
    正在和 React 文档对话
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { 应用的状态存储 } from "@/状态存储";
import { storeToRefs } from "pinia";
const 状态存储 = 应用的状态存储();
const { 设置菜单折叠 } = 状态存储;
const { 是否菜单折叠 } = storeToRefs(状态存储);

const 处理菜单折叠 = () => {
  设置菜单折叠(!是否菜单折叠.value);
};
</script>

<style scoped></style>
