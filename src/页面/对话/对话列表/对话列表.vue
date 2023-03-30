<template>
  <main class="flex flex-1 flex-col gap-4 p-4">
    <MyChatListItem v-for="item in 当前对话列表" :key="item.id" :对话="item" />
    <MyChatListItem v-show="缓存的ai回复.状态 !== '空闲'" ref="缓存ai回复的引用" :对话="回复缓存" />
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

const 缓存ai回复的引用 = ref<InstanceType<typeof MyChatListItem>>();

// 监听缓存的ai回复的内容变化，来更新回复缓存的内容
watch(缓存的ai回复.value, () => {
  回复缓存.value.内容 = 缓存的ai回复.value.内容;
  回复缓存.value.参考资料 = 缓存的ai回复.value.参考资料;
});

// 借助状态的变化来让滚动条滚动到最底部
// 代办事项：使用 useScroll 进行选项卡的滚动距离控制
watch(
  () => 缓存的ai回复.value.状态,
  () => {
    console.log("状态变化了");
    console.log("缓存ai回复的引用.value", 缓存ai回复的引用.value);

    缓存ai回复的引用.value?.$el.scrollIntoView({
      behavior: "smooth"
    });
  }
);
</script>

<style scoped></style>
