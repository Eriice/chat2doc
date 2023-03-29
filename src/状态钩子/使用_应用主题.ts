import { computed } from "vue";
import { useOsTheme } from "naive-ui";
import { 应用的状态存储 } from "@/状态存储";

const 使用_应用主题 = () => {
  const 状态存储 = 应用的状态存储();

  const OsTheme = useOsTheme();
  const 应用主题 = computed(() => {
    if (状态存储.主题 === "auto") {
      // 若设置为auto，则跟随系统主题
      return OsTheme.value;
    } else {
      // 否则，使用缓存的主题
      return 状态存储.主题;
    }
  });

  return { 应用主题 };
};

export default 使用_应用主题;
