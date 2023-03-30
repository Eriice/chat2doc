import { 状态存储枚举 } from "@/状态存储/状态存储枚举";
import 使用_应用尺寸 from "@/状态钩子/使用_应用尺寸";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { I主题, I语言 } from "./类型";

const 本地缓存名称 = "应用状态";
const 默认应用状态: { 主题: I主题; 语言: I语言 } = {
  主题: "light",
  语言: "zh-CN"
};

// 使用的主题、界面语言
export const 应用的状态存储 = defineStore(状态存储枚举.应用状态存储, () => {
  const 应用状态 = useStorage(本地缓存名称, 默认应用状态);
  const 主题 = computed(() => 应用状态.value.主题);
  const 语言 = computed(() => 应用状态.value.语言);

  const 是否菜单折叠 = ref(false);
  const { 是否手机 } = 使用_应用尺寸();
  watch(
    () => 是否手机.value,
    () => {
      是否菜单折叠.value = 是否手机.value;
    },
    {
      immediate: true
    }
  );

  const 设置主题 = async (主题: I主题) => {
    应用状态.value.主题 = 主题;
  };

  const 设置语言 = (语言: I语言) => {
    应用状态.value.语言 = 语言;
  };

  const 设置菜单折叠 = (是否折叠: boolean) => {
    是否菜单折叠.value = 是否折叠;
  };

  return { 主题, 语言, 是否菜单折叠, 设置主题, 设置语言, 设置菜单折叠 };
});
