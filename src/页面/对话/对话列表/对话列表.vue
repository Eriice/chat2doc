<template>
  <main class="flex flex-1 flex-col gap-6 p-4">
    <MyChatListItem v-for="item in 当前对话列表" :key="item.id" :对话="item" />
    <MyChatListItem :对话="回复缓存" />
    <section class="flex gap-3">
      <!-- 头像 -->
      <div class="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
        <img class="h-full w-full" src="@/资源/favicon.png" alt="" />
      </div>
      <!-- 内容 -->
      <div class="flex flex-1 flex-col gap-3">
        <div>
          <div class="mb-2 text-xs">Vue 助手</div>
          <div class="flex">
            <div class="rounded-md bg-green-100 p-3">:autosize="</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { 会话的状态存储 } from "@/状态存储";
import { storeToRefs } from "pinia";
import MyChatListItem from "./对话列表项.vue";
import { ref, watch } from "vue";
import { nanoid } from "nanoid";

const { 当前对话列表, 缓存的ai回复 } = storeToRefs(会话的状态存储());

const 回复缓存 = ref<N会话.I对话>({
  id: nanoid(),
  内容: 缓存的ai回复.value.内容,
  参考资料: 缓存的ai回复.value.参考资料,
  创建时间: new Date().toISOString(),
  角色: "ai"
});

watch(缓存的ai回复.value, () => {
  回复缓存.value.内容 = 缓存的ai回复.value.内容;
  回复缓存.value.参考资料 = 缓存的ai回复.value.参考资料;
});
</script>

<style scoped></style>
