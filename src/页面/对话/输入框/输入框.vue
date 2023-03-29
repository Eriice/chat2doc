<template>
  <footer class="relative px-4 py-6">
    <div class="flex items-end gap-3">
      <NInput
        v-model:value="提示语"
        class="flex-1"
        type="textarea"
        :autosize="{
          minRows: 1,
          maxRows: 3
        }"
        placeholder="基本的 Textarea"
      />
      <NButton @click="处理发送对话()">
        <Icon icon="ri:send-plane-fill" class="mr-1" />
        <span>发送</span>
      </NButton>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { 会话的状态存储 } from "@/状态存储";
import { 侦听事件源url } from "@/接口";
import { storeToRefs } from "pinia";

const 提示语 = ref<string>("");

const { 新增用户提问, 新增ai回复 } = 会话的状态存储();
const { 缓存的ai回复 } = storeToRefs(会话的状态存储());

const 处理发送对话 = async () => {
  新增用户提问(提示语.value);

  const 事件源 = new EventSource(`${侦听事件源url}?问题=${encodeURIComponent(提示语.value)}`);
  提示语.value = "";

  事件源.addEventListener("open", () => {
    缓存的ai回复.value.内容 = "";
    缓存的ai回复.value.状态 = "等待回复";
  });

  // 监听自定义的"done" 事件
  事件源.addEventListener("引用", event => {
    console.log("所有引用内容");
    const data = JSON.parse(event.data);
    缓存的ai回复.value.参考资料 = data;
  });

  // 监听自定义的"done" 事件
  事件源.addEventListener("完成", () => {
    console.log("所有事件已发送完毕");
    新增ai回复(缓存的ai回复.value.内容, 缓存的ai回复.value.参考资料);
    缓存的ai回复.value.内容 = "";
    缓存的ai回复.value.状态 = "空闲";
    缓存的ai回复.value.参考资料 = [];
    事件源.close(); // 关闭连接
  });

  事件源.addEventListener("message", event => {
    const data = JSON.parse(event.data);
    缓存的ai回复.value.内容 = 缓存的ai回复.value.内容 + data;
    缓存的ai回复.value.状态 = "正在回复";
  });

  事件源.addEventListener("close", () => {
    缓存的ai回复.value.内容 = "";
    缓存的ai回复.value.状态 = "空闲";
  });

  事件源.addEventListener("error", event => {
    console.error("发生错误:", event);
    事件源.close();
  });
};
</script>

<style scoped></style>
