<template>
  <div class="p-4">
    <div
      class="cursor-pointer rounded-lg border border-dashed bg-gray-200 bg-opacity-20 p-3 text-center text-gray-100"
      @click="创建新的会话()"
    >
      新的对话
    </div>
  </div>
</template>

<script setup lang="ts">
import { 会话的状态存储 } from "@/状态存储";
import { Icon } from "@iconify/vue";

const { 新增会话 } = 会话的状态存储();

const 创建新的会话 = () => {
  新增会话();
};
</script>

<style scoped></style>
