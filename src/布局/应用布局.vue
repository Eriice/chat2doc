<template>
  <div class="h-full transition-all" :class="[是否手机 ? 'p-0' : 'p-4']">
    <div class="h-full overflow-hidden" :class="[是否手机 ? 'mobile-container' : 'desktop-container']">
      <NLayout has-sider class="h-full">
        <MySidebar />
        <NLayout class="h-full">
          <NLayoutContent class="h-full">
            <RouterView v-slot="{ Component, route }">
              <component :is="Component" :key="route.fullPath" />
            </RouterView>
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import 使用_应用尺寸 from "@/状态钩子/使用_应用尺寸";
import { NLayout, NLayoutContent } from "naive-ui";
import MySidebar from "./侧边栏/侧边栏.vue";

const { 是否手机 } = 使用_应用尺寸();
console.log("是否手机", 是否手机);
</script>

<style scoped>
.mobile-container {
}
.desktop-container {
  @apply rounded-md  border shadow-md dark:border-neutral-800;
}
</style>
