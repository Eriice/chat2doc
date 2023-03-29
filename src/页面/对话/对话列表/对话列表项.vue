<template>
  <section class="flex gap-3">
    <!-- 头像 -->
    <div class="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
      <img class="h-full w-full" src="@/资源/favicon.png" alt="" />
    </div>
    <!-- 内容 -->
    <div class="flex flex-1 flex-col gap-3">
      <div>
        <div class="mb-2 text-xs">{{ 对话.创建时间 }}</div>
        <div class="flex">
          <div class="rounded-md p-4" :class="[对话.角色 === 'ai' ? 'bg-gray-100' : 'bg-green-100']">
            <MyText :内容="对话.内容" />
          </div>
        </div>
      </div>
      <div v-if="对话.角色 == 'ai'" class="flex flex-col gap-2">
        <div class="text-lg font-bold">参考文档：</div>
        <div v-for="item in 对话.参考资料" :key="item.id" class="rounded-md border border-dashed p-4">
          <div class="mb-2 flex justify-between">
            <div class="text-base font-bold text-gray-600">{{ item.标题 }}</div>
            <a
              :href="item.锚定链接"
              class="flex h-6 w-6 items-center justify-center rounded shadow hover:bg-gray-200"
              target="_blank"
              ><Icon icon="ri:share-box-line" class="icon-share cursor-pointer"
            /></a>
          </div>

          <div class="text-sm text-gray-500">{{ item.内容 }}</div>
          <!-- <MdEditor v-model="item.内容" :preview-only="true" /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import MyText from "./文本框.vue";

type I组件属性 = {
  对话: N会话.I对话;
};
defineProps<I组件属性>();
</script>

<style scoped>
.icon-share {
  font-size: 18px;
  @apply text-gray-600;
}
.md-editor {
  background-color: transparent !important;
}
</style>
