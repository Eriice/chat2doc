<template>
  <div class="h-full transition-all dark:bg-[#24272e]" :class="[是否手机 ? 'p-0' : 'p-4']">
    <div class="h-full overflow-hidden">
      <NLayout has-sider class="h-full">
        <NLayoutSider content-style="padding: 24px;"> 海淀桥 </NLayoutSider>
        <NLayout>
          <n-layout-header>颐和园路</n-layout-header>
          <n-layout-content content-style="padding: 24px;"> 平山道 </n-layout-content>
          <n-layout-footer>成府路</n-layout-footer>
        </NLayout>
      </NLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import 使用_应用尺寸 from "@/状态钩子/使用_应用尺寸";
import { NLayout, NLayoutSider, NLayoutContent } from "naive-ui";

const { 是否手机 } = 使用_应用尺寸();
</script>

<style scoped></style>
