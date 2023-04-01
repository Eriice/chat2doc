<template>
  <div class="p-4">
    <NPopselect
      v-model:value="选项"
      size="large"
      :options="选项列表"
      trigger="click"
      :on-update:value="e => 处理选择(e)"
    >
      <div
        class="cursor-pointer rounded-lg border border-dashed bg-gray-200 bg-opacity-20 p-3 text-center text-gray-100"
      >
        新的对话
      </div>
    </NPopselect>
  </div>
</template>

<script setup lang="ts">
import { 会话的状态存储 } from "@/状态存储";
import { NPopselect } from "naive-ui";
import { ref } from "vue";

const { 新增会话 } = 会话的状态存储();

const 选项 = ref("Drive My Car");
const 选项列表 = [
  { label: "ChatGPT 3.5", value: "chatgpt" },
  { label: "React 文档", value: "react" },
  { label: "Vue 文档", value: "vue", disabled: true },
  { label: "Python 文档", value: "python", disabled: true },
  { label: "Angular 文档", value: "angular", disabled: true },
  { label: "Java 文档", value: "java", disabled: true },
  { label: "Goland 文档", value: "golang", disabled: true },
  { label: "C# 文档", value: "c#", disabled: true }
];

const 处理选择 = (问题背景: N会话.I问题背景) => {
  const 会话标题 = 选项列表.find(item => item.value == 问题背景)?.label || "chatgpt";
  新增会话(会话标题, 问题背景);
};
</script>

<style scoped></style>
