<template>
  <div class="p-4">
    <NButton dashed block @click="创建新的会话()">新的对话</NButton>
  </div>
</template>

<script setup lang="ts">
import { 会话的状态存储 } from "@/状态存储";
import { NButton } from "naive-ui";

const { 新增会话 } = 会话的状态存储();

const 创建新的会话 = () => {
  新增会话();
};
</script>

<style scoped></style>
