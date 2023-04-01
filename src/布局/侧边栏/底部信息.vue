<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between gap-3 border-t border-gray-600 p-4">
      <div class="flex-1">
        <div class="font-bold text-white">开源项目 - 和文档对话</div>
        <div class="text-xs text-gray-300">旨在让GPT获取最新文档回答</div>
      </div>
      <div
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-300 shadow-md hover:bg-gray-300 hover:text-gray-800"
        @click="处理显示设置()"
      >
        <Icon icon="ri:settings-4-line" class="h-6 w-6" />
      </div>
    </div>
    <div class="flex gap-6 px-4 pb-4">
      <div class="flex flex-col">
        <img
          class="mb-1 h-16 w-16"
          src="https://6169-aihub-7g6qfy5o038ec167-1306429767.tcb.qcloud.la/qrcode/qrcode.png?sign=16e8e0441c199a0ec2b2222ecf57e75b&t=1680278176"
        />
        <div class="text-xs text-gray-300">个人公众号</div>
      </div>
      <div class="flex flex-col">
        <img
          class="mb-1 h-16 w-16"
          src="https://6169-aihub-7g6qfy5o038ec167-1306429767.tcb.qcloud.la/qrcode/qrcode.png?sign=16e8e0441c199a0ec2b2222ecf57e75b&t=1680278176"
        />
        <div class="text-xs text-gray-300">AI 交流群</div>
      </div>
    </div>
  </div>

  <MySetting v-if="true" v-model:是否显示="是否显示" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineAsyncComponent, ref } from "vue";
const MySetting = defineAsyncComponent(() => import("./设置/设置.vue"));

const 是否显示 = ref(false);

const 处理显示设置 = () => {
  是否显示.value = true;
};
</script>

<style scoped></style>
