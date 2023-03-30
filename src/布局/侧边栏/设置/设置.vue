<template>
  <NModal
    v-model:show="是否显示中"
    :auto-focus="false"
    preset="card"
    style="width: 95%; max-width: 640px; min-height: 400px"
  >
    <NTabs v-model:value="当前活动页" type="line" animated>
      <NTabPane name="设置" tab="设置">
        <template #tab>
          <Icon class="text-lg" icon="ri:download-2-fill" />
          <span class="ml-2">设置</span>
        </template>
        <div class="min-h-[100px]">
          <MyConfiguration />
        </div>
      </NTabPane>
      <NTabPane name="关于项目" tab="关于项目">
        <template #tab>
          <Icon class="text-lg" icon="ri:file-user-line" />
          <span class="ml-2">关于项目</span>
        </template>
        <div class="min-h-[100px]">
          <MyProjectIntro />
        </div>
      </NTabPane>
    </NTabs>
  </NModal>
</template>

<script setup lang="ts">
import { NModal, NTabPane, NTabs } from "naive-ui";
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import MyConfiguration from "./配置信息.vue";
import MyProjectIntro from "./关于项目.vue";
const 当前活动页 = ref("设置");

type I组件属性 = {
  是否显示: boolean;
};

const 组件属性 = defineProps<I组件属性>();
const 事件触发 = defineEmits(["update:是否显示"]);

const 是否显示中 = computed({
  get() {
    return 组件属性.是否显示;
  },
  set(是否显示: boolean) {
    事件触发("update:是否显示", 是否显示);
  }
});
</script>

<style scoped></style>
