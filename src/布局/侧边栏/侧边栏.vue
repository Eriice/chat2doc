<template>
  <NLayoutSider bordered>
    <div class="flex h-full flex-1 flex-col bg-gray-800">
      <MyNewChat />
      <div class="flex-1 overflow-hidden pb-4">
        <MyChatList />
      </div>
      <MyFotter />
    </div>
  </NLayoutSider>
</template>

<script setup lang="ts">
import { NLayoutFooter, NLayoutSider } from "naive-ui";
import MyNewChat from "./新的对话.vue";
import MyChatList from "./会话列表/会话列表.vue";
import MyFotter from "./底部信息.vue";
</script>

<style scoped></style>
