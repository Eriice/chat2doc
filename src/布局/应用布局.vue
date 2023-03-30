<template>
  <div class="h-full transition-all" :class="[是否手机 ? 'p-0' : 'p-4']">
    <div class="h-full overflow-hidden" :class="[是否手机 ? 'mobile-container' : 'desktop-container']">
      <NLayout has-sider class="h-full">
        <MySidebar />
        <NLayout class="h-full">
          <NLayoutContent :class="容器样式">
            <div class="flex h-full flex-col">
              <MyStickyHeader />
              <div class="flex-1 overflow-hidden">
                <RouterView v-slot="{ Component, route }" class="flex-1">
                  <component :is="Component" :key="route.fullPath" />
                </RouterView>
              </div>
            </div>
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent } from "naive-ui";
import MyStickyHeader from "./悬浮标题/悬浮标题.vue";
import MySidebar from "./侧边栏/侧边栏.vue";
import 使用_应用尺寸 from "@/状态钩子/使用_应用尺寸";
import { computed } from "vue";
const { 是否手机 } = 使用_应用尺寸();

const 容器样式 = computed(() => {
  return ["h-full", { "pl-[260px]": !是否手机.value }];
});
</script>

<style scoped>
.mobile-container {
}
.desktop-container {
  @apply rounded-md  border shadow-md dark:border-neutral-800;
}
</style>
