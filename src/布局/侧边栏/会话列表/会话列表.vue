<template>
  <NScrollbar>
    <transition-group tag="div" name="why" class="flex flex-col gap-2 px-4">
      <MyChatListItem v-for="item in 会话列表" :key="item.id" :会话="item" />
    </transition-group>
  </NScrollbar>
</template>

<script setup lang="ts">
import { 会话的状态存储 } from "@/状态存储";
import { NScrollbar } from "naive-ui";
import { storeToRefs } from "pinia";
import MyChatListItem from "./会话列表项.vue";

const 状态存储 = 会话的状态存储();
const { 会话列表 } = storeToRefs(状态存储);
</script>

<style scoped>
.why-enter-active,
.why-leave-active {
  transition: all 0.3s ease;
}

.why-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.why-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
