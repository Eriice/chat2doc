<template>
  <NLayoutSider bordered>
    <div class="flex h-full flex-1 flex-col">
      <MyNewChat />
      <div class="flex-1 overflow-hidden pb-4">
        <MyChatList />
      </div>
      <footer class="border-t bg-white p-4">123</footer>
    </div>
  </NLayoutSider>
</template>

<script setup lang="ts">
import { NLayoutFooter, NLayoutSider } from "naive-ui";
import MyNewChat from "./新的对话.vue";
import MyChatList from "./对话列表/对话列表.vue";
</script>

<style scoped></style>
