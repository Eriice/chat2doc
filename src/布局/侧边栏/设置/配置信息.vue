<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex items-center space-x-4">
      <span class="w-16">聊天记录</span>
      <div class="flex-1 flex-wrap items-center gap-4">
        <NButton size="small" @click="处理导出聊天记录()">
          <template #icon>
            <Icon icon="ri:download-2-fill" />
          </template>
          导出
        </NButton>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <span class="w-16">API Key</span>
      <div class="flex-1 flex-wrap items-center gap-4">
        <NInput v-model:value="apikey" placeholder="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { 会话的状态存储 } from "@/状态存储";
import { 下载到本地, apikey的本地存储 } from "./帮助函数";
import { Icon } from "@iconify/vue";
import { useStorage } from "@vueuse/core";

const { 会话列表 } = storeToRefs(会话的状态存储());

const 处理导出聊天记录 = () => {
  const json数据: string = JSON.stringify(会话列表.value);
  下载到本地(json数据);
};

const apikey = useStorage<string | null>(apikey的本地存储, null);
</script>

<style scoped></style>
