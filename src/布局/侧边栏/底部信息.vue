<template>
  <div class="flex items-center justify-between gap-3 border-t border-gray-600 p-4">
    <img src="@/资源/favicon.png" alt="" class="h-10 w-10 rounded-full" />
    <div class="flex-1">
      <div class="font-bold text-white">代码旅行</div>
      <div class="text-xs text-gray-300">👉 中文的源码 👈</div>
    </div>
    <div
      class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-300 shadow-md hover:bg-gray-300 hover:text-gray-800"
      @click="处理显示设置()"
    >
      <Icon icon="ri:settings-4-line" class="h-6 w-6" />
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
