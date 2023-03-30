<template>
  <NLayoutSider
    style="z-index: 20"
    position="absolute"
    :width="260"
    :collapsed="是否菜单折叠"
    :collapsed-width="0"
    bordered
    @update-collapsed="e => 设置菜单折叠(e)"
  >
    <div class="flex h-full flex-1 flex-col bg-gray-800">
      <MyNewChat />
      <div class="flex-1 overflow-hidden pb-4">
        <MyChatList />
      </div>
      <MyFotter />
    </div>
  </NLayoutSider>
  <template v-if="是否手机">
    <div v-show="!是否菜单折叠" class="fixed inset-0 z-10 bg-black/40" @click="处理菜单折叠()" />
  </template>
</template>

<script setup lang="ts">
import { NLayoutSider } from "naive-ui";
import MyNewChat from "./新的对话.vue";
import MyChatList from "./会话列表/会话列表.vue";
import MyFotter from "./底部信息.vue";

import { storeToRefs } from "pinia";
import { 应用的状态存储 } from "@/状态存储";
import 使用_应用尺寸 from "@/状态钩子/使用_应用尺寸";
const 状态存储 = 应用的状态存储();
const { 设置菜单折叠 } = 状态存储;
const { 是否菜单折叠 } = storeToRefs(状态存储);

const { 是否手机 } = 使用_应用尺寸();
const 处理菜单折叠 = () => {
  设置菜单折叠(true);
};
</script>

<style scoped></style>
