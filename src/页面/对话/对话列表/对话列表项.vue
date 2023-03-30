<template>
  <section class="flex gap-3">
    <!-- 内容 -->
    <div class="flex flex-1 flex-col gap-3">
      <div>
        <div class="flex">
          <div v-if="对话.角色 === '用户'" class="rounded-lg bg-blue-500 py-2 px-3 text-white shadow-sm">
            <p>{{ 对话.内容 }}</p>
          </div>
          <div v-if="对话.角色 === 'ai'" class="rounded-lg border bg-gray-50 p-2 text-white shadow-sm">
            <MyText :内容="对话.内容" />
          </div>
        </div>
      </div>
      <div v-if="对话.角色 == 'ai'" class="flex flex-col gap-2">
        <div v-for="item in 对话.参考资料" :key="item.id" class="rounded-md border border-dashed p-4">
          <div class="mb-2 flex justify-between">
            <div class="text-base font-bold text-gray-600">参考文档：{{ item.标题 }}</div>
            <a
              :href="item.锚定链接"
              class="flex h-6 w-6 items-center justify-center rounded shadow hover:bg-gray-200"
              target="_blank"
              ><Icon icon="ri:share-box-line" class="icon-share cursor-pointer"
            /></a>
          </div>

          <div class="text-sm text-gray-500">{{ item.内容 }}</div>
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
