<template>
  <NConfigProvider class="h-full" :theme="应用主题" :locale="zhCN" :date-locale="dateZhCN">
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import 使用主题 from "@/状态钩子/使用_应用主题";
import { zhCN, dateZhCN } from "naive-ui";

const { 应用主题 } = 使用主题();
</script>

<style scoped></style>
